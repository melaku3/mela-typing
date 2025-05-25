"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Keyboard, Compass, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ThemeToggle } from "./themeToggle"
import { LanguageToggle } from "./languageToggle"
import { UserControls } from "./userControls"
import { useLanguageQuery } from "@/hooks/useLanguageQuery"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguageQuery()

  const navItems = [
    { href: "/", label: t.home, icon: Home },
    { href: "/typing", label: t.typing, icon: Keyboard },
    { href: "/explore", label: t.explore, icon: Compass },
    { href: "/dashboard", label: t.dashboard, icon: BarChart3 },
  ]

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  }

  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
    },
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)} className="w-9 h-9 p-0">
            <Menu className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-slate-900 shadow-2xl z-50 md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <motion.h2
                variants={itemVariants}
                className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-indigo-600 bg-clip-text text-transparent"
              >
                {t.menu}
              </motion.h2>
              <motion.div variants={itemVariants}>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="w-9 h-9 p-0">
                  <X className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>

            {/* Navigation Links */}
            <motion.nav variants={containerVariants} className="flex flex-col p-6 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                return (
                  <motion.div key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-amber-500/10 to-indigo-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.nav>

            {/* Controls */}
            <motion.div
              variants={containerVariants}
              className="p-6 border-t border-slate-200 dark:border-slate-700 space-y-4"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t.theme}</span>
                <ThemeToggle />
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t.language}</span>
                <LanguageToggle />
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <UserControls />
              </motion.div>
            </motion.div>

            {/* Ethiopian Pattern Decoration */}
            <motion.div
              variants={itemVariants}
              className="absolute bottom-6 left-6 right-6 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 rounded-full opacity-20"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
