// components/auth/LinkGitHub.tsx
"use client"

import { signIn } from "next-auth/react"
import { Github } from "lucide-react"

export function LinkGitHub() {
  return (
    <button
      onClick={() => signIn("github")}
      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
    >
      <Github size={18} /> Link GitHub
    </button>
  )
}
