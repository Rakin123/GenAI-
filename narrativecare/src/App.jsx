import { useState } from "react"
import LoadingScreen from "./LoadingScreen"
import FilmScreen from "./FilmScreen"

function App() {
  const [screen, setScreen] = useState("input")
  const [input, setInput] = useState("")

  function handleSubmit() {
    if (input.trim() === "") return
    setScreen("loading")
    // Simulate 75s loading then go to film — remove this in Hour 5
    setTimeout(() => setScreen("film"), 5000)
  }

  if (screen === "loading") return <LoadingScreen />
  if (screen === "film") return <FilmScreen />

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-xl flex flex-col gap-6">
        <h1 className="text-white text-3xl font-light text-center tracking-wide">
          NarrativeCare
        </h1>
        <textarea
          className="w-full bg-zinc-900 text-white rounded-2xl p-5 text-lg resize-none outline-none border border-zinc-800 focus:border-purple-500 transition-colors"
          rows={5}
          placeholder="What's weighing on you today..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
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

export default App