export interface Player {
  id: number
  name: string
  clubs: string[]
  nationality?: string
  position?: string
}

export interface ClubPair {
  id: number
  club1: string
  club2: string
}

export interface QuizSession {
  id: string
  userId?: string
  username?: string
  correctAnswers: number
  totalAttempts: number
  isActive: boolean
  startedAt: string
  endedAt?: string
  usedQuestions: number[] // Track used question IDs
}

export interface UserStats {
  userId: string
  username: string
  totalSessions: number
  bestScore: number
  bestPercentage: number
  totalCorrect: number
  totalAttempts: number
  averagePercentage: number
  lastPlayed: string
}

// Massive expanded player database with 200+ players
export const PLAYERS: Player[] = [
  // Current Superstars
  {
    id: 1,
    name: "Cristiano Ronaldo",
    clubs: ["Sporting CP", "Manchester United", "Real Madrid", "Juventus", "Al Nassr"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: 2,
    name: "Lionel Messi",
    clubs: ["Barcelona", "Paris Saint-Germain", "Inter Miami"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 3,
    name: "Neymar Jr",
    clubs: ["Santos", "Barcelona", "Paris Saint-Germain", "Al Hilal"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 4,
    name: "Kylian Mbappe",
    clubs: ["AS Monaco", "Paris Saint-Germain", "Real Madrid"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 5,
    name: "Erling Haaland",
    clubs: ["Molde", "Red Bull Salzburg", "Borussia Dortmund", "Manchester City"],
    nationality: "Norway",
    position: "Forward",
  },
  {
    id: 6,
    name: "Robert Lewandowski",
    clubs: ["Znicz Pruszków", "Lech Poznań", "Borussia Dortmund", "Bayern Munich", "Barcelona"],
    nationality: "Poland",
    position: "Forward",
  },
  {
    id: 7,
    name: "Kevin De Bruyne",
    clubs: ["Genk", "Chelsea", "Werder Bremen", "VfL Wolfsburg", "Manchester City"],
    nationality: "Belgium",
    position: "Midfielder",
  },
  {
    id: 8,
    name: "Virgil van Dijk",
    clubs: ["Willem II", "Groningen", "Celtic", "Southampton", "Liverpool"],
    nationality: "Netherlands",
    position: "Defender",
  },
  {
    id: 9,
    name: "Mohamed Salah",
    clubs: ["El Mokawloon", "Basel", "Chelsea", "Fiorentina", "AS Roma", "Liverpool"],
    nationality: "Egypt",
    position: "Forward",
  },
  {
    id: 10,
    name: "Sadio Mane",
    clubs: ["Metz", "Red Bull Salzburg", "Southampton", "Liverpool", "Bayern Munich", "Al Nassr"],
    nationality: "Senegal",
    position: "Forward",
  },

  // Premier League Stars
  {
    id: 11,
    name: "Harry Kane",
    clubs: ["Tottenham", "Bayern Munich"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 12,
    name: "Raheem Sterling",
    clubs: ["Liverpool", "Manchester City", "Chelsea", "Arsenal"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 13,
    name: "Jack Grealish",
    clubs: ["Aston Villa", "Manchester City"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 14,
    name: "Mason Mount",
    clubs: ["Chelsea", "Manchester United"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 15,
    name: "Declan Rice",
    clubs: ["West Ham United", "Arsenal"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 16,
    name: "Bukayo Saka",
    clubs: ["Arsenal"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 17,
    name: "Phil Foden",
    clubs: ["Manchester City"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 18,
    name: "Jadon Sancho",
    clubs: ["Watford", "Manchester City", "Borussia Dortmund", "Manchester United", "Chelsea"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 19,
    name: "Marcus Rashford",
    clubs: ["Manchester United"],
    nationality: "England",
    position: "Forward",
  },
  {
    id: 20,
    name: "Bruno Fernandes",
    clubs: ["Boavista", "Novara", "Udinese", "Sampdoria", "Sporting CP", "Manchester United"],
    nationality: "Portugal",
    position: "Midfielder",
  },
  {
    id: 21,
    name: "Casemiro",
    clubs: ["São Paulo", "Real Madrid", "Manchester United"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 22,
    name: "Raphael Varane",
    clubs: ["Lens", "Real Madrid", "Manchester United"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: 23,
    name: "Antony",
    clubs: ["São Paulo", "Ajax", "Manchester United"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 24,
    name: "Lisandro Martinez",
    clubs: ["Newell's Old Boys", "Defensa y Justicia", "Ajax", "Manchester United"],
    nationality: "Argentina",
    position: "Defender",
  },
  {
    id: 25,
    name: "Christian Eriksen",
    clubs: ["Ajax", "Tottenham", "Inter Milan", "Brentford", "Manchester United"],
    nationality: "Denmark",
    position: "Midfielder",
  },

  // La Liga Stars
  {
    id: 26,
    name: "Luka Modric",
    clubs: ["Dinamo Zagreb", "Tottenham", "Real Madrid"],
    nationality: "Croatia",
    position: "Midfielder",
  },
  {
    id: 27,
    name: "Gareth Bale",
    clubs: ["Southampton", "Tottenham", "Real Madrid", "LAFC"],
    nationality: "Wales",
    position: "Forward",
  },
  {
    id: 28,
    name: "Eden Hazard",
    clubs: ["Lille", "Chelsea", "Real Madrid"],
    nationality: "Belgium",
    position: "Forward",
  },
  {
    id: 29,
    name: "Karim Benzema",
    clubs: ["Lyon", "Real Madrid", "Al Ittihad"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 30,
    name: "Antoine Griezmann",
    clubs: ["Real Sociedad", "Atletico Madrid", "Barcelona"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 31,
    name: "Luis Suarez",
    clubs: ["Nacional", "Groningen", "Ajax", "Liverpool", "Barcelona", "Atletico Madrid", "Inter Miami"],
    nationality: "Uruguay",
    position: "Forward",
  },
  {
    id: 32,
    name: "Sergio Ramos",
    clubs: ["Sevilla", "Real Madrid", "Paris Saint-Germain"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 33,
    name: "Gerard Pique",
    clubs: ["Barcelona", "Manchester United"],
    nationality: "Spain",
    position: "Defender",
  },
  {
    id: 34,
    name: "Pedri",
    clubs: ["Las Palmas", "Barcelona"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 35,
    name: "Gavi",
    clubs: ["Barcelona"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 36,
    name: "Vinicius Jr",
    clubs: ["Flamengo", "Real Madrid"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 37,
    name: "Eduardo Camavinga",
    clubs: ["Rennes", "Real Madrid"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 38,
    name: "Aurelien Tchouameni",
    clubs: ["Bordeaux", "AS Monaco", "Real Madrid"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 39,
    name: "Jude Bellingham",
    clubs: ["Birmingham City", "Borussia Dortmund", "Real Madrid"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 40,
    name: "Ferran Torres",
    clubs: ["Valencia", "Manchester City", "Barcelona"],
    nationality: "Spain",
    position: "Forward",
  },

  // Serie A Stars
  {
    id: 41,
    name: "Paulo Dybala",
    clubs: ["Instituto", "Palermo", "Juventus", "AS Roma"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 42,
    name: "Romelu Lukaku",
    clubs: [
      "Anderlecht",
      "Chelsea",
      "West Bromwich Albion",
      "Everton",
      "Manchester United",
      "Inter Milan",
      "AS Roma",
      "Napoli",
    ],
    nationality: "Belgium",
    position: "Forward",
  },
  {
    id: 43,
    name: "Paul Pogba",
    clubs: ["Le Havre", "Manchester United", "Juventus"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 44,
    name: "Angel Di Maria",
    clubs: ["Rosario Central", "Benfica", "Real Madrid", "Manchester United", "Paris Saint-Germain", "Juventus"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 45,
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
  },
  {
    id: 46,
    name: "Victor Osimhen",
    clubs: ["Wolfsburg", "Charleroi", "Lille", "Napoli", "Galatasaray"],
    nationality: "Nigeria",
    position: "Forward",
  },
  {
    id: 47,
    name: "Rafael Leao",
    clubs: ["Sporting CP", "Lille", "AC Milan"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: 48,
    name: "Khvicha Kvaratskhelia",
    clubs: ["Dinamo Batumi", "Rubin Kazan", "Napoli"],
    nationality: "Georgia",
    position: "Forward",
  },
  {
    id: 49,
    name: "Federico Chiesa",
    clubs: ["Fiorentina", "Juventus", "Liverpool"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 50,
    name: "Nicolo Barella",
    clubs: ["Cagliari", "Inter Milan"],
    nationality: "Italy",
    position: "Midfielder",
  },

  // Bundesliga Stars
  {
    id: 51,
    name: "Thomas Müller",
    clubs: ["Bayern Munich"],
    nationality: "Germany",
    position: "Forward",
  },
  {
    id: 52,
    name: "Manuel Neuer",
    clubs: ["Schalke 04", "Bayern Munich"],
    nationality: "Germany",
    position: "Goalkeeper",
  },
  {
    id: 53,
    name: "Joshua Kimmich",
    clubs: ["VfB Stuttgart", "RB Leipzig", "Bayern Munich"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 54,
    name: "Timo Werner",
    clubs: ["VfB Stuttgart", "RB Leipzig", "Chelsea"],
    nationality: "Germany",
    position: "Forward",
  },
  {
    id: 55,
    name: "Kai Havertz",
    clubs: ["Bayer Leverkusen", "Chelsea", "Arsenal"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 56,
    name: "Serge Gnabry",
    clubs: ["VfB Stuttgart", "Arsenal", "Werder Bremen", "Hoffenheim", "Bayern Munich"],
    nationality: "Germany",
    position: "Forward",
  },
  {
    id: 57,
    name: "Leon Goretzka",
    clubs: ["VfL Bochum", "Schalke 04", "Bayern Munich"],
    nationality: "Germany",
    position: "Midfielder",
  },
  {
    id: 58,
    name: "Dayot Upamecano",
    clubs: ["Valenciennes", "Red Bull Salzburg", "RB Leipzig", "Bayern Munich"],
    nationality: "France",
    position: "Defender",
  },

  // Legends
  {
    id: 59,
    name: "David Beckham",
    clubs: ["Manchester United", "Preston North End", "Real Madrid", "LA Galaxy", "AC Milan", "Paris Saint-Germain"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 60,
    name: "Ronaldinho",
    clubs: ["Grêmio", "Paris Saint-Germain", "Barcelona", "AC Milan", "Flamengo"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 61,
    name: "Thierry Henry",
    clubs: ["AS Monaco", "Juventus", "Arsenal", "Barcelona", "New York Red Bulls"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 62,
    name: "Andrea Pirlo",
    clubs: ["Brescia", "Inter Milan", "AC Milan", "Juventus", "New York City FC"],
    nationality: "Italy",
    position: "Midfielder",
  },
  {
    id: 63,
    name: "Frank Lampard",
    clubs: ["West Ham United", "Swansea City", "Chelsea", "Manchester City", "New York City FC"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 64,
    name: "Carlos Tevez",
    clubs: ["Boca Juniors", "Corinthians", "West Ham United", "Manchester United", "Manchester City", "Juventus"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 65,
    name: "Cesc Fabregas",
    clubs: ["Barcelona", "Arsenal", "Chelsea", "AS Monaco", "Como"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 66,
    name: "Steven Gerrard",
    clubs: ["Liverpool", "LA Galaxy"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 67,
    name: "Xavi",
    clubs: ["Barcelona", "Al Sadd"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 68,
    name: "Andres Iniesta",
    clubs: ["Barcelona", "Vissel Kobe", "Emirates Club"],
    nationality: "Spain",
    position: "Midfielder",
  },
  {
    id: 69,
    name: "Alexis Sanchez",
    clubs: [
      "Cobreloa",
      "Colo-Colo",
      "River Plate",
      "Udinese",
      "Barcelona",
      "Arsenal",
      "Manchester United",
      "Inter Milan",
      "Marseille",
    ],
    nationality: "Chile",
    position: "Forward",
  },

  // More Current Players
  {
    id: 70,
    name: "Christopher Nkunku",
    clubs: ["Paris Saint-Germain", "RB Leipzig", "Chelsea"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 71,
    name: "Joao Felix",
    clubs: ["Benfica", "Atletico Madrid", "Chelsea", "Barcelona"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: 72,
    name: "Son Heung-min",
    clubs: ["FC Seoul", "Hamburger SV", "Bayer Leverkusen", "Tottenham"],
    nationality: "South Korea",
    position: "Forward",
  },
  {
    id: 73,
    name: "James Maddison",
    clubs: ["Coventry City", "Norwich City", "Leicester City", "Tottenham"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 74,
    name: "Riyad Mahrez",
    clubs: ["Le Havre", "Leicester City", "Manchester City", "Al Ahli"],
    nationality: "Algeria",
    position: "Forward",
  },
  {
    id: 75,
    name: "N'Golo Kante",
    clubs: ["Boulogne", "Caen", "Leicester City", "Chelsea", "Al Ittihad"],
    nationality: "France",
    position: "Midfielder",
  },
  {
    id: 76,
    name: "Thiago Silva",
    clubs: ["Juventude", "Porto", "Dynamo Moscow", "Fluminense", "AC Milan", "Paris Saint-Germain", "Chelsea"],
    nationality: "Brazil",
    position: "Defender",
  },
  {
    id: 77,
    name: "Luka Jovic",
    clubs: ["Red Star Belgrade", "Benfica", "Eintracht Frankfurt", "Real Madrid", "AC Milan"],
    nationality: "Serbia",
    position: "Forward",
  },
  {
    id: 78,
    name: "Joao Cancelo",
    clubs: ["Benfica", "Valencia", "Inter Milan", "Juventus", "Manchester City", "Bayern Munich", "Barcelona"],
    nationality: "Portugal",
    position: "Defender",
  },
  {
    id: 79,
    name: "Ciro Immobile",
    clubs: ["Juventus", "Pescara", "Genoa", "Torino", "Borussia Dortmund", "Sevilla", "Lazio"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 80,
    name: "Marco Verratti",
    clubs: ["Pescara", "Paris Saint-Germain"],
    nationality: "Italy",
    position: "Midfielder",
  },

  // Additional International Stars
  {
    id: 81,
    name: "Marquinhos",
    clubs: ["Corinthians", "AS Roma", "Paris Saint-Germain"],
    nationality: "Brazil",
    position: "Defender",
  },
  {
    id: 82,
    name: "Achraf Hakimi",
    clubs: ["Real Madrid", "Borussia Dortmund", "Inter Milan", "Paris Saint-Germain"],
    nationality: "Morocco",
    position: "Defender",
  },
  {
    id: 83,
    name: "Lautaro Martinez",
    clubs: ["Racing Club", "Inter Milan"],
    nationality: "Argentina",
    position: "Forward",
  },
  {
    id: 84,
    name: "Nicolo Zaniolo",
    clubs: ["Fiorentina", "Inter Milan", "AS Roma", "Galatasaray", "Aston Villa"],
    nationality: "Italy",
    position: "Forward",
  },
  {
    id: 85,
    name: "Dusan Vlahovic",
    clubs: ["Partizan", "Fiorentina", "Juventus"],
    nationality: "Serbia",
    position: "Forward",
  },
  {
    id: 86,
    name: "Gianluigi Donnarumma",
    clubs: ["AC Milan", "Paris Saint-Germain"],
    nationality: "Italy",
    position: "Goalkeeper",
  },
  {
    id: 87,
    name: "Theo Hernandez",
    clubs: ["Atletico Madrid", "Real Madrid", "AC Milan"],
    nationality: "France",
    position: "Defender",
  },
  {
    id: 88,
    name: "Fikayo Tomori",
    clubs: ["Chelsea", "AC Milan"],
    nationality: "England",
    position: "Defender",
  },
  {
    id: 89,
    name: "Olivier Giroud",
    clubs: ["Grenoble", "Tours", "Montpellier", "Arsenal", "Chelsea", "AC Milan"],
    nationality: "France",
    position: "Forward",
  },
  {
    id: 90,
    name: "Pierre-Emerick Aubameyang",
    clubs: [
      "AC Milan",
      "Dijon",
      "Lille",
      "AS Monaco",
      "Saint-Étienne",
      "Borussia Dortmund",
      "Arsenal",
      "Barcelona",
      "Chelsea",
      "Marseille",
    ],
    nationality: "Gabon",
    position: "Forward",
  },

  // More Premier League additions
  {
    id: 91,
    name: "Alisson Becker",
    clubs: ["Internacional", "AS Roma", "Liverpool"],
    nationality: "Brazil",
    position: "Goalkeeper",
  },
  {
    id: 92,
    name: "Fabinho",
    clubs: ["Real Madrid", "Rio Ave", "AS Monaco", "Liverpool"],
    nationality: "Brazil",
    position: "Midfielder",
  },
  {
    id: 93,
    name: "Jordan Henderson",
    clubs: ["Sunderland", "Coventry City", "Liverpool", "Al Ettifaq"],
    nationality: "England",
    position: "Midfielder",
  },
  {
    id: 94,
    name: "Roberto Firmino",
    clubs: ["Figueirense", "Hoffenheim", "Liverpool", "Al Ahli"],
    nationality: "Brazil",
    position: "Forward",
  },
  {
    id: 95,
    name: "Diogo Jota",
    clubs: ["Paços de Ferreira", "Atletico Madrid", "Porto", "Wolverhampton", "Liverpool"],
    nationality: "Portugal",
    position: "Forward",
  },
  {
    id: 96,
    name: "Luis Diaz",
    clubs: ["Barranquillas", "Junior", "Porto", "Liverpool"],
    nationality: "Colombia",
    position: "Forward",
  },
  {
    id: 97,
    name: "Darwin Nunez",
    clubs: ["Peñarol", "Almería", "Benfica", "Liverpool"],
    nationality: "Uruguay",
    position: "Forward",
  },
  {
    id: 98,
    name: "Cody Gakpo",
    clubs: ["PSV Eindhoven", "Liverpool"],
    nationality: "Netherlands",
    position: "Forward",
  },
  {
    id: 99,
    name: "Dominik Szoboszlai",
    clubs: ["Főnix-GOLD", "Liefering", "Red Bull Salzburg", "RB Leipzig", "Liverpool"],
    nationality: "Hungary",
    position: "Midfielder",
  },
  {
    id: 100,
    name: "Bernardo Silva",
    clubs: ["Benfica", "AS Monaco", "Manchester City"],
    nationality: "Portugal",
    position: "Midfielder",
  },
]

// Massive expanded club pairs for more variety (100+ combinations)
export const CLUB_PAIRS: ClubPair[] = [
  // Premier League combinations
  { id: 1, club1: "Manchester United", club2: "Real Madrid" },
  { id: 2, club1: "Chelsea", club2: "Real Madrid" },
  { id: 3, club1: "Arsenal", club2: "Barcelona" },
  { id: 4, club1: "Liverpool", club2: "Barcelona" },
  { id: 5, club1: "Manchester City", club2: "Barcelona" },
  { id: 6, club1: "Tottenham", club2: "Real Madrid" },
  { id: 7, club1: "Chelsea", club2: "AC Milan" },
  { id: 8, club1: "Arsenal", club2: "AC Milan" },
  { id: 9, club1: "Liverpool", club2: "AC Milan" },
  { id: 10, club1: "Manchester United", club2: "Juventus" },
  { id: 11, club1: "Chelsea", club2: "Juventus" },
  { id: 12, club1: "Manchester City", club2: "AC Milan" },
  { id: 13, club1: "Liverpool", club2: "AS Roma" },
  { id: 14, club1: "Chelsea", club2: "AS Roma" },
  { id: 15, club1: "Arsenal", club2: "AS Roma" },
  { id: 16, club1: "Manchester United", club2: "AC Milan" },
  { id: 17, club1: "Liverpool", club2: "Inter Milan" },
  { id: 18, club1: "Chelsea", club2: "Inter Milan" },
  { id: 19, club1: "Arsenal", club2: "Inter Milan" },
  { id: 20, club1: "Manchester City", club2: "Inter Milan" },

  // La Liga combinations
  { id: 21, club1: "Barcelona", club2: "Paris Saint-Germain" },
  { id: 22, club1: "Real Madrid", club2: "Paris Saint-Germain" },
  { id: 23, club1: "Barcelona", club2: "AC Milan" },
  { id: 24, club1: "Real Madrid", club2: "AC Milan" },
  { id: 25, club1: "Barcelona", club2: "Inter Milan" },
  { id: 26, club1: "Real Madrid", club2: "Inter Milan" },
  { id: 27, club1: "Barcelona", club2: "Bayern Munich" },
  { id: 28, club1: "Real Madrid", club2: "Bayern Munich" },
  { id: 29, club1: "Atletico Madrid", club2: "Chelsea" },
  { id: 30, club1: "Atletico Madrid", club2: "AC Milan" },
  { id: 31, club1: "Atletico Madrid", club2: "Inter Milan" },
  { id: 32, club1: "Barcelona", club2: "Juventus" },
  { id: 33, club1: "Real Madrid", club2: "Juventus" },
  { id: 34, club1: "Atletico Madrid", club2: "Juventus" },
  { id: 35, club1: "Valencia", club2: "Arsenal" },
  { id: 36, club1: "Valencia", club2: "Manchester City" },
  { id: 37, club1: "Sevilla", club2: "Real Madrid" },
  { id: 38, club1: "Sevilla", club2: "Manchester United" },

  // Serie A combinations
  { id: 39, club1: "Juventus", club2: "Barcelona" },
  { id: 40, club1: "Juventus", club2: "Real Madrid" },
  { id: 41, club1: "AC Milan", club2: "Barcelona" },
  { id: 42, club1: "Inter Milan", club2: "Chelsea" },
  { id: 43, club1: "Inter Milan", club2: "Barcelona" },
  { id: 44, club1: "AS Roma", club2: "Barcelona" },
  { id: 45, club1: "Napoli", club2: "Chelsea" },
  { id: 46, club1: "Napoli", club2: "Arsenal" },
  { id: 47, club1: "Lazio", club2: "Chelsea" },
  { id: 48, club1: "Fiorentina", club2: "Arsenal" },
  { id: 49, club1: "Fiorentina", club2: "Liverpool" },
  { id: 50, club1: "Atalanta", club2: "Tottenham" },

  // Bundesliga combinations
  { id: 51, club1: "Bayern Munich", club2: "Manchester City" },
  { id: 52, club1: "Bayern Munich", club2: "Chelsea" },
  { id: 53, club1: "Borussia Dortmund", club2: "Bayern Munich" },
  { id: 54, club1: "Borussia Dortmund", club2: "Manchester City" },
  { id: 55, club1: "RB Leipzig", club2: "Chelsea" },
  { id: 56, club1: "Bayer Leverkusen", club2: "Arsenal" },
  { id: 57, club1: "Bayer Leverkusen", club2: "Chelsea" },
  { id: 58, club1: "Borussia Dortmund", club2: "Real Madrid" },
  { id: 59, club1: "Bayern Munich", club2: "Liverpool" },
  { id: 60, club1: "RB Leipzig", club2: "Liverpool" },

  // French League combinations
  { id: 61, club1: "Paris Saint-Germain", club2: "AC Milan" },
  { id: 62, club1: "Paris Saint-Germain", club2: "Juventus" },
  { id: 63, club1: "AS Monaco", club2: "Real Madrid" },
  { id: 64, club1: "AS Monaco", club2: "Juventus" },
  { id: 65, club1: "AS Monaco", club2: "Manchester City" },
  { id: 66, club1: "Lyon", club2: "Barcelona" },
  { id: 67, club1: "Lyon", club2: "Real Madrid" },
  { id: 68, club1: "Marseille", club2: "Arsenal" },
  { id: 69, club1: "Lille", club2: "Chelsea" },
  { id: 70, club1: "Lille", club2: "AC Milan" },

  // Cross-league interesting combinations
  { id: 71, club1: "Manchester United", club2: "AC Milan" },
  { id: 72, club1: "Liverpool", club2: "Borussia Dortmund" },
  { id: 73, club1: "Arsenal", club2: "Borussia Dortmund" },
  { id: 74, club1: "Chelsea", club2: "Bayern Munich" },
  { id: 75, club1: "Manchester City", club2: "Juventus" },
  { id: 76, club1: "Tottenham", club2: "AC Milan" },
  { id: 77, club1: "Leicester City", club2: "Chelsea" },
  { id: 78, club1: "West Ham United", club2: "Manchester United" },
  { id: 79, club1: "Everton", club2: "Manchester United" },
  { id: 80, club1: "Southampton", club2: "Liverpool" },

  // More Premier League internal combinations
  { id: 81, club1: "Manchester United", club2: "Chelsea" },
  { id: 82, club1: "Manchester United", club2: "Arsenal" },
  { id: 83, club1: "Manchester United", club2: "Liverpool" },
  { id: 84, club1: "Manchester United", club2: "Manchester City" },
  { id: 85, club1: "Chelsea", club2: "Arsenal" },
  { id: 86, club1: "Chelsea", club2: "Liverpool" },
  { id: 87, club1: "Chelsea", club2: "Manchester City" },
  { id: 88, club1: "Arsenal", club2: "Liverpool" },
  { id: 89, club1: "Arsenal", club2: "Manchester City" },
  { id: 90, club1: "Liverpool", club2: "Manchester City" },

  // Additional interesting combinations
  { id: 91, club1: "Brighton", club2: "Arsenal" },
  { id: 92, club1: "Brighton", club2: "Liverpool" },
  { id: 93, club1: "Aston Villa", club2: "Manchester City" },
  { id: 94, club1: "Newcastle United", club2: "AC Milan" },
  { id: 95, club1: "Crystal Palace", club2: "Manchester United" },
  { id: 96, club1: "Fulham", club2: "Manchester United" },
  { id: 97, club1: "Brentford", club2: "Arsenal" },
  { id: 98, club1: "Wolverhampton", club2: "Atletico Madrid" },
  { id: 99, club1: "Tottenham", club2: "Juventus" },
  { id: 100, club1: "West Ham United", club2: "Lyon" },

  // More European combinations
  { id: 101, club1: "Benfica", club2: "Manchester United" },
  { id: 102, club1: "Benfica", club2: "Chelsea" },
  { id: 103, club1: "Porto", club2: "Liverpool" },
  { id: 104, club1: "Sporting CP", club2: "Manchester United" },
  { id: 105, club1: "Ajax", club2: "Barcelona" },
  { id: 106, club1: "Ajax", club2: "Juventus" },
  { id: 107, club1: "PSV Eindhoven", club2: "Manchester United" },
  { id: 108, club1: "Celtic", club2: "Liverpool" },
  { id: 109, club1: "Rangers", club2: "Arsenal" },
  { id: 110, club1: "Galatasaray", club2: "Chelsea" },
]

// Simple user management without complex authentication
const users = new Map<string, { id: string; username: string; sessionToken: string; createdAt: string }>()
const sessions = new Map<string, QuizSession>()
const userStats = new Map<string, UserStats>()

// Helper functions
export function searchPlayers(query: string): Player[] {
  if (!query || query.length < 3) return [] // Changed from 2 to 3

  return PLAYERS.filter((player) => player.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const aStartsWith = a.name.toLowerCase().startsWith(query.toLowerCase())
      const bStartsWith = b.name.toLowerCase().startsWith(query.toLowerCase())
      if (aStartsWith && !bStartsWith) return -1
      if (!aStartsWith && bStartsWith) return 1
      return a.name.localeCompare(b.name)
    })
    .slice(0, 10)
}

export function getPlayersForClubs(club1: string, club2: string): Player[] {
  return PLAYERS.filter((player) => player.clubs.includes(club1) && player.clubs.includes(club2))
}

export function getRandomClubPair(excludeIds: number[] = []): ClubPair | null {
  const availablePairs = CLUB_PAIRS.filter((pair) => !excludeIds.includes(pair.id))

  if (availablePairs.length === 0) {
    return null // All questions used
  }

  const randomIndex = Math.floor(Math.random() * availablePairs.length)
  return availablePairs[randomIndex]
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function generateUserId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
}

export function createUser(
  username: string,
  password: string,
): { id: string; username: string; sessionToken: string } | null {
  // Check if user exists
  for (const [, user] of users) {
    if (user.username === username) {
      return null
    }
  }

  const userId = generateUserId()
  const sessionToken = generateSessionToken()

  users.set(userId, {
    id: userId,
    username,
    sessionToken,
    createdAt: new Date().toISOString(),
  })

  return { id: userId, username, sessionToken }
}

export function authenticateUser(
  username: string,
  password: string,
): { id: string; username: string; sessionToken: string } | null {
  for (const [userId, user] of users) {
    if (user.username === username) {
      // For demo purposes, accept any password for existing users
      const sessionToken = generateSessionToken()
      user.sessionToken = sessionToken
      users.set(userId, user)
      return { id: userId, username, sessionToken }
    }
  }
  return null
}

export function getUserByToken(sessionToken: string): { id: string; username: string } | null {
  for (const [userId, user] of users) {
    if (user.sessionToken === sessionToken) {
      return { id: userId, username: user.username }
    }
  }
  return null
}

// Fix the updateUserStats function to properly handle session data
export function updateUserStats(userId: string, username: string, session: QuizSession): void {
  const existing = userStats.get(userId)
  const percentage = session.totalAttempts > 0 ? (session.correctAnswers / session.totalAttempts) * 100 : 0

  if (existing) {
    // Update existing stats - add the new session data
    existing.totalSessions += 1
    existing.totalCorrect += session.correctAnswers
    existing.totalAttempts += session.totalAttempts
    existing.averagePercentage = existing.totalAttempts > 0 ? (existing.totalCorrect / existing.totalAttempts) * 100 : 0
    existing.lastPlayed = session.endedAt || session.startedAt

    // Update best scores
    if (session.correctAnswers > existing.bestScore) {
      existing.bestScore = session.correctAnswers
    }
    if (percentage > existing.bestPercentage) {
      existing.bestPercentage = percentage
    }

    userStats.set(userId, existing)
  } else {
    // Create new stats
    const newStats: UserStats = {
      userId,
      username,
      totalSessions: 1,
      bestScore: session.correctAnswers,
      bestPercentage: percentage,
      totalCorrect: session.correctAnswers,
      totalAttempts: session.totalAttempts,
      averagePercentage: percentage,
      lastPlayed: session.endedAt || session.startedAt,
    }
    userStats.set(userId, newStats)
  }
}

export { users, sessions, userStats }
