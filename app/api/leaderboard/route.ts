import { NextResponse } from "next/server"
import { userStats } from "@/lib/data"

// Simplify leaderboard to use the userStats directly without complex session processing
export async function GET() {
  try {
    // Get user stats sorted by total correct answers (not percentage)
    const leaderboard = Array.from(userStats.values())
      .filter((stats) => stats.totalAttempts > 0) // Only show users who have attempted questions
      .sort((a, b) => {
        // Primary sort: total correct answers (highest first)
        if (a.totalCorrect !== b.totalCorrect) {
          return b.totalCorrect - a.totalCorrect
        }
        // Secondary sort: average percentage (highest first)
        if (a.averagePercentage !== b.averagePercentage) {
          return b.averagePercentage - a.averagePercentage
        }
        // Tertiary sort: fewer total attempts (more efficient)
        return a.totalAttempts - b.totalAttempts
      })
      .slice(0, 50) // Show top 50 players
      .map((stats, index) => ({
        id: stats.userId,
        user_id: stats.userId,
        username: stats.username,
        correct_answers: stats.totalCorrect,
        total_attempts: stats.totalAttempts,
        average_percentage: Math.round(stats.averagePercentage),
        best_score: stats.bestScore,
        best_percentage: Math.round(stats.bestPercentage),
        total_sessions: stats.totalSessions,
        last_played: stats.lastPlayed,
        rank: index + 1,
        is_active: false,
        started_at: stats.lastPlayed,
        ended_at: stats.lastPlayed,
      }))

    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error("Leaderboard API error:", error)
    return NextResponse.json({ error: "Failed to get leaderboard" }, { status: 500 })
  }
}
