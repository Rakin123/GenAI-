import { useState, useEffect } from "react"

const stages = [
    { label: "Director reading your situation...", duration: 10000 },
    { label: "Finding what is specifically true...", duration: 12000 },
    { label: "Writer crafting your fable...", duration: 15000 },
    { label: "Cinematographer building your 5 scenes...", duration: 13000 },
    { label: "Generating your film...", duration: 25000 },
]

export default function LoadingScreen() {
    const [currentStage, setCurrentStage] = useState(0)
    const [progress, setProgress] = useState(0)
    const [flashStage, setFlashStage] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) { clearInterval(interval); return 100 }
                return prev + (100 / 750)
            })
        }, 100)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (currentStage >= stages.length - 1) return
        const timer = setTimeout(() => {
            setFlashStage(currentStage)
            setTimeout(() => {
                setFlashStage(null)
                setCurrentStage((prev) => prev + 1)
            }, 600)
        }, stages[currentStage].duration)
        return () => clearTimeout(timer)
    }, [currentStage])

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 gap-10">
            <h1 className="text-white text-3xl font-light tracking-wide">NarrativeCare</h1>

            <div className="flex flex-col gap-4 w-full max-w-md">
                {stages.map((stage, i) => (
                    <div key={i} className="flex items-center gap-3">
                        {/* Status indicator */}
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

                        {/* Label */}
                        <span
                            className={`text-sm transition-all duration-700 ${i === currentStage
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

            {/* Progress bar with glow */}
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
    )
}