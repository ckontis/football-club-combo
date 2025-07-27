import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Simple logout - client will handle token removal
    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
