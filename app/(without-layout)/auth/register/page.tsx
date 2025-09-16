"use client";

import { useState } from "react";
import Image from "next/image";
import dress from "@/public/images/bodycon2.jpeg";
import fash from "@/public/images/fash.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import SignInButton from "@/components/signinbutton";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const fname = String(formData.get("fname"));
    const lname = String(formData.get("lname"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));


    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ fname, lname, email, password, confirmPassword }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      // ✅ redirect after successful register
      await signIn("credentials", {
      email,
      password,
      callbackUrl: "/", // send them home
    })
    } else {
      // handle error
      alert(data.error || "Failed to register");
      console.error("Registration failed");
    }

  }
  return (
    <main className="w-full grid grid-flow-row lg:grid-cols-2 justify-center items-center h-dvh">
      <Image
        src={dress}
        alt="Pretty lady in a bodycon dress"
        className="object-top object-cover max-lg:min-h-full h-full md:hidden lg:block hidden"
      />

      <div className="w-full flex justify-center">
        <Card className="w-full max-w-4/5 border-0 shadow-none">
          <Image
            src={fash}
            alt="Glamour Fash Logo"
            width={150}
            height={150}
            className="mx-auto"
          />
          <CardHeader>
            <CardTitle>Register your account</CardTitle>
            <CardDescription>
              Enter your details below to register to your account
            </CardDescription>
            <CardAction>
              <Link href={"/auth/login"}>
                <Button
                  variant="outline"
                  className="hover:bg-char text-rosegold cursor-pointer"
                >
                  Login
                </Button>
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fname">First Name</Label>
                    <Input
                      id="fname"
                      name="fname"
                      type="text"
                      placeholder="Kingsley"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lname">Last Name</Label>
                    <Input
                      id="lname"
                      name="lname"
                      type="text"
                      placeholder="Stone"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="**********"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="**********"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <SignInButton />
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}