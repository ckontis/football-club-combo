import { neon } from "@neondatabase/serverless"

// Only initialize if DATABASE_URL exists
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

export interface Player {
  id: number
  name: string
  clubs: string[]
  nationality?: string
  position?: string
  birth_year?: number
  created_at: string
}

export interface QuizSession {
  id: number
  user_id: number | null
  correct_answers: number
  total_attempts: number
  is_active: boolean
  started_at: string
  ended_at: string | null
  username?: string
}

export interface QuizQuestion {
  clubs: [string, string]
  correctPlayers: Player[]
}

export interface ClubPair {
  id: number
  club1: string
  club2: string
  is_active: boolean
}

// Fallback club pairs
const FALLBACK_CLUB_PAIRS = [
  { id: 1, club1: "Manchester United", club2: "Real Madrid", is_active: true },
  { id: 2, club1: "Barcelona", club2: "Paris Saint-Germain", is_active: true },
  { id: 3, club1: "Chelsea", club2: "Real Madrid", is_active: true },
  { id: 4, club1: "Liverpool", club2: "Barcelona", is_active: true },
  { id: 5, club1: "Manchester City", club2: "Barcelona", is_active: true },
  { id: 6, club1: "Arsenal", club2: "Barcelona", is_active: true },
  { id: 7, club1: "Tottenham", club2: "Real Madrid", is_active: true },
  { id: 8, club1: "Juventus", club2: "Barcelona", is_active: true },
  { id: 9, club1: "AC Milan", club2: "Barcelona", is_active: true },
  { id: 10, club1: "Inter Milan", club2: "Chelsea", is_active: true },
  { id: 11, club1: "Bayern Munich", club2: "Manchester City", is_active: true },
  { id: 12, club1: "Borussia Dortmund", club2: "Bayern Munich", is_active: true },
  { id: 13, club1: "Manchester United", club2: "Juventus", is_active: true },
  { id: 14, club1: "Liverpool", club2: "AC Milan", is_active: true },
  { id: 15, club1: "Chelsea", club2: "AC Milan", is_active: true },
]

// Expanded fallback players
const FALLBACK_PLAYERS = [
  {
    id: 1,
    name: "Cristiano Ronaldo",
    clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"],
    nationality: "Portugal",
    position: "Forward",
    birth_year: 1985,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Lionel Messi",
    clubs: ["Barcelona", "Paris Saint-Germain", "Inter Miami"],
    nationality: "Argentina",
    position: "Forward",
    birth_year: 1987,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Neymar Jr",
    clubs: ["Santos", "Barcelona", "Paris Saint-Germain", "Al Hilal"],
    nationality: "Brazil",
    position: "Forward",
    birth_year: 1992,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Kylian Mbappe",
    clubs: ["AS Monaco", "Paris Saint-Germain", "Real Madrid"],
    nationality: "France",
    position: "Forward",
    birth_year: 1998,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "David Beckham",
    clubs: ["Manchester United", "Preston North End", "Real Madrid", "LA Galaxy", "AC Milan", "Paris Saint-Germain"],
    nationality: "England",
    position: "Midfielder",
    birth_year: 1975,
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Ronaldinho",
    clubs: ["Grêmio", "Paris Saint-Germain", "Barcelona", "AC Milan", "Flamengo"],
    nationality: "Brazil",
    position: "Forward",
    birth_year: 1980,
    created_at: new Date().toISOString(),
  },
  {
    id: 7,
    name: "Thierry Henry",
    clubs: ["AS Monaco", "Juventus", "Arsenal", "Barcelona", "New York Red Bulls"],
    nationality: "France",
    position: "Forward",
    birth_year: 1977,
    created_at: new Date().toISOString(),
  },
  {
    id: 8,
    name: "Eden Hazard",
    clubs: ["Lille", "Chelsea", "Real Madrid"],
    nationality: "Belgium",
    position: "Forward",
    birth_year: 1991,
    created_at: new Date().toISOString(),
  },
  {
    id: 9,
    name: "Gareth Bale",
    clubs: ["Southampton", "Tottenham", "Real Madrid", "LAFC"],
    nationality: "Wales",
    position: "Forward",
    birth_year: 1989,
    created_at: new Date().toISOString(),
  },
  {
    id: 10,
    name: "Luka Modric",
    clubs: ["Dinamo Zagreb", "Tottenham", "Real Madrid"],
    nationality: "Croatia",
    position: "Midfielder",
    birth_year: 1985,
    created_at: new Date().toISOString(),
  },
  {
    id: 11,
    name: "Andrea Pirlo",
    clubs: ["Brescia", "Inter Milan", "AC Milan", "Juventus", "New York City FC"],
    nationality: "Italy",
    position: "Midfielder",
    birth_year: 1979,
    created_at: new Date().toISOString(),
  },
  {
    id: 12,
    name: "Frank Lampard",
    clubs: ["West Ham United", "Swansea City", "Chelsea", "Manchester City", "New York City FC"],
    nationality: "England",
    position: "Midfielder",
    birth_year: 1978,
    created_at: new Date().toISOString(),
  },
  {
    id: 13,
    name: "Carlos Tevez",
    clubs: ["Boca Juniors", "Corinthians", "West Ham United", "Manchester United", "Manchester City", "Juventus"],
    nationality: "Argentina",
    position: "Forward",
    birth_year: 1984,
    created_at: new Date().toISOString(),
  },
  {
    id: 14,
    name: "Cesc Fabregas",
    clubs: ["Barcelona", "Arsenal", "Chelsea", "AS Monaco", "Como"],
    nationality: "Spain",
    position: "Midfielder",
    birth_year: 1987,
    created_at: new Date().toISOString(),
  },
  {
    id: 15,
    name: "Zlatan Ibrahimovic",
    clubs: [
      "Malmö FF",
      "Ajax",
      "Juventus",
      "Inter Milan",
      "Barcelona",
      "AC Milan",
      "Paris Saint-Germain",
      "Manchester United",
    ],
    nationality: "Sweden",
    position: "Forward",
    birth_year: 1981,
    created_at: new Date().toISOString(),
  },
  {
    id: 16,
    name: "Angel Di Maria",
    clubs: ["Rosario Central", "Benfica", "Real Madrid", "Manchester United", "Paris Saint-Germain", "Juventus"],
    nationality: "Argentina",
    position: "Forward",
    birth_year: 1988,
    created_at: new Date().toISOString(),
  },
  {
    id: 17,
    name: "Paul Pogba",
    clubs: ["Le Havre", "Manchester United", "Juventus"],
    nationality: "France",
    position: "Midfielder",
    birth_year: 1993,
    created_at: new Date().toISOString(),
  },
  {
    id: 18,
    name: "Romelu Lukaku",
    clubs: ["Anderlecht", "Chelsea", "West Bromwich Albion", "Everton", "Manchester United", "Inter Milan"],
    nationality: "Belgium",
    position: "Forward",
    birth_year: 1993,
    created_at: new Date().toISOString(),
  },
  {
    id: 19,
    name: "Robert Lewandowski",
    clubs: ["Znicz Pruszków", "Lech Poznań", "Borussia Dortmund", "Bayern Munich", "Barcelona"],
    nationality: "Poland",
    position: "Forward",
    birth_year: 1988,
    created_at: new Date().toISOString(),
  },
  {
    id: 20,
    name: "Erling Haaland",
    clubs: ["Molde", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City"],
    nationality: "Norway",
    position: "Forward",
    birth_year: 2000,
    created_at: new Date().toISOString(),
  },
]

// In-memory session storage for fallback mode
const fallbackSessions: Map<number, QuizSession> = new Map()
let nextSessionId = 1

// Search players with autocomplete
export async function searchPlayers(query: string, limit = 10): Promise<Player[]> {
  if (!query || query.length < 2) return []

  // Always use fallback data if no DATABASE_URL
  if (!sql) {
    return FALLBACK_PLAYERS.filter((player) => player.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        const aStartsWith = a.name.toLowerCase().startsWith(query.toLowerCase())
        const bStartsWith = b.name.toLowerCase().startsWith(query.toLowerCase())
        if (aStartsWith && !bStartsWith) return -1
        if (!aStartsWith && bStartsWith) return 1
        return a.name.localeCompare(b.name)
      })
      .slice(0, limit)
  }

  try {
    // Try database query
    const players = await sql`
      SELECT * FROM players 
      WHERE LOWER(name) LIKE LOWER(${`%${query}%`})
      ORDER BY 
        CASE 
          WHEN LOWER(name) LIKE LOWER(${`${query}%`}) THEN 1
          ELSE 2
        END,
        name
      LIMIT ${limit}
    `

    return players as Player[]
  } catch (error) {
    console.error("Error searching players:", error)
    // Fallback to hardcoded data
    return FALLBACK_PLAYERS.filter((player) => player.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        const aStartsWith = a.name.toLowerCase().startsWith(query.toLowerCase())
        const bStartsWith = b.name.toLowerCase().startsWith(query.toLowerCase())
        if (aStartsWith && !bStartsWith) return -1
        if (!aStartsWith && bStartsWith) return 1
        return a.name.localeCompare(b.name)
      })
      .slice(0, limit)
  }
}

// Get all players who played for both clubs
export async function getPlayersForClubs(club1: string, club2: string): Promise<Player[]> {
  // Always use fallback data if no DATABASE_URL
  if (!sql) {
    return FALLBACK_PLAYERS.filter((player) => player.clubs.includes(club1) && player.clubs.includes(club2))
  }

  try {
    const players = await sql`
      SELECT * FROM players 
      WHERE clubs @> ARRAY[${club1}] AND clubs @> ARRAY[${club2}]
      ORDER BY name
    `

    return players as Player[]
  } catch (error) {
    console.error("Error fetching players for clubs:", error)
    // Fallback to hardcoded data
    return FALLBACK_PLAYERS.filter((player) => player.clubs.includes(club1) && player.clubs.includes(club2))
  }
}

// Get random club pair for quiz
export async function getRandomClubPair(): Promise<ClubPair | null> {
  const randomIndex = Math.floor(Math.random() * FALLBACK_CLUB_PAIRS.length)
  return FALLBACK_CLUB_PAIRS[randomIndex]
}

// Generate quiz question with all correct answers
export async function generateQuizQuestion(): Promise<QuizQuestion | null> {
  try {
    const clubPair = await getRandomClubPair()
    if (!clubPair) return null

    const correctPlayers = await getPlayersForClubs(clubPair.club1, clubPair.club2)

    // Only return questions that have at least one correct answer
    if (correctPlayers.length === 0) {
      // Try again with a different pair (max 5 attempts to avoid infinite loop)
      for (let i = 0; i < 5; i++) {
        const newClubPair = await getRandomClubPair()
        if (!newClubPair) continue

        const newCorrectPlayers = await getPlayersForClubs(newClubPair.club1, newClubPair.club2)
        if (newCorrectPlayers.length > 0) {
          return {
            clubs: [newClubPair.club1, newClubPair.club2],
            correctPlayers: newCorrectPlayers,
          }
        }
      }
      return null
    }

    return {
      clubs: [clubPair.club1, clubPair.club2],
      correctPlayers,
    }
  } catch (error) {
    console.error("Error generating quiz question:", error)
    return null
  }
}

// Create new quiz session
export async function createQuizSession(userId: number | null): Promise<number | null> {
  const sessionId = nextSessionId++
  const session: QuizSession = {
    id: sessionId,
    user_id: userId,
    correct_answers: 0,
    total_attempts: 0,
    is_active: true,
    started_at: new Date().toISOString(),
    ended_at: null,
  }
  fallbackSessions.set(sessionId, session)
  return sessionId
}

// Submit quiz answer
export async function submitQuizAnswer(
  sessionId: number,
  club1: string,
  club2: string,
  userAnswer: string,
  correctPlayers: Player[],
): Promise<boolean> {
  // Check if answer is correct
  const normalizedAnswer = userAnswer.toLowerCase().replace(/[^a-z0-9]/g, "")
  const isCorrect = correctPlayers.some(
    (player) => player.name.toLowerCase().replace(/[^a-z0-9]/g, "") === normalizedAnswer,
  )

  // Update fallback session
  const session = fallbackSessions.get(sessionId)
  if (session) {
    session.total_attempts += 1
    if (isCorrect) {
      session.correct_answers += 1
    }
    fallbackSessions.set(sessionId, session)
  }

  return isCorrect
}

// End quiz session
export async function endQuizSession(sessionId: number): Promise<QuizSession | null> {
  const session = fallbackSessions.get(sessionId)
  if (session) {
    session.is_active = false
    session.ended_at = new Date().toISOString()
    fallbackSessions.set(sessionId, session)
    return session
  }
  return null
}

// Get leaderboard
export async function getLeaderboard(limit = 20): Promise<QuizSession[]> {
  // Return fallback sessions sorted by performance
  const sessions = Array.from(fallbackSessions.values())
    .filter((s) => s.total_attempts > 0 && !s.is_active)
    .sort((a, b) => {
      const aPercentage = a.total_attempts > 0 ? a.correct_answers / a.total_attempts : 0
      const bPercentage = b.total_attempts > 0 ? b.correct_answers / b.total_attempts : 0

      if (aPercentage !== bPercentage) return bPercentage - aPercentage
      if (a.correct_answers !== b.correct_answers) return b.correct_answers - a.correct_answers
      return a.total_attempts - b.total_attempts
    })
    .slice(0, limit)

  return sessions
}

// Get user's quiz history
export async function getUserQuizHistory(userId: number, limit = 10): Promise<QuizSession[]> {
  const sessions = Array.from(fallbackSessions.values())
    .filter((s) => s.user_id === userId && !s.is_active)
    .sort((a, b) => new Date(b.ended_at || "").getTime() - new Date(a.ended_at || "").getTime())
    .slice(0, limit)

  return sessions
}
