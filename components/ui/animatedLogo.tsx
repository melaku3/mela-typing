"use client"

import { motion } from "framer-motion"
import { useLanguageQuery } from "@/hooks/useLanguageQuery"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg"
  showUnderline?: boolean
}

export function AnimatedLogo({ size = "md", showUnderline = false }: AnimatedLogoProps) {
  const { t } = useLanguageQuery()

  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl md:text-7xl",
  }

  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1 className={`${sizeClasses[size]} font-bold`}>
        <motion.span
          className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Mela
        </motion.span>
        <motion.span
          className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        >
          -Typing
        </motion.span>
      </motion.h1>

      {showUnderline && (
        <motion.div
          className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      )}
    </motion.div>
  )
}
