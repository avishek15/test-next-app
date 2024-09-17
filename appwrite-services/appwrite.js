"use server";
import { Client, Account, Databases } from "node-appwrite";

const createSessionClient = async (session) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID);

  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
  };
};

const createAdminClient = async () => {
  const client = new Client();
  if (!process.env.APPWRITE_ENDPOINT) {
    throw new Error("Environment variable APPWRITE_ENDPOINT is not defined");
  }

  if (!process.env.APPWRITE_PROJECT_ID) {
    throw new Error("Environment variable APPWRITE_PROJECT_ID is not defined");
  }

  if (!process.env.APPWRITE_API_KEY) {
    throw new Error("Environment variable APPWRITE_API_KEY is not defined");
  }
  client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
  };
};

export { createAdminClient, createSessionClient };
