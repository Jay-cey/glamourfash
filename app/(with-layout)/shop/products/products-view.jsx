"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaSearch, FaSlidersH, FaTimes } from "react-icons/fa";
import Link from "next/link";

const SplitText = ({ children, delay = 0 }) => {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default function ProductsView({ products }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Extract unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Parallax for Hero
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-stone-100">
        <motion.div style={{ y, opacity }} className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-stone-900 mb-4">
            <SplitText>Curated</SplitText> <SplitText delay={0.1}>Collection</SplitText>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-stone-500 text-lg max-w-md mx-auto"
          >
            Discover the latest trends designed to elevate your style.
          </motion.p>
        </motion.div>
        
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-stone-200 rounded-full opacity-30"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] border border-stone-200 rounded-full opacity-30"
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sticky Sidebar / Filters */}
          <aside className={`
            fixed inset-0 z-40 bg-white p-6 lg:p-0 lg:static lg:w-64 lg:block transition-transform duration-300 ease-in-out
            ${isFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}>
            <div className="sticky top-24 space-y-8">
              <div className="flex items-center justify-between lg:hidden mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}><FaTimes /></button>
              </div>

              {/* Search */}
              <div className="relative group">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        selectedCategory === category
                          ? "bg-black text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range (Visual Only for demo) */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Price Range</h3>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-black w-2/3 rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <span className="font-medium text-gray-900">{filteredProducts.length} Results</span>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm"
            >
              <FaSlidersH /> Filters
            </button>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-20 text-gray-500"
              >
                No products found matching your criteria.
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link href={`/shop/${product.category.toLowerCase()}/${product.name.toLocaleLowerCase().replace(/\s+/g, '-')}`}>
        <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 relative">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            src={product.images[0].src}
            alt={product.images[0].alt}
            className="h-full w-full object-cover object-center"
          />
          
          {/* Quick Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Floating Tag */}
          <div className="absolute top-3 left-3">
             <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium uppercase tracking-wider rounded-sm">
               {product.category}
             </span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              Elegant design meeting modern comfort.
            </p>
          </div>
          <p className="text-lg font-semibold text-gray-900">{product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}