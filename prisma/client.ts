import { PrismaClient } from "@prisma/client";

declare global {
  // Ensure `globalThis.prisma` is the correct type in a Node.js environment
  var prisma: PrismaClient | undefined;
}

// Use the existing Prisma instance if it exists, or create a new one
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info"] : [],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma; // Attach Prisma client to the global scope in development
}
