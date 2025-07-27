import { NextResponse } from "next/server"
import { authenticateUser } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 })
    }

    // Authenticate user with simple session token
    const result = authenticateUser(username, password)

    if (!result) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    // Return user data with session token (no cookies)
    return NextResponse.json({
      user: { id: result.id, username: result.username },
      sessionToken: result.sessionToken,
      message: "Login successful!",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
