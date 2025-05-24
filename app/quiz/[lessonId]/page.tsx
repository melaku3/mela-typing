"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, ArrowRight } from "lucide-react"
import type { Quiz } from "@/types"

interface QuizPageProps {
  params: {
    lessonId: string
  }
}

// Sample quiz data
const sampleQuiz: Quiz = {
  _id: "quiz1",
  lessonId: "lesson1",
  questions: [
    {
      question: "When did the Kingdom of Aksum flourish?",
      choices: ["50-500 CE", "100-960 CE", "200-800 CE", "300-1000 CE"],
      answer: 1,
    },
    {
      question: "What made Aksum wealthy and influential?",
      choices: ["Gold mining", "Agricultural exports", "Trade routes control", "Military conquests"],
      answer: 2,
    },
    {
      question: "Which empires did Aksum trade with?",
      choices: ["Roman and Indian", "Persian and Chinese", "Byzantine and Arab", "Egyptian and Nubian"],
      answer: 0,
    },
  ],
}

export default function QuizPage({ params }: QuizPageProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  // In a real app, this would fetch from the API
  const quiz = sampleQuiz
  const questions = quiz.questions

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].answer ? 1 : 0)
    }, 0)
  }

  const handleFinish = () => {
    router.push("/dashboard")
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Quiz Complete! 🎉</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-primary">{percentage}%</div>
                <p className="text-xl text-muted-foreground">
                  You got {score} out of {questions.length} questions correct
                </p>
                <Badge
                  variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
                  className="text-lg px-4 py-2"
                >
                  {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : "Keep Learning!"}
                </Badge>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Review:</h3>
                {questions.map((question, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      {selectedAnswers[index] === question.answer ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{question.question}</p>
                        <p className="text-sm text-green-600 mt-1">Correct: {question.choices[question.answer]}</p>
                        {selectedAnswers[index] !== question.answer && (
                          <p className="text-sm text-red-600">
                            Your answer: {question.choices[selectedAnswers[index]]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleFinish} className="w-full" size="lg">
                Continue to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle>Knowledge Check</CardTitle>
              <Badge variant="outline">
                {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold">{question.question}</h2>

              <div className="space-y-3">
                {question.choices.map((choice, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left border rounded-lg transition-colors ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      />
                      <span>{choice}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="w-full"
              size="lg"
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
