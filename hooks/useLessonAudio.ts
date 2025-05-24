"use client"

import { useState, useEffect, useRef } from "react"

export function useLessonAudio(audioUrl: string, enabled = true) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!enabled || !audioUrl) return

    audioRef.current = new Audio(audioUrl)
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    audioRef.current.addEventListener("canplaythrough", () => {
      setIsLoaded(true)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [audioUrl, enabled])

  const play = async () => {
    if (!audioRef.current || !enabled) return

    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error("Audio play failed:", error)
    }
  }

  const pause = () => {
    if (!audioRef.current) return

    audioRef.current.pause()
    setIsPlaying(false)
  }

  const fadeIn = () => {
    if (!audioRef.current) return

    audioRef.current.volume = 0
    play()

    const fadeInterval = setInterval(() => {
      if (!audioRef.current) return

      if (audioRef.current.volume < 0.3) {
        audioRef.current.volume = Math.min(0.3, audioRef.current.volume + 0.05)
      } else {
        clearInterval(fadeInterval)
      }
    }, 100)
  }

  const fadeOut = () => {
    if (!audioRef.current) return

    const fadeInterval = setInterval(() => {
      if (!audioRef.current) return

      if (audioRef.current.volume > 0) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05)
      } else {
        pause()
        clearInterval(fadeInterval)
      }
    }, 100)
  }

  return {
    isPlaying,
    isLoaded,
    play,
    pause,
    fadeIn,
    fadeOut,
  }
}
