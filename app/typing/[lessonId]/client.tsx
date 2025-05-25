"use client"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { TypingInterface } from "@/components/typing/typingInterface"
import { useUserProgress } from "@/hooks/useUserProgress"
import type { Lesson } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface TypingPageClientProps {
  lessonId: string
}

export default function TypingPageClient({ lessonId }: TypingPageClientProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { saveProgress } = useUserProgress(session?.user?.id || "")

  const {
    data: lesson,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async (): Promise<Lesson> => {
      const response = await fetch(`/api/lessons/${lessonId}`)
      if (!response.ok) throw new Error("Failed to fetch lesson")
      return response.json()
    },
  })

  const handleComplete = async (wpm: number, accuracy: number) => {
    if (!session?.user?.id || !lesson?._id) return

    try {
      await saveProgress.mutateAsync({
        userId: session.user.id,
        lessonId: lesson._id,
        wpm,
        accuracy,
      })

      // Redirect to quiz if available, otherwise to dashboard
      router.push(`/quiz/${lesson._id}`)
    } catch (error) {
      console.error("Failed to save progress:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center space-y-4">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="text-muted-foreground">Loading lesson...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center space-y-4">
            <div className="text-4xl">😞</div>
            <h2 className="text-xl font-semibold">Lesson Not Found</h2>
            <p className="text-muted-foreground">The lesson you're looking for doesn't exist or has been removed.</p>
            <Link href="/explore">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Explore
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/explore" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Explore
        </Link>
      </div>

      {/* Typing Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pb-8 overflow-hidden"
      >
        <TypingInterface lesson={lesson} onComplete={handleComplete} />
      </motion.div>
    </div>
  )
} 