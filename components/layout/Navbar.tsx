"use client";

import Image from "next/image"
import Link from "next/link"
import fash from "../../public/images/fash.png"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/app/context/cart-context";
import { FaShoppingBag, FaSearch } from "react-icons/fa";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const { cart, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

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
          <div className="relative flex items-center">
            <form 
              onSubmit={handleSearchSubmit}
              className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
                isSearchOpen ? "w-40 md:w-60 opacity-100 mr-2" : "w-0 opacity-0"
              }`}
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setIsSearchOpen(false)}
                className={`w-full bg-transparent border-b border-current focus:outline-none text-sm py-1 ${
                  scrolled || pathname !== "/" ? "placeholder-stone-400" : "placeholder-white/70"
                }`}
              />
            </form>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:text-rosegold transition-colors"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative p-2 hover:text-rosegold transition-colors"
          >
            <FaShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
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
