// components/auth/LinkGoogle.jsx
"use client"

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc" // better Google logo

export function LinkGoogle() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 border rounded hover:bg-gray-100"
    >
      <FcGoogle size={18} /> Link Google
    </button>
  )
}
