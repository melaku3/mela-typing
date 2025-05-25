"use client"

// This file is deprecated - settings are now managed via React Query
// See hooks/useUserSettings.tsx and lib/services/userService.ts

import type React from "react"
import { createContext } from "react"

export interface UserSettings {
  language: "en" | "am"
  audio: {
    background: boolean
    mistakeSound: boolean
  }
  appearance: "light" | "dark" | "system"
}

interface SettingsContextType {
  settings: UserSettings
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>
  resetProgress: () => Promise<void>
  isLoading: boolean
}

const defaultSettings: UserSettings = {
  language: "en",
  audio: {
    background: true,
    mistakeSound: true,
  },
  appearance: "system",
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export { useUserSettings as useSettings } from "@/hooks/useUserSettings"

// Placeholder provider for backward compatibility
export function SettingsProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
