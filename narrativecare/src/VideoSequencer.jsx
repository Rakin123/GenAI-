import { useState, useRef, useEffect } from "react"

export default function VideoSequencer({ clips }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const videoRef = useRef(null)

    // When currentIndex changes, load and play the new clip
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load()
            videoRef.current.play()
        }
    }, [currentIndex])

    function handleEnded() {
        if (currentIndex < clips.length - 1) {
            // Move to next clip
            setCurrentIndex((prev) => prev + 1)
        } else {
            // Last clip — loop it
            videoRef.current.play()
        }
    }

    // Filter out any null clips (in case Kling failed on some)
    const validClips = clips.filter(Boolean)
    if (validClips.length === 0) return null

    const safeIndex = currentIndex < validClips.length ? currentIndex : 0

    return (
        <video
            ref={videoRef}
            src={validClips[safeIndex]}
            onEnded={handleEnded}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
        />
    )
}