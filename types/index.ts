export interface User {
  _id: string
  email: string
  name: string
  image?: string
  googleId: string
  preferences: {
    language: "english" | "amharic"
    audioEnabled: boolean
  }
  createdAt: Date
}

export interface Lesson {
  _id?: string
  title: string
  content: string[]
  language: "english" | "amharic"
  tags: string[]
  difficulty: "beginner" | "intermediate" | "advanced"
  audioUrl: string
  createdAt: Date
}

export interface Progress {
  _id: string
  userId: string
  lessonId: string
  wpm: number
  accuracy: number
  completedAt: Date
}

export interface Quiz {
  _id: string
  lessonId: string
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  question: string
  choices: string[]
  answer: number
}

export interface QuizResult {
  _id: string
  userId: string
  quizId: string
  correctCount: number
  totalQuestions: number
  completedAt: Date
}

export interface TypingStats {
  currentWpm: number
  accuracy: number
  currentWordIndex: number
  mistakes: number
  isComplete: boolean
}
