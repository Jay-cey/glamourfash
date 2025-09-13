import Image from "next/image"
import dress from "@/public/images/bodycon2.jpeg"
import fash from "@/public/images/fash.png"
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
import Link from "next/link"

function page() {
  return (
    <main className="w-full grid grid-flow-row lg:grid-cols-2 justify-center items-center h-dvh">
        {/* <div className="h-full hidden lg:block"> */}
            <Image src={dress} alt="Pretty lady in a bodycon dress" className="object-top object-cover max-lg:min-h-full h-full md:hidden lg:block hidden"/>
        {/* </div> */}

        <div className="w-full flex justify-center">
            <Card className="w-full max-w-4/5 border-0 shadow-none">
                <Image src={fash} alt="Glamour Fash Logo" width={150} height={150} className="mx-auto"/>
                <CardHeader>
                    <CardTitle>Register your account</CardTitle>
                    <CardDescription>
                        Enter your details below to register to your account
                    </CardDescription>
                    <CardAction>
                        <Link href={"/auth/login"}>
                            <Button variant="outline" className="hover:bg-char text-rosegold cursor-pointer">Login</Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="fname">First Name</Label>
                                    <Input
                                        id="fname"
                                        type="text"
                                        placeholder="Kingsley"
                                        required
                                    />
                                    </div>
                                    <div className="grid gap-2">
                                    <Label htmlFor="lname">Last Name</Label>
                                    <Input
                                        id="lname"
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
                                placeholder="m@example.com"
                                required
                            />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="**********" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" placeholder="**********" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign Up with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </main>
  )
}

export default page