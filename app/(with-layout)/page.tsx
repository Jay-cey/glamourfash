"use client";

import React, { useEffect, useRef } from "react";
import hero from "../../public/images/fash.png"
// import CarouselDem from "../../components/carousel";
import Image from "next/image";
import Productsroll from "../../components/productsroll";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const stickyRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        scrub: 1,
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover brightness-50"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={"/videos/herovid.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-4 tracking-tight"
          >
            GlamourFash
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl font-light tracking-wide mb-8 opacity-90"
          >
            Where Elegance Meets Confidence
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href={"/shop/products"}>
              <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-stone-200 transition-colors uppercase text-sm tracking-widest">
                  Shop Now
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sticky Brand Section */}
      <section ref={triggerRef} className="hidden md:flex w-full min-h-[150vh] relative bg-white">
        <div ref={stickyRef} className="w-1/2 h-screen flex flex-col items-center justify-center p-12 sticky top-0">
          <h2 className="text-6xl font-serif leading-tight mb-6">Redefining<br/><span className="italic text-stone-500">Modern</span> Style</h2>
          <p className="text-lg text-stone-600 max-w-md text-center">
            Your one-stop shop for the latest fashion trends. We curate pieces that empower and inspire confidence in every step.
          </p>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center py-24 px-12 gap-12 bg-stone-50">
          <div className="relative w-full max-w-md group">
            <div className="absolute -inset-4 border border-stone-300 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100" />
            <Image 
              src={hero} 
              alt="GlamourFash Style" 
              className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" 
            />
            {/* <svg viewBox="0 0 400 500" className="w-full h-auto shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] bg-stone-100" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="500" fill="#f5f5f4"/>
              <path d="M200 50 C 50 50, 50 450, 200 450 C 350 450, 350 50, 200 50 Z" fill="none" stroke="#e7e5e4" strokeWidth="2" />
              <path d="M200 80 C 80 80, 80 420, 200 420 C 320 420, 320 80, 200 80 Z" fill="none" stroke="#d6d3d1" strokeWidth="1.5" />
              <path d="M200 110 C 110 110, 110 390, 200 390 C 290 390, 290 110, 200 110 Z" fill="none" stroke="#a8a29e" strokeWidth="1" />
              <circle cx="300" cy="100" r="40" fill="#d6d3d1" opacity="0.3" />
              <circle cx="100" cy="400" r="60" fill="#d6d3d1" opacity="0.3" />
            </svg> */}
          </div>
          <div className="max-w-md text-center">
             <h3 className="text-4xl font-serif text-stone-800 mb-4">Curated Collections</h3>
             <p className="text-stone-600 leading-relaxed mb-8">Explore our wide range of clothing, accessories, and more. Designed for the modern individual who values both style and substance.</p>
             <Link href="/shop/product" className="inline-block border-b border-stone-900 pb-1 text-sm uppercase tracking-widest hover:text-stone-600 hover:border-stone-600 transition-all">
               Shop The Look
             </Link>
          </div>
        </div>
      </section>

      {/* Mobile Content (Non-sticky) */}
      <section className="md:hidden py-16 px-6 bg-white text-center">
          <Image src={hero} alt="GlamourFash" className="w-full max-w-sm mx-auto mb-8 shadow-lg"/>
          <h2 className="text-3xl font-serif mb-4">Redefining Style</h2>
          <p className="text-stone-600 mb-8">Your one-stop shop for the latest fashion trends.</p>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-stone-900 mb-4">Discover Our Collections</h2>
            <p className="text-stone-500">Explore our wide range of clothing, accessories, and more.</p>
          </div>
          <Productsroll/>
        </div>
      </section>
    </main>
  );
}
