import { NextResponse, NextRequest } from "next/server";
import { verifySession } from "@/appwrite-services/appwrite-actions";

const protectedRoutes = ["/"];
// const publicRoutes = ["/signup"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);

  const currentUser = await verifySession();

  //   console.log("MIDDLEWARE", currentUser);
  //   console.log("MIDDLEWARE", isProtected);

  if (currentUser && !isProtected) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!currentUser && isProtected) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/signin", "/signup"],
};
