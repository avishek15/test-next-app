import { createSessionClient } from "@/appwrite-services/appwrite";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { database } = createSessionClient();
    console.log(database);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
