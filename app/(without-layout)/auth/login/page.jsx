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
// import { register } from "module"

export default function CardDemo() {
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
              <Button variant="outline" className="text-[#e1c1b6]">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
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
                <Input id="password" type="password" placeholder="••••••••••••" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link href={"/"} className="w-full">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </Link>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
      </div>
    </main>
  )
}
