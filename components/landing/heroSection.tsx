"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { useLandingMotion } from "@/hooks/useLandingMotion"

// Predefined positions for floating elements
const FLOATING_ELEMENTS = [
  { left: 33.02, top: 86.96 },
  { left: 55.18, top: 58.30 },
  { left: 43.48, top: 80.08 },
  { left: 73.89, top: 68.87 },
  { left: 26.03, top: 36.86 },
  { left: 16.60, top: 13.48 },
  { left: 64.64, top: 57.90 },
  { left: 2.76, top: 17.36 },
]

export function HeroSection() {
  const { refs, inView, variants } = useLandingMotion()

  const typewriterText = "Type Faster. Learn Deeper. The Ethiopian Way."

  return (
    <section
      ref={refs.heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
    >
      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Floating Ethiopian Pattern Elements */}
      {FLOATING_ELEMENTS.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
          style={{
            left: `${position.left}%`,
            top: `${position.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        />
      ))}

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Animated Brand Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">
              <motion.span
                className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Mela
              </motion.span>
              <motion.span
                className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              >
                -Typing
              </motion.span>
            </h1>

            {/* Animated SVG Underlines */}
            <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 400 20" fill="none">
              <motion.path
                d="M10 15 Q 80 5, 150 15"
                stroke="rgb(251 191 36)"
                strokeWidth="3"
                strokeLinecap="round"
                variants={variants.underlineVariants}
                initial="hidden"
                animate="visible"
              />
              <motion.path
                d="M200 15 Q 270 5, 340 15"
                stroke="rgb(96 165 250)"
                strokeWidth="3"
                strokeLinecap="round"
                variants={variants.underlineVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.2 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Typewriter Effect Headline */}
        <motion.div variants={variants.typewriterContainer} initial="hidden" animate="visible" className="mb-6">
          <h2 className="text-2xl md:text-4xl font-serif text-slate-200 leading-relaxed">
            {typewriterText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={variants.typewriterChild}
                className={char === " " ? "inline-block w-2" : ""}
              >
                {char}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Unbiased history, immersive stories, and typing mastery in one elegant experience.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/typing">
            <motion.div variants={variants.rippleEffect} whileHover="hover" whileTap="tap">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold shadow-2xl"
              >
                Start Typing Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </Link>

          <Link href="/explore">
            <motion.div variants={variants.rippleEffect} whileHover="hover" whileTap="tap">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              >
                <Play className="mr-2 w-5 h-5" />
                Explore History
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-slate-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
