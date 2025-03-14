import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  pages: {
    signIn: "/login",
    error: "/login", // Redirects errors back to login
  },
  providers: [
    CredentialsProvider({
      name: "Ecliptic ID",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials.");
          }

          // Find user in the database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("No user found.");
          }

          // Check if the password is correct
          const validPassword = await bcrypt.compare(credentials.password, user.password);
          if (!validPassword) {
            throw new Error("Incorrect password.");
          }

          return { id: user.id, name: user.name, email: user.email };
        } catch (error) {
          console.error("Auth Error:", error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: session.user?.name || null,
        email: session.user?.email || null,
        image: session.user?.image || null,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXTAUTH_DEBUG === "true",
});
