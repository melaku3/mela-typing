"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguageQuery } from "@/hooks/useLanguageQuery"
import { useState, Suspense } from "react"
import type { Language } from "@/lib/i18n"

const languages = [
  { code: "en" as Language, label: "English", flag: "🇺🇸", native: "English" },
  { code: "am" as Language, label: "Amharic", flag: "🇪🇹", native: "አማርኛ" },
] as const

function LanguageToggleContent() {
  const { language, setLanguage, t } = useLanguageQuery()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-9 px-3 gap-2 group">
            <Globe className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </motion.div>

            {/* Hover Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-indigo-500/10 rounded-md"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </Button>
        </DropdownMenuTrigger>

        <AnimatePresence>
          {isOpen && (
            <DropdownMenuContent align="end" className="w-48 p-1" asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {languages.map((lang, index) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="cursor-pointer"
                    asChild
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{lang.label}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{lang.native}</div>
                      </div>
                      {language === lang.code && (
                        <motion.div
                          layoutId="selectedLanguage"
                          className="w-2 h-2 bg-amber-500 rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </DropdownMenuItem>
                ))}
              </motion.div>
            </DropdownMenuContent>
          )}
        </AnimatePresence>
      </DropdownMenu>
    </motion.div>
  )
}

function LanguageToggleFallback() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
      <Button variant="ghost" size="sm" className="h-9 px-3 gap-2" disabled>
        <Globe className="w-4 h-4 text-slate-400" />
        <div className="w-6 h-4 bg-slate-300 dark:bg-slate-600 rounded animate-pulse" />
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </Button>
    </motion.div>
  )
}

export function LanguageToggle() {
  return (
    <Suspense fallback={<LanguageToggleFallback />}>
      <LanguageToggleContent />
    </Suspense>
  )
}
