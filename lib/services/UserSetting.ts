export interface UserSettings {
  language: "en" | "am"
  appearance: "light" | "dark" | "system"
  audio: {
    background: boolean
    mistakeSound: boolean
  }
}

export interface UserSession {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export const defaultSettings: UserSettings = {
  language: "en",
  appearance: "system",
  audio: {
    background: true,
    mistakeSound: true,
  },
}

export const UserService = {
  async getSession(): Promise<UserSession | null> {
    const response = await fetch("/api/auth/session")
    if (!response.ok) throw new Error("Failed to fetch session")
    return response.json()
  },

  async getUserSettings(): Promise<UserSettings> {
    const response = await fetch("/api/user/settings")
    if (!response.ok) throw new Error("Failed to fetch user settings")
    return response.json()
  },

  async updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    const response = await fetch("/api/user/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
    if (!response.ok) throw new Error("Failed to update user settings")
    return response.json()
  },
} 