"use client"
import { useSearchParams } from "next/navigation"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
      {error === "OAuthAccountNotLinked" ? (
        <p>
          An account with this email already exists. <br />
          Please log in with your email & password, then link your GitHub/Google account in settings.
        </p>
      ) : (
        <p>Something went wrong. Please try again.</p>
      )}
    </div>
  )
}
