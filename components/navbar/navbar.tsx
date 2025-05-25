"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { Logo } from "./logo"
import { NavLinks } from "./navLinks"
import { UserControls } from "./userControls"
import { ThemeToggle } from "./themeToggle"
import { LanguageToggle } from "./languageToggle"
import { MobileMenu } from "./mobileMenu"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"])

  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"])

  const boxShadow = useTransform(scrollY, [0, 100], ["0 0 0 rgba(0, 0, 0, 0)", "0 4px 20px rgba(0, 0, 0, 0.1)"])

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50)
    })
    return unsubscribe
  }, [scrollY])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        boxShadow,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Navigation Links (Desktop) */}
          <NavLinks />

          {/* Right: Controls */}
          <div className="flex items-center space-x-2">
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
              <UserControls />
            </div>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </div>

      {/* Animated Border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  )
}
