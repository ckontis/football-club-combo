"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ClubBadge } from "./club-badge"
import { PlayerSearch } from "./player-search"
import { CheckCircle, XCircle, Trophy, RotateCcw, StopCircle, ArrowRight, Sparkles, Target } from "lucide-react"

interface QuizGameProps {
  onGameEnd: (score: number, totalQuestions: number) => void
  user: { id: number; username: string } | null
  sessionToken?: string
}

interface QuizQuestion {
  clubs: [string, string]
  hasAnswers: boolean
  questionId: number
}

interface AnswerResult {
  isCorrect: boolean
  correctPlayers: string[]
  userAnswer: string
}

export function QuizGame({ onGameEnd, user, sessionToken }: QuizGameProps) {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null)
  const [score, setScore] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [feedback, setFeedback] = useState<AnswerResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [questionKey, setQuestionKey] = useState(0)

  // Initialize session and fetch first question
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = async () => {
    try {
      // Create session
      const sessionResponse = await fetch("/api/quiz/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken }),
      })
      if (sessionResponse.ok) {
        const { sessionId: newSessionId } = await sessionResponse.json()
        setSessionId(newSessionId)

        // Fetch first question
        await fetchQuestion(newSessionId)
      }
    } catch (error) {
      console.error("Error initializing game:", error)
    }
  }

  const fetchQuestion = async (currentSessionId?: string) => {
    setIsLoading(true)
    try {
      const sessionIdToUse = currentSessionId || sessionId
      const url = sessionIdToUse ? `/api/quiz?sessionId=${sessionIdToUse}` : "/api/quiz"
      const response = await fetch(url)

      if (response.ok) {
        const question = await response.json()

        if (question.allQuestionsUsed) {
          // All questions have been used, end the game
          setGameEnded(true)
          onGameEnd(score, totalAttempts)
          return
        }

        setCurrentQuestion(question)
        setFeedback(null)
        setQuestionKey((prev) => prev + 1)
      } else {
        throw new Error("Failed to fetch question")
      }
    } catch (error) {
      console.error("Error fetching question:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayerSelect = async (playerName: string) => {
    if (!sessionId || !currentQuestion || feedback) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/quiz/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          club1: currentQuestion.clubs[0],
          club2: currentQuestion.clubs[1],
          userAnswer: playerName,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setFeedback(result)

        // Update local state to match server
        setTotalAttempts((prev) => prev + 1)
        if (result.isCorrect) {
          setScore((prev) => prev + 1)
        }
      } else {
        throw new Error("Failed to submit answer")
      }
    } catch (error) {
      console.error("Error submitting answer:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const continueGame = () => {
    fetchQuestion()
  }

  const endGame = async () => {
    if (!sessionId) return

    try {
      const response = await fetch("/api/quiz/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Game ended successfully:", data.session)
      }

      setGameEnded(true)
      onGameEnd(score, totalAttempts)
    } catch (error) {
      console.error("Error ending game:", error)
      setGameEnded(true)
      onGameEnd(score, totalAttempts)
    }
  }

  const resetGame = () => {
    setScore(0)
    setTotalAttempts(0)
    setFeedback(null)
    setGameEnded(false)
    setSessionId(null)
    setQuestionKey(0)
    initializeGame()
  }

  if (gameEnded) {
    const percentage = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0

    return (
      <Card className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border border-white/20">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Game Complete!
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            {user ? `Excellent work, ${user.username}!` : "Great job!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
              <div className="text-3xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-green-700 font-medium">Correct</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
              <div className="text-3xl font-bold text-blue-600">{totalAttempts}</div>
              <div className="text-sm text-blue-700 font-medium">Total</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
              <div className="text-3xl font-bold text-purple-600">{percentage}%</div>
              <div className="text-sm text-purple-700 font-medium">Accuracy</div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
            <p className="text-gray-700">
              {user
                ? "Your score has been saved to your profile and added to the leaderboard!"
                : "Score recorded for this session"}
            </p>
          </div>

          <Button
            onClick={resetGame}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isLoading && !currentQuestion) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border border-white/20">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg font-medium text-gray-600">Loading question...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!currentQuestion) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border border-white/20">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Unable to load question. Please try again.</p>
            <Button
              onClick={() => fetchQuestion()}
              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white"
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border border-white/20">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 border-emerald-200"
            >
              <Target className="w-3 h-3 mr-1" />
              Score: {score}/{totalAttempts}
            </Badge>
            {totalAttempts > 0 && (
              <Badge variant="outline" className="px-3 py-1 border-blue-200 text-blue-700">
                {Math.round((score / totalAttempts) * 100)}% accuracy
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={endGame}
            disabled={isLoading}
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 bg-transparent"
          >
            <StopCircle className="w-4 h-4 mr-2" />
            End Game
          </Button>
        </div>
        <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Who played for both clubs?
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Type a player name who has played for both of these clubs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex justify-center items-center gap-12">
          <div className="text-center">
            <ClubBadge clubName={currentQuestion.clubs[0]} size="lg" />
            <p className="mt-3 font-semibold text-gray-800 text-lg">{currentQuestion.clubs[0]}</p>
          </div>
          <div className="text-3xl font-bold text-gray-400 bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
            &
          </div>
          <div className="text-center">
            <ClubBadge clubName={currentQuestion.clubs[1]} size="lg" />
            <p className="mt-3 font-semibold text-gray-800 text-lg">{currentQuestion.clubs[1]}</p>
          </div>
        </div>

        {feedback && (
          <Alert
            className={`${feedback.isCorrect ? "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50" : "border-red-200 bg-gradient-to-r from-red-50 to-pink-50"} shadow-lg`}
          >
            <div className="flex items-start gap-3">
              {feedback.isCorrect ? (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="flex-1">
                <AlertDescription>
                  {feedback.isCorrect ? (
                    <div className="text-green-800">
                      <div className="font-semibold mb-1">🎉 Correct!</div>
                      <div>
                        <strong>{feedback.userAnswer}</strong> has indeed played for both clubs.
                      </div>
                    </div>
                  ) : (
                    <div className="text-red-800">
                      <div className="font-semibold mb-2">❌ Incorrect!</div>
                      <div className="mb-2">
                        <strong>{feedback.userAnswer}</strong> hasn't played for both clubs.
                      </div>
                      {feedback.correctPlayers.length > 0 && (
                        <div className="p-3 bg-white/50 rounded-lg border border-red-200/50">
                          <div className="font-medium text-red-700 mb-1">Correct answers include:</div>
                          <div className="text-red-600">
                            {feedback.correctPlayers.slice(0, 3).join(", ")}
                            {feedback.correctPlayers.length > 3 && ` and ${feedback.correctPlayers.length - 3} more`}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        <div className="space-y-6">
          {!feedback && (
            <PlayerSearch
              key={questionKey}
              onPlayerSelect={handlePlayerSelect}
              disabled={isLoading}
              placeholder="Start typing a player name..."
            />
          )}

          {feedback && (
            <div className="flex gap-4 justify-center">
              <Button
                onClick={continueGame}
                className="flex-1 max-w-xs py-3 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                disabled={isLoading}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Next Question
              </Button>
              <Button
                onClick={endGame}
                variant="outline"
                className="flex-1 max-w-xs py-3 hover:bg-gray-50 border-gray-300 bg-transparent"
                disabled={isLoading}
              >
                <StopCircle className="w-4 h-4 mr-2" />
                End Game
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
