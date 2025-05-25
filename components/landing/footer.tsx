"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Globe, Shield, Heart } from "lucide-react"
import Link from "next/link"
import { useLandingMotion } from "@/hooks/useLandingMotion"

export function Footer() {
  const { refs, inView } = useLandingMotion()

  const footerLinks = [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <footer ref={refs.footerRef} className="bg-slate-900 text-slate-300 py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView.footerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand Section */}
          <div className="space-y-6">
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <h3 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Mela
                </span>
                <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                  -Typing
                </span>
              </h3>
            </motion.div>
            <p className="text-slate-400 leading-relaxed">
              Bridging cultures through technology, one keystroke at a time. Experience Ethiopian heritage while
              mastering digital skills.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="w-4 h-4 text-red-500" />
              </motion.div>
              <span>in Ethiopia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView.footerInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="block text-slate-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Language & Social */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView.footerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-400 hover:border-amber-400 hover:text-amber-400"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  English / አማርኛ
                </Button>
              </motion.div>

              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
                    <Github className="w-5 h-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
                    <Shield className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView.footerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="pt-8 border-t border-slate-800 text-center"
        >
          <p className="text-slate-500">© 2024 Mela-Typing. Preserving heritage, empowering futures.</p>
        </motion.div>
      </div>
    </footer>
  )
}
