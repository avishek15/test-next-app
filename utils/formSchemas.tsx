import { z } from "zod";

// Define a schema for the register form data
export const RegisterFormSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 letters"),
    email: z.string().email("Invalid email address"), // Add email validation
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"), // Add email validation
  password: z.string().min(6, "Password must be at least 6 characters"),
});
