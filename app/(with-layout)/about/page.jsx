"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image"
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Importing images
import heroImg from "../../../public/images/her.jpg";
import storyImg from "../../../public/images/her3.jpg";
import valueImg1 from "../../../public/images/her2.jpg";
import valueImg2 from "../../../public/images/her1.jpg";

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate text sections on scroll
      const textElements = gsap.utils.toArray('.reveal-text');
      textElements.forEach((text) => {
        gsap.fromTo(text, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
            }
          }
        );
      });

      // Parallax effect for images
      gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-stone-50 min-h-screen text-stone-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={heroImg} 
            alt="GlamourFash Hero" 
            fill 
            className="object-cover brightness-[0.6]"
            priority
            placeholder="blur"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 tracking-tight"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-2xl font-light tracking-wide opacity-90"
          >
            Weaving elegance into the fabric of everyday life.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif reveal-text">Redefining Modern Elegance</h2>
            <div className="w-20 h-1 bg-stone-900 reveal-text"></div>
            <p className="text-lg text-stone-600 leading-relaxed reveal-text">
              GlamourFash was born from a simple idea: that fashion should be both empowering and accessible. We believe that what you wear is a reflection of who you are, and every piece in our collection is curated to help you express your unique narrative.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed reveal-text">
              From the stitching of a hem to the silhouette of a dress, we obsess over the details so you don't have to. Our mission is to provide a curated selection of high-quality, trend-setting pieces that stand the test of time.
            </p>
          </div>
          <div className="w-full md:w-1/2 relative h-[600px] overflow-hidden rounded-lg shadow-2xl">
            <div className="absolute inset-0 bg-stone-200">
               <Image 
                 src={storyImg} 
                 alt="Our Mission" 
                 fill 
                 className="object-cover parallax-img scale-110" 
               />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-stone-900 text-stone-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4 reveal-text">Our Core Values</h2>
            <p className="text-stone-400 max-w-2xl mx-auto reveal-text">The principles that guide every thread we weave and every choice we make.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Quality First", desc: "We never compromise on materials or craftsmanship. Every piece is designed to last." },
              { title: "Inclusivity", desc: "Fashion is for everyone. We celebrate diversity in style, size, and expression." },
              { title: "Sustainability", desc: "We are committed to responsible sourcing and reducing our environmental footprint." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-stone-800 p-10 rounded-xl border border-stone-700 hover:border-stone-500 transition-colors"
              >
                <h3 className="text-2xl font-serif mb-4 text-white">{item.title}</h3>
                <p className="text-stone-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-serif reveal-text">The Collection</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[80vh] min-h-[600px]">
          <div className="relative h-full rounded-lg overflow-hidden group cursor-pointer">
            <Image 
              src={valueImg1} 
              alt="Collection Highlight 1" 
              fill 
              className="object-cover object-top transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
              <span className="text-white text-4xl font-serif opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                Timeless
              </span>
            </div>
          </div>
          <div className="relative h-full rounded-lg overflow-hidden group cursor-pointer">
            <Image 
              src={valueImg2} 
              alt="Collection Highlight 2" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
              <span className="text-white text-4xl font-serif opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                Bold
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}