"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { UserService } from "@/lib/services/UserSetting"
import type { UserSession } from "@/lib/services/UserSetting"

export type UseUserSessionReturn = {
  session: UserSession | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<any>
  invalidateSession: () => void
  clearSession: () => void
  isAuthenticated: boolean
}

export function useUserSession(): UseUserSessionReturn {
  const queryClient = useQueryClient()

  const {
    data: session,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: queryKeys.user.session(),
    queryFn: UserService.getSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (error instanceof Error && error.message.includes("401")) {
        return false
      }
      return failureCount < 2
    },
  })

  const invalidateSession = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.user.session() })
  }

  const clearSession = () => {
    queryClient.setQueryData(queryKeys.user.session(), null)
    queryClient.removeQueries({ queryKey: queryKeys.user.all })
  }

  return {
    session: session ?? null,
    isLoading,
    error: error as Error | null,
    refetch,
    invalidateSession,
    clearSession,
    isAuthenticated: !!session?.user,
  }
}
