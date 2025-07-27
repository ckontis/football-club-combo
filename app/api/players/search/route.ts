import { NextResponse } from "next/server"
import { searchPlayers } from "@/lib/data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""

    const players = searchPlayers(query)
    return NextResponse.json(players)
  } catch (error) {
    console.error("Player search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
