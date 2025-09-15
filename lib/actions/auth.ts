"use server"
import { signIn, signOut } from "@/auth"

// export const login = async (formData: FormData) => {
//   const email = formData.get("email") as string
//   const password = formData.get("password") as string
//   await signIn("credentials", { email, password, redirect: false })
// }

export const loginWithGitHub = async () => {
  await signIn("github", { redirectTo: "" })
}

export const loginWithGoogle = async () => {
  await signIn("google", { redirectTo: "" })
}

export const logout = async () => {
  await signOut({ redirectTo: "/" })
}