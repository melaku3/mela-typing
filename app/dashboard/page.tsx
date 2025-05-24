"use client"

import { useSession } from "next-auth/react"
import { useUserProgress } from "@/hooks/useUserProgress"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Clock, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const { progress, isLoading, getTotalXP, getLevel, calculateXP } = useUserProgress(session?.user?.id || "")

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Please sign in to view your dashboard</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center space-y-4">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="text-muted-foreground">Loading your progress...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalXP = getTotalXP()
  const currentLevel = getLevel(totalXP)
  const xpForNextLevel = currentLevel * 1000
  const xpProgress = ((totalXP % 1000) / 1000) * 100

  const averageWPM = progress?.length ? Math.round(progress.reduce((sum, p) => sum + p.wpm, 0) / progress.length) : 0

  const averageAccuracy = progress?.length
    ? Math.round(progress.reduce((sum, p) => sum + p.accuracy, 0) / progress.length)
    : 0

  const recentProgress = progress?.slice(-5).reverse() || []

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
            Your Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">Track your typing journey and celebrate your progress</p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentLevel}</div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{totalXP} XP</span>
                    <span>{xpForNextLevel} XP</span>
                  </div>
                  <Progress value={xpProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average WPM</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageWPM}</div>
                <p className="text-xs text-muted-foreground">Words per minute</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Accuracy</CardTitle>
                <Target className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageAccuracy}%</div>
                <p className="text-xs text-muted-foreground">Typing accuracy</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
                <Clock className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progress?.length || 0}</div>
                <p className="text-xs text-muted-foreground">Total sessions</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentProgress.length > 0 ? (
                <div className="space-y-4">
                  {recentProgress.map((session, index) => (
                    <div key={session._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Lesson Completed</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(session.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{session.wpm} WPM</Badge>
                        <Badge variant="outline">{session.accuracy}% Accuracy</Badge>
                        <Badge variant="outline">+{calculateXP(session.wpm, session.accuracy)} XP</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
                  <p className="text-muted-foreground">Complete your first lesson to see your progress here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
