import { NextResponse } from "next/server"
import { getRandomClubPair, getPlayersForClubs, sessions } from "@/lib/data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")

    let usedQuestions: number[] = []

    // Get used questions from session if available
    if (sessionId) {
      const session = sessions.get(sessionId)
      if (session) {
        usedQuestions = session.usedQuestions || []
      }
    }

    const clubPair = getRandomClubPair(usedQuestions)

    if (!clubPair) {
      return NextResponse.json(
        {
          error: "No more questions available",
          allQuestionsUsed: true,
        },
        { status: 404 },
      )
    }

    const correctPlayers = getPlayersForClubs(clubPair.club1, clubPair.club2)

    // If no players found for this pair, try a few more times
    if (correctPlayers.length === 0) {
      for (let i = 0; i < 5; i++) {
        const newClubPair = getRandomClubPair(usedQuestions)
        if (!newClubPair) break

        const newCorrectPlayers = getPlayersForClubs(newClubPair.club1, newClubPair.club2)
        if (newCorrectPlayers.length > 0) {
          // Update session with used question
          if (sessionId) {
            const session = sessions.get(sessionId)
            if (session) {
              session.usedQuestions.push(newClubPair.id)
              sessions.set(sessionId, session)
            }
          }

          return NextResponse.json({
            clubs: [newClubPair.club1, newClubPair.club2],
            hasAnswers: true,
            questionId: newClubPair.id,
          })
        }
      }
    }

    // Update session with used question
    if (sessionId) {
      const session = sessions.get(sessionId)
      if (session) {
        session.usedQuestions.push(clubPair.id)
        sessions.set(sessionId, session)
      }
    }

    return NextResponse.json({
      clubs: [clubPair.club1, clubPair.club2],
      hasAnswers: correctPlayers.length > 0,
      questionId: clubPair.id,
    })
  } catch (error) {
    console.error("Quiz API error:", error)
    return NextResponse.json({ error: "Failed to generate question" }, { status: 500 })
  }
}
