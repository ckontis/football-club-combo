import { NextResponse } from "next/server"
import { sessions, getPlayersForClubs } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const { sessionId, club1, club2, userAnswer } = await request.json()

    if (!sessionId || !club1 || !club2 || !userAnswer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const session = sessions.get(sessionId)
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    // Get correct players
    const correctPlayers = getPlayersForClubs(club1, club2)

    // Check if answer is correct
    const normalizedAnswer = userAnswer.toLowerCase().replace(/[^a-z0-9]/g, "")
    const isCorrect = correctPlayers.some(
      (player) => player.name.toLowerCase().replace(/[^a-z0-9]/g, "") === normalizedAnswer,
    )

    // Update session stats
    session.totalAttempts += 1
    if (isCorrect) {
      session.correctAnswers += 1
    }

    // Save updated session
    sessions.set(sessionId, session)

    return NextResponse.json({
      isCorrect,
      correctPlayers: correctPlayers.map((p) => p.name),
      userAnswer,
    })
  } catch (error) {
    console.error("Submit answer error:", error)
    return NextResponse.json({ error: "Failed to submit answer" }, { status: 500 })
  }
}
