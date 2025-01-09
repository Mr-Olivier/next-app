import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        type UserWithPassword = {
          id: string;
          email: string | null;
          hashedPassword: string | null;
          name: string | null;
          emailVerified: Date | null;
          image: string | null;
        };

        const user = (await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            //hashedPassword: true,
            name: true,
            emailVerified: true,
            image: true,
          },
        })) as UserWithPassword;

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        return passwordMatch ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
