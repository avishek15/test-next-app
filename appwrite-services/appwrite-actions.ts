"use server";

import {
  createAdminClient,
  createSessionClient,
} from "@/appwrite-services/appwrite";
import { AppwriteException, ID } from "node-appwrite";
import { session_name } from "../utils/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterFormSchema, LoginFormSchema } from "@/utils/formSchemas";

export async function signup(state: unknown, formData: FormData) {
  const { account } = await createAdminClient();
  // 1. Validate fields
  const validationResult = RegisterFormSchema.safeParse({
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  });

  if (!validationResult.success) {
    // Handle validation errors
    const errors = validationResult.error.formErrors.fieldErrors;
    return { success: false, errors };
  }

  // Pause for 10 seconds
  // await new Promise((resolve) => setTimeout(resolve, 10000)); // 10000 milliseconds = 10 seconds

  // 2. Create User
  const { username, email, password } = validationResult.data;
  try {
    await account.create(ID.unique(), email, password, username);
  } catch (error) {
    if (
      error instanceof AppwriteException &&
      error.code === 409 &&
      error.type === "user_already_exists"
    ) {
      return {
        success: false,
        errors: { email: ["Email already exists, please login"] },
      };
    }
  }

  // 3. Create Session / send email for verification
  try {
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set(session_name, session.secret, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
      path: "/",
    });
    // Turning off verification email
    // const { account: sessAccount } = await createSessionClient(session.secret);

    // await sessAccount.createVerification("http://localhost:3001/verify");

    // redirect("/");

    return {
      success: true,
      errors: null,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function login(state: unknown, formData: FormData) {
  //Login
  // 1. Validate fields
  const validatedResult = LoginFormSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedResult.success) {
    // Handle validation errors
    const errors = validatedResult.error.formErrors.fieldErrors;
    return { success: false, errors };
  }

  console.log(validatedResult.data);
  const { email, password } = validatedResult.data;
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set(`${session_name}`, session.secret, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
      path: "/",
    });

    return {
      success: true,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    if (
      error instanceof AppwriteException &&
      error.code === 401 &&
      error.type === "user_invalid_credentials"
    ) {
      return {
        success: false,
        errors: { email: [error.response.message] },
      };
    }
  }
}

export async function verifySession() {
  // signed in or not
  const cookie = cookies().get(session_name);
  console.log("APPWRITE VERIFY COOKIE", cookie);
  try {
    if (!cookie?.value) {
      throw new Error("Session cookie is missing or invalid");
    }
    const { account } = await createSessionClient(cookie?.value);
    return account.get();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteSession() {
  // logout
  const cookie = cookies().get(session_name);
  try {
    const { account } = await createSessionClient(cookie?.value);
    const allSessions = await account.listSessions();
    console.log("LISTING SESSIONS:", allSessions);
    await account.deleteSession("current");
  } catch (error) {}

  cookies().delete(session_name);
  // return NextResponse.redirect(new URL("/signup"));

  redirect("/signin");
}
