import { useState, useEffect } from "react"

export default function WordReveal({ text, audioDurationMs, onComplete }) {
    const words = text.split(" ")
    const [revealedCount, setRevealedCount] = useState(0)
    const interval = audioDurationMs / words.length

    useEffect(() => {
        if (revealedCount >= words.length) {
            if (onComplete) onComplete()
            return
        }
        const timer = setTimeout(() => {
            setRevealedCount((prev) => prev + 1)
        }, interval)
        return () => clearTimeout(timer)
    }, [revealedCount])

    return (
        <div className="text-white text-xl text-center font-light leading-relaxed px-8 max-w-2xl">
            {words.map((word, i) => (
                <span
                    key={i}
                    className="transition-opacity duration-500"
                    style={{ opacity: i < revealedCount ? 1 : 0 }}
                >
                    {word}{" "}
                </span>
            ))}
        </div>
    )
}