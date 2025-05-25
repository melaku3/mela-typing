"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Wifi, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSettings } from "@/lib/SettingsContext"
import { useLanguageQuery } from "@/hooks/useLanguageQuery"
import { AnimatedBackground } from "@/components/ui"
import { useState, useEffect } from "react"

export default function AuthRequiredPage() {
  const { settings } = useSettings()
  const { t } = useLanguageQuery()
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatedBackground />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToHome}
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <CardTitle>{t.authRequired}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            {!isOnline && (
              <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">{t.pleaseSignIn}</span>
              </div>
            )}

            <p className="text-muted-foreground mb-6">{t.authRequired}</p>

            <div className="space-y-3">
              <Link href="/auth">
                <Button className="w-full" disabled={!isOnline}>
                  {t.signIn}
                </Button>
              </Link>

              <Link href="/explore">
                <Button variant="outline" className="w-full">
                  {t.explore} {t.continue}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
