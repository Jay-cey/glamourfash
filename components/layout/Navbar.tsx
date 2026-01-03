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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
      scrolled || pathname !== "/" 
        ? "bg-white/95 backdrop-blur-sm py-3 text-stone-900 shadow-sm" 
        : "bg-transparent py-6 text-white"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex-shrink-0">
            <Image src={fash} alt="GlamourFash Logo" width={140} height={40} className="object-contain w-32 md:w-40"/>
        </div>

        <div className="hidden md:flex items-center gap-8">
            <ul className="flex space-x-8 text-sm font-medium uppercase tracking-widest">
                <Link href={"/"} className="hover:text-rosegold transition-colors">Home</Link>
                <Link href={"/shop/products"} className="hover:text-rosegold transition-colors">Shop</Link>
                <Link href={"/about"} className="hover:text-rosegold transition-colors">About</Link>
                <Link href={"/contact"} className="hover:text-rosegold transition-colors">Contact</Link>
            </ul>
        </div>

        <div className="flex items-center gap-4">
        {session?.user ? (
        <div className="flex items-center gap-4">
          <Link href="/dashboard/account/settings" className="hidden md:block text-sm font-medium">{session.user?.name}</Link>
          <Button
            variant="outline"
            className={`rounded-full px-6 text-xs uppercase tracking-widest transition-all ${
              scrolled || pathname !== "/" 
                ? "border-stone-200 hover:bg-stone-100 hover:text-stone-900" 
                : "border-white/50 hover:bg-white text-stone-900 hover:text-rosegold"
            }`}
            onClick={() => {
              signOut({redirectTo:"/"}) // call your custom signOut if needed
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link href={"/auth/login"}>
          <Button 
            variant="outline" 
            className={`rounded-full px-6 text-xs uppercase tracking-widest transition-all ${
              scrolled || pathname !== "/" 
                ? "border-stone-200 hover:bg-stone-100 hover:text-stone-900" 
                : "border-white/50  hover:bg-white text-stone-900 hover:text-rosegold"
            }`}
          >
            Login
          </Button>
        </Link>
      )}
        </div>
      </div>
    </nav>
  )
}
