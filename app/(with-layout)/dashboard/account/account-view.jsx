"use client";

import { motion } from "framer-motion";
import { FaUser, FaShieldAlt, FaCog } from "react-icons/fa";
import Link from "next/link";

export default function AccountView({ user }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto p-6 space-y-8"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Account</h1>
          <p className="text-gray-500 mt-2">
            Manage your profile information and account preferences.
          </p>
        </div>
        <Link href="/dashboard/account/settings">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors font-medium"
          >
            <FaCog className="w-4 h-4" />
            <span>Settings</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Profile Section */}
      <motion.section
        variants={itemVariants}
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
            <FaUser className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
        </div>

        <div className="p-6 grid gap-6 md:grid-cols-2">
          <div className="col-span-2 flex items-center gap-4 mb-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg ring-1 ring-gray-200"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <FaUser className="w-8 h-8" />
                </div>
              )}
            </motion.div>
            <div>
              <p className="font-medium text-gray-900">Profile Picture</p>
              <p className="text-sm text-gray-500">Managed by your login provider.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <div className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 items-center shadow-sm">
              {user.name || "Not provided"}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 items-center shadow-sm">
              {user.email}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Security Section */}
      <motion.section
        variants={itemVariants}
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg shadow-sm">
            <FaShieldAlt className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Security</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Authentication</p>
              <p className="text-sm text-gray-500 mt-1">
                Your account is secured via <strong>{user.email}</strong>.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}