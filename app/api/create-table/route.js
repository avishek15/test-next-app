import { createAdminClient } from "@/appwrite-services/appwrite";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { database } = createAdminClient();
    console.log(database);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
