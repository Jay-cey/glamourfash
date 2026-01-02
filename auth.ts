import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"
 
 export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
   adapter: PrismaAdapter(prisma) as any,
   providers: [
     GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password")
        }

        const user = await prisma.user.findUnique({
          where: { email: String(credentials.email) },
        })

        if (!user || !user.hashedPassword) {
          console.log("User not found or no password set")
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          String(credentials.password),
          user.hashedPassword
        )

        if (!isPasswordValid) {
          console.log("Invalid password")
          return null
        }

        return {
          id: user.id,
          name: user.name ?? "",
          email: user.email ?? "",
        }
      },
    }),
  ],
})
