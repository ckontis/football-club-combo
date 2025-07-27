import { NextResponse } from "next/server"
import { createUser } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 })
    }

    if (username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Create user with simple session token
    const result = createUser(username, password)

    if (!result) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 })
    }

    // Return user data with session token (no cookies)
    return NextResponse.json({
      user: { id: result.id, username: result.username },
      sessionToken: result.sessionToken,
      message: "Account created successfully!",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
