// components/auth/UnlinkButton.tsx
"use client"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Github } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

export function UnlinkButton({
  provider,
  onConfirm,
  disabled = false,
}: {
  provider: string
  onConfirm: () => void
  disabled?: boolean
}) {
  const Icon =
    provider === "github"
      ? Github
      : provider === "google"
      ? FcGoogle
      : undefined

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            disabled
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
          disabled={disabled}
        >
          {Icon && <Icon size={18} />} Unlink{" "}
          {provider.charAt(0).toUpperCase() + provider.slice(1)}
        </button>
      </AlertDialogTrigger>
      {!disabled && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Unlink {provider.charAt(0).toUpperCase() + provider.slice(1)}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will disconnect your {provider} account from your profile. You
              can re-link it anytime by signing in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={onConfirm}
            >
              Unlink
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  )
}
