"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { Progress } from "@/types"

export function useUserProgress(userId: string) {
  const queryClient = useQueryClient()

  const { data: progress, isLoading } = useQuery({
    queryKey: ["user-progress", userId],
    queryFn: async (): Promise<Progress[]> => {
      const response = await fetch(`/api/progress/${userId}`)
      if (!response.ok) throw new Error("Failed to fetch progress")
      return response.json()
    },
    enabled: !!userId,
  })

  const saveProgress = useMutation({
    mutationFn: async (progressData: Omit<Progress, "_id" | "completedAt">) => {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(progressData),
      })
      if (!response.ok) throw new Error("Failed to save progress")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-progress", userId] })
    },
  })

  const calculateXP = (wpm: number, accuracy: number): number => {
    const baseXP = Math.floor(wpm * 2)
    const accuracyBonus = Math.floor((accuracy / 100) * baseXP * 0.5)
    return baseXP + accuracyBonus
  }

  const getLevel = (totalXP: number): number => {
    return Math.floor(totalXP / 1000) + 1
  }

  const getTotalXP = (): number => {
    if (!progress) return 0
    return progress.reduce((total, p) => total + calculateXP(p.wpm, p.accuracy), 0)
  }

  return {
    progress,
    isLoading,
    saveProgress,
    calculateXP,
    getLevel,
    getTotalXP,
  }
}
