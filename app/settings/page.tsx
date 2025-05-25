"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Volume2, Globe, Palette, Save } from "lucide-react"
import { useSettings } from "@/lib/SettingsContext"
import { useLanguageQuery } from "@/hooks/useLanguageQuery"
import { AnimatedBackground } from "@/components/ui/animatedBackground"

export default function SettingsPage() {
  const { data: session } = useSession()
  const { settings, updateSettings, isLoading } = useSettings()
  const { t } = useLanguageQuery()
  const [isSaving, setIsSaving] = useState(false)
  const [localSettings, setLocalSettings] = useState(settings)

  // Update local settings when global settings change
  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateSettings(localSettings)

      // Show success toast
      toast({
        title: t.settingsSaved,
        description: t.settingsSaved,
      })
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast({
        title: t.somethingWentWrong,
        description: t.tryAgainLater,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const updateLocalSetting = (path: string, value: any) => {
    setLocalSettings((prev) => {
      const newSettings = { ...prev }
      const keys = path.split(".")
      let current = newSettings as any

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = value

      return newSettings
    })
  }

  if (!session) {
    // Redirect to auth-required page for unauthenticated users
    window.location.href = "/auth-required"
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-8 max-w-2xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            {t.settings}
          </h1>
          <p className="text-muted-foreground">{t.chooseLanguage}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {t.languageSettings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">{t.chooseLanguage}</Label>
                <Select
                  value={localSettings.language}
                  onValueChange={(value: "en" | "am") => updateLocalSetting("language", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="am">አማርኛ (Amharic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                {t.audioSettings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="background-music">{t.enableBackgroundMusic}</Label>
                  <p className="text-sm text-muted-foreground">{t.enableBackgroundMusic}</p>
                </div>
                <Switch
                  id="background-music"
                  checked={localSettings.audio.background}
                  onCheckedChange={(checked) => updateLocalSetting("audio.background", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mistake-buzzer">{t.enableSoundEffects}</Label>
                  <p className="text-sm text-muted-foreground">{t.enableSoundEffects}</p>
                </div>
                <Switch
                  id="mistake-buzzer"
                  checked={localSettings.audio.mistakeSound}
                  onCheckedChange={(checked) => updateLocalSetting("audio.mistakeSound", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                {t.themeSettings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">{t.themeSettings}</Label>
                <Select
                  value={localSettings.appearance}
                  onValueChange={(value: "light" | "dark" | "system") => updateLocalSetting("appearance", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">{t.lightMode}</SelectItem>
                    <SelectItem value="dark">{t.darkMode}</SelectItem>
                    <SelectItem value="system">{t.systemMode}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={handleSave} className="w-full" size="lg" disabled={isSaving}>
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  {t.loading}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {t.save}
                </div>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
