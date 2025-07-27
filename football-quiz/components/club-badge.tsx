interface ClubBadgeProps {
  clubName: string
  size?: "sm" | "md" | "lg"
}

export function ClubBadge({ clubName, size = "md" }: ClubBadgeProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  // Get realistic club colors based on actual club colors
  const getClubColor = (name: string) => {
    const clubColors: { [key: string]: string } = {
      // Premier League
      "Manchester United": "bg-red-600",
      "Manchester City": "bg-sky-500",
      Liverpool: "bg-red-700",
      Arsenal: "bg-red-500",
      Chelsea: "bg-blue-600",
      Tottenham: "bg-blue-900",
      "Newcastle United": "bg-black",
      Brighton: "bg-blue-400",
      "Aston Villa": "bg-purple-700",
      "West Ham United": "bg-red-800",
      "Crystal Palace": "bg-blue-500",
      Fulham: "bg-black",
      Brentford: "bg-red-500",
      Wolverhampton: "bg-orange-500",
      Everton: "bg-blue-700",
      "Leicester City": "bg-blue-600",
      Southampton: "bg-red-600",

      // La Liga
      "Real Madrid": "bg-white border-4 border-purple-600 text-purple-600",
      Barcelona: "bg-blue-700",
      "Atletico Madrid": "bg-red-600",
      Valencia: "bg-orange-500",
      Sevilla: "bg-red-500",

      // Serie A
      Juventus: "bg-black",
      "AC Milan": "bg-red-600",
      "Inter Milan": "bg-blue-600",
      "AS Roma": "bg-red-700",
      Napoli: "bg-blue-500",
      Lazio: "bg-sky-400",
      Fiorentina: "bg-purple-600",
      Atalanta: "bg-blue-600",

      // Bundesliga
      "Bayern Munich": "bg-red-600",
      "Borussia Dortmund": "bg-yellow-400 text-black",
      "RB Leipzig": "bg-red-500",
      "Bayer Leverkusen": "bg-red-500",
      "Schalke 04": "bg-blue-600",

      // Ligue 1
      "Paris Saint-Germain": "bg-blue-800",
      "AS Monaco": "bg-red-600",
      Lyon: "bg-blue-600",
      Marseille: "bg-blue-400",
      Lille: "bg-red-600",

      // Other European clubs
      Ajax: "bg-red-600",
      "PSV Eindhoven": "bg-red-600",
      Benfica: "bg-red-600",
      Porto: "bg-blue-600",
      "Sporting CP": "bg-green-600",
      Celtic: "bg-green-600",
      Rangers: "bg-blue-600",
      Galatasaray: "bg-yellow-500",
    }

    return clubColors[name] || "bg-gray-600"
  }

  const colorClass = getClubColor(clubName)
  const isWhite = colorClass.includes("bg-white")

  return (
    <div
      className={`${sizeClasses[size]} ${colorClass} rounded-full flex items-center justify-center shadow-lg ${
        isWhite ? "" : "border-4 border-white"
      }`}
    >
      <div className={`font-bold text-center text-xs px-2 ${isWhite ? "text-purple-600" : "text-white"}`}>
        {clubName
          .split(" ")
          .map((word) => word.charAt(0))
          .join("")
          .slice(0, 3)}
      </div>
    </div>
  )
}
