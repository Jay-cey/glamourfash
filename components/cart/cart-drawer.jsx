"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/cart-context";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, clearCart } = useCart();

  // Automatically clear cart if data structure is invalid (e.g. old schema)
  useEffect(() => {
    const hasInvalidItems = cart.some((item) => 
      (item.selectedColor && (!item.selectedColor.classes || typeof item.selectedColor !== 'object')) ||
      !item.productId
    );

    if (hasInvalidItems && clearCart) {
      clearCart();
    }
  }, [cart, clearCart]);

  const subtotal = cart.reduce((total, item) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return total + price * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Shopping Bag ({cart.length})</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-gray-500 text-lg">Your bag is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-black underline underline-offset-4 font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.itemId} className="flex gap-4">
                    <div className="relative w-24 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={item.images[0].src}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="font-semibold text-gray-900">
                            {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                        <div className="flex gap-2 mt-2 text-sm text-gray-600">
                          {item.selectedColor && (
                            <span className="flex items-center gap-1">
                              <span className={`w-3 h-3 rounded-full ${item.selectedColor.classes?.split(' ')[0] || 'bg-gray-200'}`} />
                              {item.selectedColor.name}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="border-l border-gray-300 pl-2">
                              Size: {item.selectedSize.name}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 text-gray-600"
                          >
                            <FaPlus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.itemId)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4 bg-gray-50">
                <div className="flex items-center justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors text-center"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}