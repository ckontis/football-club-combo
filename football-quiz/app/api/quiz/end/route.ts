import { NextResponse } from "next/server"
import { sessions, updateUserStats } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 })
    }

    const session = sessions.get(sessionId)
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    // End session
    session.isActive = false
    session.endedAt = new Date().toISOString()
    sessions.set(sessionId, session)

    // Update user stats if user is logged in
    if (session.userId && session.username) {
      updateUserStats(session.userId, session.username, session)
    }

    return NextResponse.json({
      session: {
        id: session.id,
        correctAnswers: session.correctAnswers,
        totalAttempts: session.totalAttempts,
        isActive: session.isActive,
        endedAt: session.endedAt,
      },
      message: "Session ended successfully",
    })
  } catch (error) {
    console.error("End session error:", error)
    return NextResponse.json({ error: "Failed to end session" }, { status: 500 })
  }
}
