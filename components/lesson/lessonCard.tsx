"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, Globe } from "lucide-react"
import type { Lesson } from "@/types"
import Link from "next/link"

interface LessonCardProps {
  lesson: Lesson
  index: number
}

export function LessonCard({ lesson, index }: LessonCardProps) {
  const estimatedTime = Math.ceil(lesson.content.length / 40) // Assuming 40 WPM average

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg line-clamp-2">{lesson.title}</CardTitle>
            <Badge
              variant={
                lesson.difficulty === "beginner"
                  ? "default"
                  : lesson.difficulty === "intermediate"
                    ? "secondary"
                    : "destructive"
              }
            >
              {lesson.difficulty}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{estimatedTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{lesson.content.length} words</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span className="capitalize">{lesson.language}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {lesson.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {lesson.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{lesson.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Link href={`/typing/${lesson._id}`}>
              <Button className="w-full">Start Typing</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
