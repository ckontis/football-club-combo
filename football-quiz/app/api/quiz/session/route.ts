import { NextResponse } from "next/server"
import { sessions, getUserByToken, generateSessionId } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const { sessionToken } = await request.json()

    let userId = undefined
    let username = undefined

    if (sessionToken) {
      const user = getUserByToken(sessionToken)
      if (user) {
        userId = user.id
        username = user.username
      }
    }

    const sessionId = generateSessionId()
    const session = {
      id: sessionId,
      userId,
      username,
      correctAnswers: 0,
      totalAttempts: 0,
      isActive: true,
      startedAt: new Date().toISOString(),
      usedQuestions: [], // Track used questions
    }

    sessions.set(sessionId, session)
    return NextResponse.json({ sessionId })
  } catch (error) {
    console.error("Create session error:", error)
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
  }
}
