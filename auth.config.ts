import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: { strategy: "jwt" },
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
      if (token?.id && session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  providers: [], // Configured in auth.ts
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
