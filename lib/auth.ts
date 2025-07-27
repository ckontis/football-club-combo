import { neon } from "@neondatabase/serverless"

// Only initialize if DATABASE_URL exists
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

export interface User {
  id: number
  username: string
  created_at: string
}

// In-memory user storage for fallback mode
const fallbackUsers: User[] = []
const fallbackPasswords: Map<string, string> = new Map()
let nextUserId = 1

export async function createUser(username: string, password: string): Promise<User | null> {
  // Always try fallback mode first if no DATABASE_URL
  if (!sql) {
    // Check if user already exists
    const existingUser = fallbackUsers.find((u) => u.username === username)
    if (existingUser) {
      return null // Username already exists
    }

    const newUser: User = {
      id: nextUserId++,
      username,
      created_at: new Date().toISOString(),
    }
    fallbackUsers.push(newUser)
    fallbackPasswords.set(username, password)
    return newUser
  }

  try {
    // For demo purposes, use a simple hash instead of bcrypt to avoid dependency issues
    const passwordHash = Buffer.from(password).toString("base64")

    // Try to create the users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE username = ${username}
    `

    if (existingUser.length > 0) {
      return null // Username already exists
    }

    // Create user
    const newUser = await sql`
      INSERT INTO users (username, password_hash)
      VALUES (${username}, ${passwordHash})
      RETURNING id, username, created_at
    `

    return newUser[0] as User
  } catch (error) {
    console.error("Error creating user:", error)

    // Fallback to in-memory storage
    const existingUser = fallbackUsers.find((u) => u.username === username)
    if (existingUser) {
      return null
    }

    const newUser: User = {
      id: nextUserId++,
      username,
      created_at: new Date().toISOString(),
    }
    fallbackUsers.push(newUser)
    fallbackPasswords.set(username, password)
    return newUser
  }
}

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  // Always try fallback mode first if no DATABASE_URL
  if (!sql) {
    const user = fallbackUsers.find((u) => u.username === username)
    if (user && fallbackPasswords.get(username) === password) {
      return user
    }
    return null
  }

  try {
    const passwordHash = Buffer.from(password).toString("base64")

    // Try to create the users table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    const user = await sql`
      SELECT id, username, password_hash, created_at
      FROM users
      WHERE username = ${username}
    `

    if (user.length === 0) {
      return null
    }

    const isValidPassword = user[0].password_hash === passwordHash

    if (!isValidPassword) {
      return null
    }

    return {
      id: user[0].id,
      username: user[0].username,
      created_at: user[0].created_at,
    } as User
  } catch (error) {
    console.error("Error authenticating user:", error)

    // Fallback to in-memory storage
    const user = fallbackUsers.find((u) => u.username === username)
    if (user && fallbackPasswords.get(username) === password) {
      return user
    }
    return null
  }
}
