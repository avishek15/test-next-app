import { createAdminClient } from "@/appwrite-services/appwrite";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";

// Function to generate a random string of 12 alphabets
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to format a timestamp to a human-readable date string
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toISOString(); // or use other formatting methods as needed
}

export async function POST(request) {
  try {
    const { database } = await createAdminClient();
    const { count } = await request.json(); // Accept the number of documents to be created

    let successCount = 0; // Counter for successfully created documents

    // Loop to create the specified number of documents
    for (let i = 0; i < count; i++) {
      // Generate a random timestamp within the last 24 hours
      const now = Date.now();
      const randomTimestamp = now - Math.floor(Math.random() * 86400000); // 86400000 milliseconds in 24 hours
      // Generate a random string of 12 alphabets
      const randomName = generateRandomString(12);

      // Format the timestamp to a human-readable date string
      const formattedTimestamp = formatTimestamp(randomTimestamp);

      try {
        const response = await database.createDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_DATABASE_COL1,
          ID.unique(),
          {
            timestamp: formattedTimestamp,
            name: randomName,
          }
        );
        console.log(response);
        successCount++; // Increment the success count
      } catch (error) {
        console.log(error);
      }
    }

    return NextResponse.json({ successCount }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
