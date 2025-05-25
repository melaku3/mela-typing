"use client"

import { motion } from "framer-motion"

const orbs = [
  { width: 88, height: 61, left: 22, top: 93 },
  { width: 82, height: 144, left: 35, top: 65 },
  { width: 133, height: 112, left: 47, top: 79 },
  { width: 134, height: 115, left: 20, top: 32 },
  { width: 51, height: 84, left: 39, top: 13 },
  { width: 97, height: 91, left: 39, top: 98 },
]

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Floating orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-green-400/20"
          style={{
            width: orb.width,
            height: orb.height,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
          }}
          animate={{
            x: [0, 100 - Math.abs(i * 20)],
            y: [0, 100 - Math.abs(i * 20)],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
