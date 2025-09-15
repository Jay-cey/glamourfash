"use client";

import Image from "next/image"
import Link from "next/link"
import fash from "../../public/images/fash.png"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();



  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);
  return (
    <nav className={`top-0 h-20 flex items-center pt-2 max-md:px-3 mx-auto justify-between md:px-18 z-50 w-full 
      ${pathname === "/"
        ? `transition-all duration-50 ${
          scrolled
            ? "bg-[#505a73] shadow-lg py-2 sticky":"bg-transparent py-4 mt-3 fixed"
        }` : `bg-[#505a73] sticky py-2`
      }    
    `}>
        <div className="">
            <Image src={fash} alt="GlamourFash Logo" width={128} height={128} className="object-cover"/>
        </div>

        <div className="max-md:hidden font-sans text-black">
            <ul className="flex space-x-6 text-lg font-medium max-md:space-x-3 text-white">
                <Link href={"/"} className="">Home</Link>
                <Link href={"/shop/product"} className="">Shop</Link>
                <Link href={"#"} className="">About</Link>
                <Link href={"#"} className="">Contact</Link>
            </ul>
        </div>

        {session?.user ? (
        <div className="-mt-3 flex items-center gap-3">
          <span className="text-white font-medium">{session.user?.name}</span>
          <Button
            variant="outline"
            className="hover:bg-char text-yellow-700"
            onClick={() => {
              signOut({redirectTo:"/"}) // call your custom signOut if needed
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link href={"/auth/login"} className="-mt-3">
          <Button variant="outline" className="hover:bg-char text-yellow-700">Login</Button>
        </Link>
      )}
    </nav>
  )
}
