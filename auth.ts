// auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
// import { authConfig } from "./auth.config"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    ...authConfig.providers.map((provider) =>
      provider.id === "credentials"
        ? {
            ...provider,
            async authorize(credentials: Record<string, unknown>) {
              if (!credentials?.email || !credentials?.password) return null

              const user = await prisma.user.findUnique({
                where: { email: String(credentials.email) },
              })
              if (!user || !user.hashedPassword) return null

              const isPasswordValid = await bcrypt.compare(
                String(credentials.password),
                user.hashedPassword
              )
              if (!isPasswordValid) return null

              return {
                id: user.id,
                name: user.name ?? "",
                email: user.email ?? "",
              }
            },
          }
        : provider
    ),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith("/")) return `${baseUrl}${url}`
      return baseUrl
    },
  },
})
