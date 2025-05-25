"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"

export function useLandingMotion() {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const previewRef = useRef(null)
  const footerRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const previewInView = useInView(previewRef, { once: true, margin: "-100px" })
  const footerInView = useInView(footerRef, { once: true, margin: "-50px" })

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const typewriterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.5,
      },
    },
  }

  const typewriterChild = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  }

  const underlineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut", delay: 1 },
    },
  }

  const hoverLift = {
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 300 },
    },
  }

  const rippleEffect = {
    tap: { scale: 0.95 },
    hover: { scale: 1.05 },
  }

  return {
    refs: { heroRef, featuresRef, previewRef, footerRef },
    inView: { heroInView, featuresInView, previewInView, footerInView },
    variants: {
      fadeInUp,
      fadeInLeft,
      fadeInRight,
      staggerContainer,
      scaleIn,
      typewriterContainer,
      typewriterChild,
      underlineVariants,
      hoverLift,
      rippleEffect,
    },
  }
}
