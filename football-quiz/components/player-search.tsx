"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Player } from "@/lib/data"
import { Search } from "lucide-react"

interface PlayerSearchProps {
  onPlayerSelect: (playerName: string) => void
  disabled?: boolean
  placeholder?: string
  key?: string // Add key prop to force re-render
}

export function PlayerSearch({
  onPlayerSelect,
  disabled = false,
  placeholder = "Type player name...",
}: PlayerSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Player[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Clear input when disabled changes (new question)
  useEffect(() => {
    if (disabled) {
      setQuery("")
      setSuggestions([])
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }, [disabled])

  // Focus input when enabled
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus()
    }
  }, [disabled])

  useEffect(() => {
    const searchPlayers = async () => {
      if (query.length < 3) {
        // Changed from 2 to 3
        setSuggestions([])
        setShowSuggestions(false)
        return
      }

      try {
        const response = await fetch(`/api/players/search?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const players = await response.json()
          setSuggestions(players)
          setShowSuggestions(true)
          setSelectedIndex(-1)
        }
      } catch (error) {
        console.error("Error searching players:", error)
      }
    }

    const debounceTimer = setTimeout(searchPlayers, 200)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault()
        if (query.trim()) {
          selectPlayer(query.trim())
        }
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          selectPlayer(suggestions[selectedIndex].name)
        } else if (query.trim()) {
          selectPlayer(query.trim())
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  const selectPlayer = (playerName: string) => {
    setQuery(playerName)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    onPlayerSelect(playerName)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      selectPlayer(query.trim())
    }
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 3 && setShowSuggestions(true)}
            placeholder={placeholder}
            disabled={disabled}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        <Button type="submit" disabled={disabled || !query.trim()}>
          Submit
        </Button>
      </form>

      {showSuggestions && suggestions.length > 0 && !disabled && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((player, index) => (
            <div
              key={player.id}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${index === selectedIndex ? "bg-gray-100" : ""}`}
              onClick={() => selectPlayer(player.name)}
            >
              <div className="font-medium">{player.name}</div>
              <div className="text-sm text-gray-500">
                {player.nationality && `${player.nationality} • `}
                {player.position && `${player.position}`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
