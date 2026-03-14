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
    // Placeholder audio — replaced with real base64 audio in Hour 5
    audio_src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
}

export default function FilmScreen() {
    const [storyComplete, setStoryComplete] = useState(false)
    const [started, setStarted] = useState(false)
    const audioRef = useRef(null)

    // On mount — start everything simultaneously
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        // Small timeout to ensure video element is ready
        const timer = setTimeout(() => {
            audio.play().catch((e) => console.log("Audio play failed:", e))
            setStarted(true)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* Hidden audio element */}
            <audio ref={audioRef} src={TEST_DATA.audio_src} />

            {/* Video fills screen */}
            <VideoSequencer clips={TEST_DATA.video_urls} />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Word by word text reveal — only starts when audio starts */}
            <div className="absolute inset-0 flex items-center justify-center">
                {started && (
                    <WordReveal
                        text={TEST_DATA.fable}
                        audioDurationMs={TEST_DATA.audio_duration_ms}
                        onComplete={() => setStoryComplete(true)}
                    />
                )}
            </div>

            {/* Insight tag — fades in after story completes */}
            <div
                className="absolute bottom-8 w-full text-center transition-opacity duration-1000"
                style={{ opacity: storyComplete ? 1 : 0 }}
            >
                <span className="text-zinc-400 text-sm tracking-widest uppercase">
                    {TEST_DATA.insight_tag}
                </span>
            </div>
        </div>
    )
}