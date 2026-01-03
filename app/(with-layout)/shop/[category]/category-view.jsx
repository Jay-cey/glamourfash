add"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function CategoryView({ products, category }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/shop/products" className="p-2 rounded-full hover:bg-gray-100 transition-colors group">
            <FaArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">{category}</h1>
            <p className="mt-2 text-sm text-gray-500">
              {products.length} {products.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          {products.map((product) => (
            <motion.div key={product.name} variants={itemVariants} className="group relative">
              <Link href={`/shop/${product.category.toLowerCase()}/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 relative">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="h-full w-full object-cover object-center"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md text-black px-6 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      View Details
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider rounded-sm text-gray-900">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}