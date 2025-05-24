"use client"

import { useState, useCallback } from "react"
import type { TypingStats } from "@/types"

export function useTypingTracker(content: string[]) {
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
    [content, stats.currentWordIndex, startTime, calculateWPM, calculateAccuracy],
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
