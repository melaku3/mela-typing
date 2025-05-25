"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTypingTracker } from "@/hooks/useTypingTracker"
import { useLessonAudio } from "@/hooks/useLessonAudio"
import { useSettings } from "@/lib/SettingsContext"
import type { Lesson } from "@/types"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface TypingInterfaceProps {
  lesson: Lesson
  onComplete: (wpm: number, accuracy: number) => void
}

export function TypingInterface({ lesson, onComplete }: TypingInterfaceProps) {
  const { settings } = useSettings()
  const { stats, currentInput, handleInput, resetTracker, currentWord } = useTypingTracker(lesson.content)
  const { isPlaying, fadeIn, fadeOut } = useLessonAudio(lesson.audioUrl, settings.audio.background)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (currentInput.length > 0 && !hasStarted) {
      setHasStarted(true)
      if (settings.audio.background) {
        fadeIn()
      }
    }
  }, [currentInput, hasStarted, fadeIn, settings.audio.background])

  useEffect(() => {
    if (stats.isComplete) {
      if (settings.audio.background) {
        fadeOut()
      }
      onComplete(stats.currentWpm, stats.accuracy)
    }
  }, [stats.isComplete, stats.currentWpm, stats.accuracy, onComplete, fadeOut, settings.audio.background])

  const progressPercentage = (stats.currentWordIndex / lesson.content.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Story Introduction */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary break-words">{lesson.title}</h1>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground">
          <span className="capitalize">{lesson.difficulty}</span>
          <span className="hidden sm:inline">•</span>
          <span className="capitalize">{lesson.language}</span>
          <span className="hidden sm:inline">•</span>
          <span>{lesson.content.length} words</span>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Stats Display */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-2 sm:gap-4">
        <Card className="p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">{stats.currentWpm}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">WPM</div>
        </Card>
        <Card className="p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.accuracy}%</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Accuracy</div>
        </Card>
        <Card className="p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold text-purple-600">{stats.mistakes}</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Mistakes</div>
        </Card>
      </motion.div>

      {/* Text Display */}
      <Card className="p-4 sm:p-6">
        <div className="text-base sm:text-lg leading-relaxed break-words overflow-hidden">
          <div className="flex flex-wrap gap-1">
            {lesson.content.map((word, index) => (
              <motion.span
                key={index}
                className={`
                  ${index < stats.currentWordIndex ? "text-green-600 bg-green-50" : ""}
                  ${index === stats.currentWordIndex ? "text-blue-600 bg-blue-50 font-semibold" : ""}
                  ${index > stats.currentWordIndex ? "text-muted-foreground" : ""}
                  px-1 py-0.5 rounded transition-colors duration-200 inline-block
                `}
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: index <= stats.currentWordIndex ? 1 : 0.5,
                  scale: index === stats.currentWordIndex ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </Card>

      {/* Input Field */}
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">
            Type: <span className="font-semibold text-primary break-words">{currentWord}</span>
          </div>
          <Input
            value={currentInput}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="Start typing..."
            className="text-center text-lg p-4 max-w-md mx-auto"
            disabled={stats.isComplete}
            autoFocus
            autoComplete="off"
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>

        {stats.isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="text-2xl font-bold text-green-600">Lesson Complete! 🎉</div>
            <div className="text-muted-foreground">
              Final Speed: {stats.currentWpm} WPM • Accuracy: {stats.accuracy}%
            </div>
            <Button onClick={resetTracker} variant="outline">
              Try Again
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
