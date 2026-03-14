import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import LoadingScreen from "./LoadingScreen"
import FilmScreen from "./FilmScreen"

function InputFlow() {
  const [screen, setScreen] = useState("input")
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [fadeOut, setFadeOut] = useState(false)

  function handleSubmit() {
    // Edge case — empty input
    if (input.trim() === "") {
      setError("Please share what's on your mind first.")
      return
    }
    // Edge case — too short
    if (input.trim().length < 10) {
      setError("Tell us a little more...")
      return
    }
    setError("")
    // Blur transition out
    setFadeOut(true)
    setTimeout(() => {
      setScreen("loading")
      setFadeOut(false)
    }, 400)
    setTimeout(() => setScreen("film"), 75000)
  }

  if (screen === "loading") return <LoadingScreen />
  if (screen === "film") return <FilmScreen />

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 transition-all duration-400"
      style={{
        background: "radial-gradient(ellipse at bottom, #1a0a2e 0%, #000000 70%)",
        filter: fadeOut ? "blur(8px)" : "blur(0px)",
        opacity: fadeOut ? 0 : 1,
        transition: "filter 0.4s ease, opacity 0.4s ease",
      }}
    >
      <div className="w-full max-w-xl flex flex-col gap-6">
        {/* Typewriter title */}
        <TypewriterTitle />

        <p className="text-zinc-500 text-sm text-center">
          Tell us what's on your mind. We'll create a personal film just for you.
        </p>

        <textarea
          className="w-full bg-zinc-900/80 text-white rounded-2xl p-5 text-lg resize-none outline-none border border-zinc-800 focus:border-purple-500 transition-colors"
          rows={5}
          placeholder="What's weighing on you today..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError("")
          }}
        />

        {/* Error message */}
        {error && (
          <p className="text-purple-400 text-sm text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="self-center bg-purple-600 hover:bg-purple-500 text-white text-lg font-medium px-10 py-3 rounded-full transition-colors"
        >
          Generate your film
        </button>
      </div>
    </div>
  )
}

// Typewriter effect for title (#4 polish)
function TypewriterTitle() {
  const [displayed, setDisplayed] = useState("")
  const full = "NarrativeCare"

  useState(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(full.slice(0, i + 1))
      i++
      if (i >= full.length) clearInterval(interval)
    }, 100)
    return () => clearInterval(interval)
  })

  return (
    <h1 className="text-white text-3xl font-light text-center tracking-wide">
      {displayed}
      <span className="animate-pulse">|</span>
    </h1>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<InputFlow />} />
      <Route path="/backup" element={<FilmScreen />} />
    </Routes>
  )
}