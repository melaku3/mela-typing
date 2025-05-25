import type { Session } from "next-auth"

export interface UserSettings {
  language: "en" | "am"
  audio: {
    background: boolean
    mistakeSound: boolean
  }
  appearance: "light" | "dark" | "system"
}

export interface UserProfile {
  id: string
  name: string
  email: string
  image?: string
  settings: UserSettings
  createdAt: string
  updatedAt: string
}

export const defaultSettings: UserSettings = {
  language: "en",
  audio: {
    background: true,
    mistakeSound: true,
  },
  appearance: "system",
}

export class UserService {
  static async getSession(): Promise<Session | null> {
    try {
      const response = await fetch("/api/auth/session")
      if (!response.ok) return null
      return response.json()
    } catch (error) {
      console.error("Failed to fetch session:", error)
      return null
    }
  }

  static async getUserSettings(): Promise<UserSettings> {
    try {
      const response = await fetch("/api/user/settings")
      if (!response.ok) {
        return defaultSettings
      }
      const settings = await response.json()
      return { ...defaultSettings, ...settings }
    } catch (error) {
      console.error("Failed to fetch user settings:", error)
      return defaultSettings
    }
  }

  static async updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    const response = await fetch("/api/user/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })

    if (!response.ok) {
      throw new Error("Failed to update settings")
    }

    return response.json()
  }

  static async getUserProfile(): Promise<UserProfile | null> {
    try {
      const response = await fetch("/api/user/profile")
      if (!response.ok) return null
      return response.json()
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
      return null
    }
  }
}
