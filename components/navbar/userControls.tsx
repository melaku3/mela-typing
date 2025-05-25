"use client"

import { motion, AnimatePresence } from "framer-motion"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, BarChart3, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, Suspense } from "react"
import { useUserSession } from "@/hooks/useUserSession"
import { useLanguageQuery } from "@/hooks/useLanguageQuery"

function UserControlsContent() {
  const { session, isLoading, clearSession } = useUserSession()
  const { t } = useLanguageQuery()
  const [isOpen, setIsOpen] = useState(false)

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"
      />
    )
  }

  if (!session?.user) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
        <Link href="/auth">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg"
              size="sm"
            >
              {t.signIn}
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    )
  }

  const userInitials =
    session.user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U"

  const handleSignOut = async () => {
    clearSession()
    await signOut({ callbackUrl: "/" })
    setIsOpen(false)
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-1 gap-2 group">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Avatar className="w-8 h-8 ring-2 ring-transparent group-hover:ring-amber-500/50 transition-all duration-200">
                <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-sm font-semibold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:block"
            >
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </motion.div>
          </Button>
        </DropdownMenuTrigger>

        <AnimatePresence>
          {isOpen && (
            <DropdownMenuContent align="end" className="w-56 p-1" asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {/* User Info */}
                <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700">
                  <p className="font-medium text-sm truncate">{session.user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{session.user.email}</p>
                </div>

                {/* Menu Items */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="py-1"
                >
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-3 cursor-pointer">
                      <BarChart3 className="w-4 h-4" />
                      <span>{t.dashboard}</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-3 cursor-pointer">
                      <User className="w-4 h-4" />
                      <span>{t.profile}</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-3 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      <span>{t.settings}</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex items-center gap-3 cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.signOut}</span>
                  </DropdownMenuItem>
                </motion.div>
              </motion.div>
            </DropdownMenuContent>
          )}
        </AnimatePresence>
      </DropdownMenu>
    </motion.div>
  )
}

function UserControlsFallback() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"
    />
  )
}

export function UserControls() {
  return (
    <Suspense fallback={<UserControlsFallback />}>
      <UserControlsContent />
    </Suspense>
  )
}
