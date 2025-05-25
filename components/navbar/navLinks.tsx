"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Keyboard, Compass, BarChart3 } from "lucide-react"
import { useLanguageQuery } from "@/hooks/useLanguageQuery"

export function NavLinks() {
  const pathname = usePathname()
  const { t } = useLanguageQuery()

  const navItems = [
    { href: "/", label: t.home, icon: Home },
    { href: "/typing", label: t.typing, icon: Keyboard },
    { href: "/explore", label: t.explore, icon: Compass },
    { href: "/dashboard", label: t.dashboard, icon: BarChart3 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="hidden md:flex items-center space-x-8"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

        return (
          <motion.div key={item.href} variants={itemVariants} className="relative group">
            <Link
              href={item.href}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="font-medium">{item.label}</span>
            </Link>

            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-indigo-500/10 rounded-lg border border-amber-500/20"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            {/* Hover Underline */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-indigo-600 rounded-full"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: isActive ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )
      })}
    </motion.nav>
  )
}
