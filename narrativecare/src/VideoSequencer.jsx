import { useState, useRef, useEffect } from "react"

export default function VideoSequencer({ clips }) {
  // Filter out nulls, loop available clips to always have 5
  const validClips = clips.filter(Boolean)
  
  // If we have fewer than 5, loop the valid ones to fill gaps
  const filledClips = validClips.length === 0 ? [] : Array.from(
    { length: 5 },
    (_, i) => validClips[i % validClips.length]
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play()
    }
  }, [currentIndex])

  function handleEnded() {
    if (currentIndex < filledClips.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      videoRef.current.play()
    }
  }

  if (filledClips.length === 0) return null

  return (
    <video
      ref={videoRef}
      src={filledClips[currentIndex]}
      onEnded={handleEnded}
      autoPlay
      playsInline
      muted
      className="absolute inset-0 w-full h-full object-cover"
    />
  )
}