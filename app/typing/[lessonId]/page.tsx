import { Suspense } from "react"
import TypingPageClient from "./client"

interface TypingPageProps {
  params: {
    lessonId: string
  }
}

export default function TypingPage({ params }: TypingPageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <TypingPageClient lessonId={params.lessonId} />
    </Suspense>
  )
}
