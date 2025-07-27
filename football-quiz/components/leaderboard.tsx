"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, User, Target, Calendar, BarChart3, Crown, Users } from "lucide-react"

interface LeaderboardEntry {
  id: string
  username: string
  correct_answers: number
  total_attempts: number
  average_percentage: number
  best_score: number
  best_percentage: number
  total_sessions: number
  last_played: string
  rank: number
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard")
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data)
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Crown className="w-4 h-4 text-white" />
          </div>
        )
      case 2:
        return (
          <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center shadow-lg">
            <Medal className="w-4 h-4 text-white" />
          </div>
        )
      case 3:
        return (
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
            <Award className="w-4 h-4 text-white" />
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-sm font-bold text-white">{rank}</span>
          </div>
        )
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border border-white/20">
        <CardContent className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading leaderboard...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border border-white/20">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Player Leaderboard
        </CardTitle>
        <CardDescription className="text-center text-lg text-gray-600">
          Top players ranked by total correct answers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {leaderboard.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-xl text-gray-500 mb-2">No players yet</p>
            <p className="text-gray-400">Be the first to play and claim the top spot!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((entry, index) => {
              const isTopThree = entry.rank <= 3

              return (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-6 rounded-xl border transition-all duration-200 hover:shadow-lg ${
                    isTopThree
                      ? "bg-gradient-to-r from-yellow-50 via-white to-yellow-50 border-yellow-200 shadow-md"
                      : "bg-white/50 border-gray-200 hover:bg-white/80"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    {getRankIcon(entry.rank)}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-bold text-lg text-gray-800">{entry.username}</p>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            <span>
                              {entry.correct_answers}/{entry.total_attempts} total
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-3 h-3" />
                            <span>{entry.total_sessions} sessions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(entry.last_played)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex gap-2">
                      <Badge
                        variant={isTopThree ? "default" : "secondary"}
                        className={isTopThree ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white" : ""}
                      >
                        {entry.correct_answers} correct
                      </Badge>
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        {entry.average_percentage}% avg
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">
                      Best streak: <span className="font-medium text-gray-700">{entry.best_score} correct</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
