"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { UserService, defaultSettings } from "@/lib/services/userService"
import type { UserSettings } from "@/lib/services/userService"
import { useUserSession } from "./useUserSession"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export function useUserSettings() {
  const { isAuthenticated } = useUserSession()
  const queryClient = useQueryClient()
  const { setTheme } = useTheme()

  const {
    data: settings = defaultSettings,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.user.settings(),
    queryFn: UserService.getUserSettings,
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: defaultSettings,
  })

  const updateSettingsMutation = useMutation({
    mutationFn: UserService.updateUserSettings,
    onMutate: async (newSettings) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.user.settings() })

      // Snapshot previous value
      const previousSettings = queryClient.getQueryData(queryKeys.user.settings())

      // Optimistically update
      queryClient.setQueryData(queryKeys.user.settings(), (old: UserSettings) => ({
        ...old,
        ...newSettings,
      }))

      return { previousSettings }
    },
    onError: (err, newSettings, context) => {
      // Rollback on error
      if (context?.previousSettings) {
        queryClient.setQueryData(queryKeys.user.settings(), context.previousSettings)
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: queryKeys.user.settings() })
    },
  })

  // Sync theme with next-themes
  useEffect(() => {
    if (settings.appearance) {
      setTheme(settings.appearance)
    }
  }, [settings.appearance, setTheme])

  return {
    settings,
    isLoading,
    error,
    updateSettings: (settings: Partial<UserSettings>) => updateSettingsMutation.mutate(settings),
    isUpdating: updateSettingsMutation.isPending,
    updateError: updateSettingsMutation.error,
  }
}
