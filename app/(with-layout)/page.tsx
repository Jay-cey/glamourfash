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
    <main className="relative min-h-screen bg-stone-50 text-stone-900">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover max-sm:object-[25%_50%] brightness-40"
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
        <div ref={stickyRef} className="w-1/2 h-screen flex flex-col items-center justify-center p-12">
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
          <Image src={hero} alt="GlamourFash" className="w-full max-w-sm mx-auto mb-8"/>
          <h2 className="text-3xl font-serif mb-4">Redefining Style</h2>
          <p className="text-stone-600 mb-8">Your one-stop shop for the latest fashion trends.</p>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6">Discover Our Collections</h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto font-light">Explore our wide range of clothing, accessories, and more.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Productsroll/>
            
            <div className="mt-16 text-center">
              <Link href="/shop/products">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 border border-stone-900 text-stone-900 uppercase tracking-widest text-sm hover:bg-stone-900 hover:text-white transition-colors duration-300"
                >
                  View All Products
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features / Values Section */}
      <section className="py-24 bg-white border-t border-stone-100">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {[
                    { title: "Premium Quality", desc: "Crafted with the finest materials for lasting elegance." },
                    { title: "Sustainable Fashion", desc: "Ethically sourced and produced with care for the planet." },
                    { title: "Express Delivery", desc: "Fast and reliable shipping to your doorstep worldwide." }
                ].map((feature, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                        className="p-6"
                    >
                        <h3 className="text-2xl font-serif mb-4 text-stone-800">{feature.title}</h3>
                        <p className="text-stone-500 font-light leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-stone-900 text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-serif mb-6"
            >
                Join the GlamourFash Club
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-stone-400 mb-10 font-light text-lg"
            >
                Subscribe to receive updates, access to exclusive deals, and more.
            </motion.p>
            <motion.form 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-6 py-4 bg-stone-800 border border-stone-700 focus:outline-none focus:border-stone-500 text-white placeholder-stone-500"
                />
                <button className="px-8 py-4 bg-white text-stone-900 font-medium uppercase tracking-wider hover:bg-stone-200 transition-colors">
                    Subscribe
                </button>
            </motion.form>
        </div>
      </section>
    </main>
  );
}
