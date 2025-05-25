import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const progressCollection = db.collection("progress")
    const quizResultsCollection = db.collection("quizResults")

    // Find user ID from email
    const usersCollection = db.collection("users")
    const user = await usersCollection.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Delete all progress and quiz results for this user
    await Promise.all([
      progressCollection.deleteMany({ userId: user._id.toString() }),
      quizResultsCollection.deleteMany({ userId: user._id.toString() }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error resetting user progress:", error)
    return NextResponse.json({ error: "Failed to reset progress" }, { status: 500 })
  }
}
