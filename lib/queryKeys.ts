export const queryKeys = {
  user: {
    all: ["user"] as const,
    session: () => [...queryKeys.user.all, "session"] as const,
    settings: () => [...queryKeys.user.all, "settings"] as const,
    profile: () => [...queryKeys.user.all, "profile"] as const,
  },
  language: {
    all: ["language"] as const,
    current: () => [...queryKeys.language.all, "current"] as const,
  },
  lessons: {
    all: ["lessons"] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.lessons.all, "list", filters] as const,
    detail: (id: string) => [...queryKeys.lessons.all, "detail", id] as const,
  },
  progress: {
    all: ["progress"] as const,
    user: (userId: string) => [...queryKeys.progress.all, "user", userId] as const,
  },
} as const

export type QueryKeys = typeof queryKeys
