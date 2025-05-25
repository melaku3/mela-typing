"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import { LessonCard } from "@/components/lesson/lessonCard"
import { useLanguageQuery } from "@/hooks/useLanguageQuery"
import type { Lesson } from "@/types"

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<"all" | "english" | "amharic">("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "beginner" | "intermediate" | "advanced">("all")
  const { t } = useLanguageQuery()

  const { data: lessons, isLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: async (): Promise<Lesson[]> => {
      const response = await fetch("/api/lessons")
      if (!response.ok) throw new Error("Failed to fetch lessons")
      return response.json()
    },
  })

  const filteredLessons =
    lessons?.filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesLanguage = selectedLanguage === "all" || lesson.language === selectedLanguage
      const matchesDifficulty = selectedDifficulty === "all" || lesson.difficulty === selectedDifficulty

      return matchesSearch && matchesLanguage && matchesDifficulty
    }) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            {t.exploreLessons}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.ethiopianHistory}</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 mb-8"
        >
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={t.searchLessons}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t.language}:</span>
              {(["all", "english", "amharic"] as const).map((lang) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang)}
                  className="capitalize"
                >
                  {lang === "all" ? t.allLevels : lang}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t.difficulty}:</span>
              {(["all", "beginner", "intermediate", "advanced"] as const).map((diff) => (
                <Button
                  key={diff}
                  variant={selectedDifficulty === diff ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty(diff)}
                  className="capitalize"
                >
                  {diff === "all" ? t.allLevels : t[diff as keyof typeof t] || diff}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <p className="text-muted-foreground">{isLoading ? t.loading : `${filteredLessons.length} ${t.lessons}`}</p>
        </motion.div>

        {/* Lessons Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-64 animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-20 bg-muted rounded" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredLessons.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson, index) => (
              <LessonCard key={lesson._id} lesson={lesson} index={index} />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">{t.noLessonsFound}</h3>
            <p className="text-muted-foreground">{t.tryAgainLater}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
