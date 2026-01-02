"use client"

import { motion } from "framer-motion"

export default function SettingsClient({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-2xl mx-auto py-12 px-4 sm:px-6"
    >
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-stone-100">
        {children}
      </div>
    </motion.div>
  )
}
