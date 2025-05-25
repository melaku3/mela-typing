"use client"

import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
        <div className="w-4 h-4" />
      </Button>
    )
  }

  const isDark = theme === "dark"

  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="w-9 h-9 p-0 relative overflow-hidden group"
      >
        <motion.div
          className="relative w-4 h-4"
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isDark ? 0 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-4 h-4 text-amber-500" />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isDark ? 1 : 0,
              opacity: isDark ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
          </motion.div>
        </motion.div>

        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 rounded-md"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        />
      </Button>
    </motion.div>
  )
}
