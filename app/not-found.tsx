"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search } from "lucide-react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/ui/animatedBackground"
import { useLanguageQuery } from "@/hooks/useLanguageQuery"

export default function NotFound() {
  const { t } = useLanguageQuery()

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <CardContent className="p-8 space-y-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl font-bold bg-gradient-to-r from-amber-500 to-indigo-600 bg-clip-text text-transparent"
            >
              404
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{t.notFound}</h1>
              <p className="text-slate-600 dark:text-slate-400">{t.pageNotFound}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link href="/">
                <Button className="w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" />
                  {t.goHome}
                </Button>
              </Link>

              <Link href="/explore">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  {t.exploreLessons}
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
