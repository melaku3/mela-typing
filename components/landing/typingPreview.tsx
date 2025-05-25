"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, Languages } from "lucide-react"
import { useState, useEffect } from "react"
import { useLandingMotion } from "@/hooks/useLandingMotion"

const sampleTexts = {
  english: "The Kingdom of Aksum was a powerful ancient civilization that flourished in northern Ethiopia.",
  amharic: "የአክሱም መንግሥት በሰሜን ኢትዮጵያ ያበበ ጥንታዊ ሥልጣኔ ነበር።",
}

export function TypingPreview() {
  const { refs, inView, variants } = useLandingMotion()
  const [language, setLanguage] = useState<"english" | "amharic">("english")
  const [typedText, setTypedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const currentText = sampleTexts[language]

  useEffect(() => {
    if (inView.previewInView && !isTyping) {
      setIsTyping(true)
      setTypedText("")
      setCurrentIndex(0)
    }
  }, [inView.previewInView, language])

  useEffect(() => {
    if (isTyping && currentIndex < currentText.length) {
      const timer = setTimeout(
        () => {
          setTypedText((prev) => prev + currentText[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        },
        50 + Math.random() * 50,
      ) // Variable typing speed

      return () => clearTimeout(timer)
    } else if (currentIndex >= currentText.length) {
      setTimeout(() => {
        setIsTyping(false)
        setTimeout(() => {
          setIsTyping(true)
          setTypedText("")
          setCurrentIndex(0)
        }, 2000)
      }, 1000)
    }
  }, [currentIndex, isTyping, currentText])

  // Audio waveform animation
  const waveformBars = Array.from({ length: 20 }, (_, i) => i)

  return (
    <section
      ref={refs.previewRef}
      className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(96, 165, 250, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView.previewInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Experience the Magic</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Watch as history comes alive through your fingertips
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView.previewInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 shadow-2xl">
              <CardContent className="p-8">
                {/* Language Toggle */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="flex items-center gap-2 text-amber-400"
                    >
                      <Volume2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Audio Enabled</span>
                    </motion.div>

                    {/* Animated Waveform */}
                    <div className="flex items-center gap-1">
                      {waveformBars.map((bar) => (
                        <motion.div
                          key={bar}
                          className="w-1 bg-amber-400 rounded-full"
                          animate={{
                            height: [4, Math.random() * 20 + 8, 4],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: bar * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLanguage(language === "english" ? "amharic" : "english")}
                    className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900"
                  >
                    <Languages className="w-4 h-4 mr-2" />
                    {language === "english" ? "Switch to Amharic" : "Switch to English"}
                  </Button>
                </div>

                {/* Typing Animation */}
                <div className="bg-slate-900/50 rounded-lg p-6 font-mono text-lg leading-relaxed min-h-[120px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={language}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full"
                    >
                      <div className="text-slate-300">
                        {typedText.split("").map((char, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className={char === " " ? "inline-block w-2" : ""}
                          >
                            {char}
                          </motion.span>
                        ))}
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          className="inline-block w-0.5 h-6 bg-amber-400 ml-1"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Stats Display */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <motion.div
                    className="text-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="text-2xl font-bold text-blue-400">45</div>
                    <div className="text-sm text-slate-400">WPM</div>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                  >
                    <div className="text-2xl font-bold text-green-400">98%</div>
                    <div className="text-sm text-slate-400">Accuracy</div>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  >
                    <div className="text-2xl font-bold text-amber-400">+250</div>
                    <div className="text-sm text-slate-400">XP</div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
