import Image from "next/image"
import Link from "next/link"
import fash from "../../public/images/fash.png"
import { Button } from "@/components/ui/button"


export default function Navbar() {
  return (
    <nav className="sticky top-0 h-20 bg-[#505a73] flex items-center pt-2 max-md:px-3 mx-auto justify-between md:px-18 z-50 w-full">
        <div className="">
            <Image src={fash} alt="GlamourFash Logo" width={128} height={128} className="object-cover"/>
        </div>

        <div className="max-md:hidden font-sans text-black">
            <ul className="flex space-x-6 text-lg font-medium max-md:space-x-3 text-white">
                <Link href={""} className="">Home</Link>
                <Link href={""} className="">Shop</Link>
                <Link href={""} className="">About</Link>
                <Link href={""} className="">Contact</Link>
            </ul>
        </div>

        <Link href={"/auth/login"} className="-mt-3">
          <Button variant="outline" className="hover:bg-char text-yellow-700">Login</Button>
        </Link>
    </nav>
  )
}
