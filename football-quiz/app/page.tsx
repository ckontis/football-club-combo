"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuizGame } from "@/components/quiz-game"
import { Leaderboard } from "@/components/leaderboard"
import { AuthForm } from "@/components/auth-form"
import { Trophy, Play, LogOut, User, Sparkles, Target, Users } from "lucide-react"

interface AppUser {
  id: number
  username: string
}

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [user, setUser] = useState<AppUser | null>(null)
  const [sessionToken, setSessionToken] = useState<string | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const storedToken = localStorage.getItem("fc_session_token")
      if (storedToken) {
        const response = await fetch("/api/auth/me", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionToken: storedToken }),
        })
        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            setUser(data.user)
            setSessionToken(storedToken)
          } else {
            localStorage.removeItem("fc_session_token")
          }
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
      localStorage.removeItem("fc_session_token")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      setSessionToken(null)
      setGameStarted(false)
      localStorage.removeItem("fc_session_token")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  // Add a small delay and refresh leaderboard when game ends
  const handleGameEnd = (score: number, totalQuestions: number) => {
    setGameStarted(false)
    setShowLeaderboard(true)

    // Small delay to ensure stats are updated before showing leaderboard
    setTimeout(() => {
      // Force a re-render of the leaderboard component
      window.location.hash = "leaderboard"
    }, 100)
  }

  const startGame = () => {
    setGameStarted(true)
    setShowLeaderboard(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-yellow-800" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Football Club Combo
            </h1>
            <p className="text-gray-600 mt-2">Test your football knowledge!</p>
          </div>
          <AuthForm
            onAuthSuccess={(user, token) => {
              setUser(user)
              setSessionToken(token)
              setShowAuth(false)
              localStorage.setItem("fc_session_token", token)
            }}
          />
          <div className="text-center mt-6">
            <Button variant="ghost" onClick={() => setShowAuth(false)} className="text-gray-600 hover:text-gray-800">
              Continue as Guest
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-4">
        <div className="container mx-auto py-8">
          <QuizGame onGameEnd={handleGameEnd} user={user} sessionToken={sessionToken} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
            {user && (
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Welcome back!</p>
                  <p className="text-sm text-gray-600">{user.username}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="ml-2 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Football Club Combo
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Test your football knowledge! Guess the players who played for both clubs in our exciting quiz game.
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue={showLeaderboard ? "leaderboard" : "play"} className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm shadow-lg border border-white/20">
            <TabsTrigger
              value="play"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Play className="w-4 h-4" />
              Play Game
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="play" className="mt-6">
            <Card className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl border border-white/20">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Ready to Play?
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                  You'll be shown two football club badges and need to guess a player who has played for both teams.
                  Play as long as you want and end your session anytime!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!user && (
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-blue-800 mb-2">Want to track your scores?</p>
                        <p className="text-blue-700 mb-4">
                          Create an account to save your progress and compete on the leaderboard with players worldwide!
                        </p>
                        <Button
                          onClick={() => setShowAuth(true)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
                        >
                          Login / Register
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={startGame}
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  size="lg"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Start Quiz Adventure
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard />
          </TabsContent>
        </Tabs>

        {/* How to Play Section */}
        <div className="mt-16 text-center">
          <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl border border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
                <Target className="w-6 h-6 text-emerald-600" />
                How to Play
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">View Club Badges</h3>
                    <p className="text-gray-600">You'll see two football club badges displayed side by side</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Type Player Name</h3>
                    <p className="text-gray-600">
                      Start typing a player name - suggestions will appear after 3 letters
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Submit Answer</h3>
                    <p className="text-gray-600">
                      Select a player from suggestions or press Enter to submit your answer
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Continue or Stop</h3>
                    <p className="text-gray-600">
                      After each answer, choose to continue with more questions or end your session
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200/50">
                <p className="text-center text-gray-700">
                  <strong className="text-yellow-700">Pro Tip:</strong> Multiple players can be correct for each
                  question - there's often more than one right answer!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
