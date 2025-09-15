"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function SignInButton() {
  return (
    <>
    <div className="w-full border-t border-gray-300"></div>
    <p className="text-sm text-center text-gray-600 mb-2">Or continue with</p>
    <div className="grid grid-cols-2 gap-2 w-full">        
        <Button
        variant="outline"
        className="w-full"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        >
            Google
        </Button>
        
        <Button
        variant="outline"
        className="w-full"
        onClick={() => signIn("github", { callbackUrl: "/" })}
        >
            GitHub
        </Button>
    </div>
    </>
  )
}
