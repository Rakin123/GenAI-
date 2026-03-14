import { useState, useEffect } from "react"

const stages = [
    { label: "Director reading your situation...", duration: 10000 },
    { label: "Finding what is specifically true...", duration: 12000 }, //worth changing this one to "Finding the emotional core of your story..."
    { label: "Writer crafting your fable...", duration: 15000 }, 
    { label: "Cinematographer building your 5 scenes...", duration: 13000 },
    { label: "Generating your film...", duration: 25000 },
]

export default function LoadingScreen() {
    const [currentStage, setCurrentStage] = useState(0)
    const [progress, setProgress] = useState(0)

    // Progress bar fills over 75 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) { clearInterval(interval); return 100 }
                return prev + (100 / 750)
            })
        }, 100)
        return () => clearInterval(interval)
    }, [])

    // Cycle through stage labels
    useEffect(() => {
        if (currentStage >= stages.length - 1) return
        const timer = setTimeout(() => {
            setCurrentStage((prev) => prev + 1)
        }, stages[currentStage].duration)
        return () => clearTimeout(timer)
    }, [currentStage])

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 gap-10">
            <h1 className="text-white text-3xl font-light tracking-wide">NarrativeCare</h1>

            {/* Stage labels */}
            <div className="flex flex-col gap-3 w-full max-w-md">
                {stages.map((stage, i) => (
                    <div
                        key={i}
                        className={`text-sm transition-all duration-700 ${i === currentStage
                            ? "text-purple-400 opacity-100"
                            : i < currentStage
                                ? "text-zinc-600 opacity-50"
                                : "text-zinc-700 opacity-30"
                            }`}
                    >
                        {i < currentStage ? "✓ " : i === currentStage ? "▸ " : "  "}
                        {stage.label}
                    </div>
                ))}
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-md bg-zinc-900 rounded-full h-1">
                <div
                    className="bg-purple-500 h-1 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p className="text-zinc-600 text-xs">Generating your personal film...</p>
        </div>
    )
}