"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Logo() {
  const pathname = usePathname()
  const isHome = pathname === "/" || pathname === "/landing"

  return (
    <Link href="/" className="relative group">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center space-x-1"
      >
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg"
        >
          <span className="text-white font-bold text-sm">M</span>
        </motion.div>

        {/* Brand Text */}
        <div className="relative">
          <h1 className="text-xl font-bold font-mono">
            <motion.span
              className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Mela
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.05 }}
            >
              -typing
            </motion.span>
          </h1>

          {/* Animated Underline */}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-indigo-600 rounded-full"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />

          {/* Typing Cursor Animation */}
          {isHome && (
            <motion.div
              className="absolute -right-2 top-0 w-0.5 h-5 bg-amber-500"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </div>
      </motion.div>
    </Link>
  )
}
