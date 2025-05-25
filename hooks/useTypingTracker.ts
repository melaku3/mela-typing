"use client"

import { useState, useCallback } from "react"
import { useSettings } from "@/lib/SettingsContext"
import type { TypingStats } from "@/types"

export function useTypingTracker(content: string[]) {
  const { settings } = useSettings()
  const [stats, setStats] = useState<TypingStats>({
    currentWpm: 0,
    accuracy: 0,
    currentWordIndex: 0,
    mistakes: 0,
    isComplete: false,
  })

  const [startTime, setStartTime] = useState<number | null>(null)
  const [currentInput, setCurrentInput] = useState("")
  const [correctChars, setCorrectChars] = useState(0)
  const [totalChars, setTotalChars] = useState(0)

  const fullText = content.join(" ")

  // Play mistake sound
  const playMistakeSound = useCallback(() => {
    if (settings.audio.mistakeSound) {
      // Create a simple beep sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 400
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
  }, [settings.audio.mistakeSound])

  const calculateWPM = useCallback(() => {
    if (!startTime) return 0
    const timeElapsed = (Date.now() - startTime) / 1000 / 60 // minutes
    const wordsTyped = stats.currentWordIndex
    return Math.round(wordsTyped / timeElapsed) || 0
  }, [startTime, stats.currentWordIndex])

  const calculateAccuracy = useCallback(() => {
    if (totalChars === 0) return 100
    return Math.round((correctChars / totalChars) * 100)
  }, [correctChars, totalChars])

  const handleInput = useCallback(
    (input: string) => {
      if (!startTime) {
        setStartTime(Date.now())
      }

      setCurrentInput(input)

      const currentWord = content[stats.currentWordIndex]
      if (!currentWord) return

      // Check for mistakes
      const lastChar = input[input.length - 1]
      const expectedChar = currentWord[input.length - 1]

      if (lastChar && lastChar !== expectedChar && input.length <= currentWord.length) {
        playMistakeSound()
        setStats((prev) => ({ ...prev, mistakes: prev.mistakes + 1 }))
      }

      // Check if word is complete
      if (input.endsWith(" ") && input.trim() === currentWord) {
        const newWordIndex = stats.currentWordIndex + 1
        setStats((prev) => ({
          ...prev,
          currentWordIndex: newWordIndex,
          isComplete: newWordIndex >= content.length,
        }))
        setCurrentInput("")
        setCorrectChars((prev) => prev + currentWord.length + 1) // +1 for space
      } else {
        // Track character accuracy
        const inputChars = input.length
        const correctCount = input.split("").filter((char, index) => char === currentWord[index]).length

        setTotalChars((prev) => Math.max(prev, inputChars))
        setCorrectChars((prev) => prev + (correctCount - prev))
      }

      // Update real-time stats
      setStats((prev) => ({
        ...prev,
        currentWpm: calculateWPM(),
        accuracy: calculateAccuracy(),
      }))
    },
    [content, stats.currentWordIndex, startTime, calculateWPM, calculateAccuracy, playMistakeSound],
  )

  const resetTracker = useCallback(() => {
    setStats({
      currentWpm: 0,
      accuracy: 0,
      currentWordIndex: 0,
      mistakes: 0,
      isComplete: false,
    })
    setStartTime(null)
    setCurrentInput("")
    setCorrectChars(0)
    setTotalChars(0)
  }, [])

  return {
    stats,
    currentInput,
    handleInput,
    resetTracker,
    currentWord: content[stats.currentWordIndex] || "",
  }
}
