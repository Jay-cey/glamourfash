"use client";

import Image from "next/image"
import Link from "next/link"
import fash from "../../public/images/fash.png"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/app/context/cart-context";
import { FaShoppingBag, FaSearch, FaBars, FaTimes, FaBox, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const { cart, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pendingOrders, setPendingOrders] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

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
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };

      handleScroll();

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      if (session?.user) {
        try {
          const response = await fetch('/api/orders');
          if (response.ok) {
            const orders = await response.json();
            const count = Array.isArray(orders) ? orders.filter((order: any) => order.status === 'PENDING').length : 0;
            setPendingOrders(count);
          }
        } catch (error) {
          console.error("Failed to fetch pending orders:", error);
        }
      }
    };

    fetchPendingOrders();
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }

      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
      scrolled || pathname !== "/" 
        ? "bg-white/95 backdrop-blur-sm py-3 text-stone-900 shadow-sm top-0" 
        : "bg-transparent py-6 text-white"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex-shrink-0">
            <Link href="/">
              <Image src={fash} alt="GlamourFash Logo" width={140} height={40} className="object-contain w-32 md:w-40"/>
            </Link>
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
            <motion.form 
              initial={{ width: 0, opacity: 0, marginRight: 0 }}
              animate={{ width: isSearchOpen ? "auto" : 0, opacity: isSearchOpen ? 1 : 0, marginRight: isSearchOpen ? 8 : 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSearchSubmit}
              className="flex items-center overflow-hidden"
            >
              <div className="w-40 md:w-60">
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
              </div>
            </motion.form>
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
        <div className="hidden md:block">
        {session?.user ? (
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-2 hover:text-rosegold transition-colors focus:outline-none"
          >
            <FaUser className="w-5 h-5" />
            {pendingOrders > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {pendingOrders}
              </span>
            )}
          </button>

          <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50"
            >
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">{session.user.name}</p>
                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
              </div>
              <Link 
                href="/dashboard/account" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-rosegold"
                onClick={() => setIsProfileOpen(false)}
              >
                Account
              </Link>
              <Link 
                href="/dashboard/orders" 
                className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-rosegold"
                onClick={() => setIsProfileOpen(false)}
              >
                <span>My Orders</span>
                {pendingOrders > 0 && (
                  <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {pendingOrders}
                  </span>
                )}
              </Link>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  signOut({redirectTo:"/"});
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-rosegold border-t border-gray-100"
              >
                Logout
              </button>
            </motion.div>
          )}
          </AnimatePresence>
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

        <button 
          ref={mobileMenuButtonRef}
          className="md:hidden p-2 hover:text-rosegold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          ref={mobileMenuRef}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white text-stone-900 overflow-hidden shadow-lg border-t border-gray-100"
        >
         <div className="flex flex-col p-6 gap-6">
            <Link href={"/"} className="text-sm font-medium uppercase tracking-widest hover:text-rosegold transition-colors">Home</Link>
            <Link href={"/shop/products"} className="text-sm font-medium uppercase tracking-widest hover:text-rosegold transition-colors">Shop</Link>
            <Link href={"/about"} className="text-sm font-medium uppercase tracking-widest hover:text-rosegold transition-colors">About</Link>
            <Link href={"/contact"} className="text-sm font-medium uppercase tracking-widest hover:text-rosegold transition-colors">Contact</Link>
            
            <div className="h-px bg-gray-100" />
            
            {session?.user ? (
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard/account" className="hover:text-rosegold transition-colors" title="Account">
                            <FaUser className="w-5 h-5" />
                        </Link>
                        <Link href="/dashboard/orders" className="relative hover:text-rosegold transition-colors" title="My Orders">
                            <FaBox className="w-5 h-5" />
                            {pendingOrders > 0 && (
                              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {pendingOrders}
                              </span>
                            )}
                        </Link>
                    </div>
                    <button onClick={() => signOut({redirectTo:"/"})} className="text-sm font-medium uppercase tracking-widest hover:text-rosegold transition-colors">
                        Logout
                    </button>
                </div>
            ) : (
                <Link href={"/auth/login"} className="text-sm font-medium uppercase tracking-widest hover:text-rosegold transition-colors">
                    Login
                </Link>
            )}
         </div>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  )
}
