// components/auth/ConnectedAccounts.tsx
"use client"

import { useState } from "react"
import { LinkGitHub } from "./LinkGitHub"
import { LinkGoogle } from "./LinkGoogle"
import { UnlinkButton } from "./UnlinkButton"
import { unlinkAccount } from "@/lib/actions/unlink"

export function ConnectedAccounts({
  userId,
  initialProviders,
  hasPassword,
}: {
  userId: string
  initialProviders: string[]
  hasPassword: boolean
}) {
  const [providers, setProviders] = useState(initialProviders)
  const [error, setError] = useState<string | null>(null)

  async function handleUnlink(provider: string) {
    setError(null)
    try {
      await unlinkAccount(userId, provider)
      setProviders((prev) => prev.filter((p) => p !== provider))
    } catch {
      setError("Failed to unlink account. Please try again.")
    }
  }

  
  const onlyOneProvider = providers.length === 1
  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      {/* GitHub */}
      {providers.includes("github") ? (
        <UnlinkButton
          provider="github"
          onConfirm={() => handleUnlink("github")}
          disabled={onlyOneProvider && !hasPassword}
        />
      ) : (
        <LinkGitHub />
      )}

      {/* Google */}
      {providers.includes("google") ? (
        <UnlinkButton
          provider="google"
          onConfirm={() => handleUnlink("google")}
          disabled={onlyOneProvider && !hasPassword}
        />
      ) : (
        <LinkGoogle />
      )}
    </div>
  )
}
