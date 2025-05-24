"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Volume2, Globe, Accessibility, Save } from "lucide-react"

export default function SettingsPage() {
  const { data: session } = useSession()
  const [settings, setSettings] = useState({
    language: "english",
    audioEnabled: true,
    autoplayAudio: true,
    highContrast: false,
    largeText: false,
    reducedMotion: false,
  })

  const handleSave = async () => {
    // In a real app, this would save to the database
    console.log("Saving settings:", settings)
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Please sign in to access settings</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground">Customize your Mela-Typing experience</p>
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
                Language Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Primary Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => setSettings((prev) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="amharic">Amharic (አማርኛ)</SelectItem>
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
                Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="audio-enabled">Enable Audio</Label>
                  <p className="text-sm text-muted-foreground">Play ambient sounds during typing sessions</p>
                </div>
                <Switch
                  id="audio-enabled"
                  checked={settings.audioEnabled}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, audioEnabled: checked }))}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoplay-audio">Autoplay Audio</Label>
                  <p className="text-sm text-muted-foreground">Automatically start audio when typing begins</p>
                </div>
                <Switch
                  id="autoplay-audio"
                  checked={settings.autoplayAudio}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoplayAudio: checked }))}
                  disabled={!settings.audioEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="w-5 h-5" />
                Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast Mode</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, highContrast: checked }))}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="large-text">Large Text</Label>
                  <p className="text-sm text-muted-foreground">Increase text size for better readability</p>
                </div>
                <Switch
                  id="large-text"
                  checked={settings.largeText}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, largeText: checked }))}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                </div>
                <Switch
                  id="reduced-motion"
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, reducedMotion: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button onClick={handleSave} className="w-full" size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
