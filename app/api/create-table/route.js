import { createSessionClient } from "@/appwrite-services/appwrite";

export async function GET() {
  const { database } = createSessionClient();
  console.log(database);
}
