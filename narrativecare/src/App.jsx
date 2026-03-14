import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import FilmScreen from "./FilmScreen"

const stages = [
  { label: "Director analyzing your situation...", duration: 10000 },
  { label: "Finding you unique story...", duration: 12000 },
  { label: "Writer crafting your fable...", duration: 15000 },
  { label: "Cinematographer filming your 5 scenes...", duration: 13000 },
  { label: "Generating your movie...", duration: 25000 },
]

function TypewriterTitle() {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const full = "NarrativeCare"

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(full.slice(0, i + 1))
      i++
      if (i >= full.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <h1 className="text-white text-5xl font-bold text-center tracking-wide">
      {displayed}
      {!done && <span className="animate-pulse">|</span>}
    </h1>
  )
}

function MainFlow() {
  const [screen, setScreen] = useState("input")
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [inputVisible, setInputVisible] = useState(true)
  const [loadingVisible, setLoadingVisible] = useState(false)

  // Loading screen state
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [flashStage, setFlashStage] = useState(null)

  useEffect(() => {
    if (screen !== "loading") return
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        return prev + (100 / 750)
      })
    }, 100)
    return () => clearInterval(interval)
  }, [screen])

  useEffect(() => {
    if (screen !== "loading") return
    if (currentStage >= stages.length - 1) return
    const timer = setTimeout(() => {
      setFlashStage(currentStage)
      setTimeout(() => {
        setFlashStage(null)
        setCurrentStage((prev) => prev + 1)
      }, 600)
    }, stages[currentStage].duration)
    return () => clearTimeout(timer)
  }, [currentStage, screen])

  function handleSubmit() {
    if (input.trim() === "") {
      setError("Please share what's on your mind first.")
      return
    }
    if (input.trim().length < 10) {
      setError("Tell us a little more...")
      return
    }
    setError("")
    setInputVisible(false)
    setTimeout(() => {
      setScreen("loading")
      setTimeout(() => setLoadingVisible(true), 100)
    }, 1000)
    // Move to film screen after 75 seconds
    setTimeout(() => setScreen("film"), 75000)
  }

  if (screen === "film") return <FilmScreen />

  return (
    <div
      className="min-h-screen flex flex-col px-4"
      style={{ background: "radial-gradient(ellipse at bottom, #1e0a35 0%, #0d0018 50%, #000000 80%)" }}
    >
      {/* Title — always visible, never moves */}
      <div className="flex items-center justify-center pt-[30vh]">
        <TypewriterTitle />
      </div>

      {/* Input content */}
      {screen === "input" && (
        <div
          className="flex flex-col items-center gap-6 mt-8 w-full max-w-xl mx-auto transition-opacity duration-1500"
          style={{ opacity: inputVisible ? 1 : 0 }}
        >
          <p className="text-zinc-400 text-sm text-center">
            Tell us what's on your mind. We'll create a personal film just for you.
          </p>

          <textarea
            className="w-full bg-zinc-900/80 text-white rounded-2xl p-5 text-lg resize-none outline-none border border-purple-900 focus:border-purple-500 transition-colors"
            rows={5}
            placeholder="What's weighing on you today..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setError("")
            }}
          />

          {error && (
            <p className="text-purple-400 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="self-center bg-purple-700 hover:bg-purple-500 text-white text-lg font-medium px-10 py-3 rounded-full transition-colors"
            style={{ boxShadow: "0 0 24px rgba(147, 51, 234, 0.6)" }}
          >
            Generate your film
          </button>
        </div>
      )}

      {/* Loading content */}
      {screen === "loading" && (
        <div
          className="flex flex-col items-center gap-10 mt-8 transition-opacity duration-1500"
          style={{ opacity: loadingVisible ? 1 : 0 }}
        >
          <div className="flex flex-col gap-4 w-full max-w-md">
            {stages.map((stage, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 flex items-center justify-center flex-shrink-0">
                  {i < currentStage && flashStage !== i ? (
                    <span className="text-green-400 text-sm">✓</span>
                  ) : flashStage === i ? (
                    <span className="text-green-400 text-sm animate-ping">✓</span>
                  ) : i === currentStage ? (
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  )}
                </div>
                <span
                  className={`text-base transition-all duration-700 ${i === currentStage
                    ? "text-purple-300 opacity-100"
                    : i < currentStage
                      ? "text-zinc-500 opacity-60"
                      : "text-zinc-700 opacity-30"
                    }`}
                >
                  {stage.label}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full max-w-md bg-zinc-900 rounded-full h-1">
            <div
              className="bg-purple-500 h-1 rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 8px rgba(168, 85, 247, 0.8)",
              }}
            />
          </div>

          <p className="text-zinc-600 text-xs tracking-widest uppercase">
            Generating your personal film
          </p>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainFlow />} />
      <Route path="/backup" element={<FilmScreen />} />
    </Routes>
  )
}