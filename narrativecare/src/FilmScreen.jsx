import { useState, useEffect, useRef } from "react"
import VideoSequencer from "./VideoSequencer"
import WordReveal from "./WordReveal"

const TEST_DATA = {
    fable: "There was an architect who built a great building and stood alone inside it the night before it opened. She walked through each empty room. In the last one she found her initials carved into the concrete during construction. She had forgotten she put them there.",
    video_urls: [
        "https://www.w3schools.com/html/mov_bbb.mp4",
        "https://www.w3schools.com/html/mov_bbb.mp4",
        "https://www.w3schools.com/html/mov_bbb.mp4",
        "https://www.w3schools.com/html/mov_bbb.mp4",
        "https://www.w3schools.com/html/mov_bbb.mp4",
    ],
    audio_duration_ms: 32000,
    insight_tag: "belonging",
    audio_src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
}

export default function FilmScreen({ data = TEST_DATA }) {
    const [storyComplete, setStoryComplete] = useState(false)
    const [started, setStarted] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        const timer = setTimeout(() => {
            audio.play().catch((e) => console.log("Audio play failed:", e))
            setStarted(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* Audio */}
            <audio ref={audioRef} src={data.audio_src} />

            {/* Video */}
            <VideoSequencer clips={data.video_urls} />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Grain texture overlay */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px 128px",
                }}
            />

            {/* Word reveal */}
            <div className="absolute inset-0 flex items-center justify-center">
                {started && (
                    <WordReveal
                        text={data.fable}
                        audioDurationMs={data.audio_duration_ms}
                        onComplete={() => setStoryComplete(true)}
                    />
                )}
            </div>

            {/* Insight tag */}
            <div
                className="absolute bottom-8 w-full text-center transition-opacity duration-1000"
                style={{ opacity: storyComplete ? 1 : 0 }}
            >
                <span
                    className="text-zinc-300 text-lg tracking-widest uppercase"
                    style={{ textShadow: "0 0 20px rgba(168,85,247,0.6)" }}
                >
                    {data.insight_tag}
                </span>
            </div>
        </div>
    )
}