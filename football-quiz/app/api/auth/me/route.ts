import { NextResponse } from "next/server"
import { getUserByToken } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const { sessionToken } = await request.json()

    if (!sessionToken) {
      return NextResponse.json({ user: null })
    }

    const user = getUserByToken(sessionToken)
    return NextResponse.json({ user })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ user: null })
  }
}
