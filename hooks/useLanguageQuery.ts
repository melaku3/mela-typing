"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getTranslations } from "@/lib/i18n"
import type { Language } from "@/lib/i18n"

const LANGUAGE_QUERY_KEY = ["language"] as const
const LANGUAGE_STORAGE_KEY = "mela-typing-language"

// Language service functions
const getStoredLanguage = (): Language => {
  if (typeof window === "undefined") return "en"

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return (stored as Language) || "en"
  } catch {
    return "en"
  }
}

const setStoredLanguage = (language: Language): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function useLanguageQuery() {
  const queryClient = useQueryClient()

  const { data: language = "en" } = useQuery({
    queryKey: LANGUAGE_QUERY_KEY,
    queryFn: getStoredLanguage,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const setLanguage = (newLanguage: Language) => {
    // Update React Query cache immediately
    queryClient.setQueryData(LANGUAGE_QUERY_KEY, newLanguage)

    // Persist to localStorage
    setStoredLanguage(newLanguage)
  }

  const toggleLanguage = () => {
    const newLanguage: Language = language === "en" ? "am" : "en"
    setLanguage(newLanguage)
  }

  // Get translations for current language
  const t = getTranslations(language)

  return {
    language,
    t,
    setLanguage,
    toggleLanguage,
  }
}

// Initialize language in providers
export function initializeLanguage(queryClient: any) {
  const storedLanguage = getStoredLanguage()
  queryClient.setQueryData(LANGUAGE_QUERY_KEY, storedLanguage)
}
