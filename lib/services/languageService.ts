import type { Language } from "@/lib/i18n"

export class LanguageService {
  private static readonly STORAGE_KEY = "mela-typing-language"

  static async getLanguage(): Promise<Language> {
    // In a real app, this could fetch from user preferences API
    // For now, we'll use a simple in-memory store with fallback
    try {
      const stored = sessionStorage.getItem(this.STORAGE_KEY)
      return (stored as Language) || "en"
    } catch {
      return "en"
    }
  }

  static async setLanguage(language: Language): Promise<Language> {
    try {
      sessionStorage.setItem(this.STORAGE_KEY, language)
      return language
    } catch {
      return language
    }
  }

  static async toggleLanguage(): Promise<Language> {
    const current = await this.getLanguage()
    const newLanguage: Language = current === "en" ? "am" : "en"
    return this.setLanguage(newLanguage)
  }
}
