"use client"
import { useSearchParams } from "next/navigation"

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const error =
    typeof searchParams?.error === "string" ? searchParams.error : undefined

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
      {error === "OAuthAccountNotLinked" ? (
        <p>
          The email is already linked to another provider. Please sign in using
          the original provider.
        </p>
      ) : (
        <p>{error || "An unknown error occurred."}</p>
      )}
    </div>
  )
}
