import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Progress } from "@/types"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, lessonId, wpm, accuracy } = body

    if (!userId || !lessonId || typeof wpm !== "number" || typeof accuracy !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    const db = await getDatabase()
    const progressCollection = db.collection<Progress>("progress")

    const progressData: Omit<Progress, "_id"> = {
      userId,
      lessonId,
      wpm,
      accuracy,
      completedAt: new Date(),
    }

    const result = await progressCollection.insertOne(progressData)

    return NextResponse.json({
      _id: result.insertedId,
      ...progressData,
    })
  } catch (error) {
    console.error("Error saving progress:", error)
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 })
  }
}
