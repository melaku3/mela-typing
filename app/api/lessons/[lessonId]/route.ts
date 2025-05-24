import { NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Lesson } from "@/types"
import { ObjectId } from "mongodb"

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  const resolvedParams = await Promise.resolve(params)
  
  if (!resolvedParams?.lessonId) {
    return NextResponse.json({ error: "Lesson ID is required" }, { status: 400 })
  }

  try {
    const lessonId = resolvedParams.lessonId
    const db = await getDatabase()
    const lessonsCollection = db.collection<Lesson>("lessons")

    const lesson = await lessonsCollection.findOne({
      _id: new ObjectId(lessonId),
    } as any)

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 })
    }

    return NextResponse.json(lesson)
  } catch (error) {
    console.error("Error fetching lesson:", error)
    return NextResponse.json({ error: "Failed to fetch lesson" }, { status: 500 })
  }
}
