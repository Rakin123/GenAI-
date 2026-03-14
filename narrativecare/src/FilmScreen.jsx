import VideoSequencer from "./VideoSequencer"

// Hardcoded test data for now — replaced with real API response in Hour 5
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
}

export default function FilmScreen() {
    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* Video fills screen */}
            <VideoSequencer clips={TEST_DATA.video_urls} />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Story text placeholder */}
            <div className="absolute inset-0 flex items-center justify-center px-8">
                <p className="text-white text-xl text-center font-light leading-relaxed">
                    {TEST_DATA.fable}
                </p>
            </div>

            {/* Insight tag placeholder */}
            <div className="absolute bottom-8 w-full text-center">
                <span className="text-zinc-400 text-sm tracking-widest uppercase">
                    {TEST_DATA.insight_tag}
                </span>
            </div>
        </div>
    )
}