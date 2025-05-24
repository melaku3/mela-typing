import { NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Progress } from "@/types"

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const resolvedParams = await Promise.resolve(params)
  
  if (!resolvedParams?.userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    const userId = resolvedParams.userId
    const db = await getDatabase()
    const progressCollection = db.collection<Progress>("progress")

    const progress = await progressCollection.find({ userId }).sort({ completedAt: -1 }).toArray()

    return NextResponse.json(progress)
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}
