"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import pina from "@/public/images/pinafore1.jpeg"
import fash from "@/public/images/fash.png"
import Link from "next/link"
import SignInButton from "@/components/signinbutton"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ✅ Handle query param errors
  useEffect(() => {
    const urlError = searchParams.get("error")
    if (urlError) {
      if (urlError === "OAuthAccountNotLinked") {
        setError("This email is already registered with another sign-in method. Please use that method to log in.")
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    }
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = String(formData.get("email"))
    const password = String(formData.get("password"))

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    })

    setLoading(false)

    if (result?.error) {
      setError("Invalid email or password")
      return
    }

    if (result?.ok) {
      router.push(result.url || "/")
    }
  }

  return (
    <main className="w-full flex flex-col lg:grid lg:grid-cols-2 items-center justify-center min-h-dvh">
      <Image src={pina} alt="A lady in a denim pinafore" className="hidden lg:block min-h-full object-cover"/>

      <div className="w-full flex justify-center">
        <Card className="w-4/5 border-0 shadow-none">
          <Image src={fash} alt="Glamour Fash Logo" width={150} height={150} className="mx-auto"/>

          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Link href={"/auth/register"}>
                <Button variant="outline" className="text-rosegold">Sign Up</Button>
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" name="password" type="password" placeholder="••••••••••••" required />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center mt-2">{error}</p>
              )}

              <Button type="submit" className="w-full disabled:opacity-50 mt-6" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <SignInButton/>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
