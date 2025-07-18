"use client"

import { useEffect, useState, useRef } from "react"

export default function AnimatedHero() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [time, setTime] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isHeroVisible, setIsHeroVisible] = useState(false) // State baru untuk animasi masuk Hero

  // Photo slots dengan jarak yang sudah disesuaikan
  const photoSlots = [
    {
      id: 1,
      photoUrl: "/images/mascotbunga.png",
      size: "large",
      bloomDirection: { angle: 15, distance: 600, curve: 0.3, rotation: 45 },
    },
    {
      id: 2,
      photoUrl: "/images/mascotpot.png",
      size: "medium",
      bloomDirection: { angle: 45, distance: 520, curve: -0.2, rotation: -30 },
    },
    {
      id: 3,
      photoUrl: "/images/mascotpohon.png",
      size: "large",
      bloomDirection: { angle: 75, distance: 580, curve: 0.4, rotation: 120 },
    },
    {
      id: 4,
      photoUrl: "/images/mascotbunga.png",
      size: "small",
      bloomDirection: { angle: 105, distance: 500, curve: -0.1, rotation: -75 },
    },
    {
      id: 5,
      photoUrl: "/images/mascotpot.png",
      size: "medium",
      bloomDirection: { angle: 135, distance: 550, curve: 0.25, rotation: 90 },
    },
    {
      id: 6,
      photoUrl: "/images/mascotpohon.png",
      size: "large",
      bloomDirection: { angle: 165, distance: 620, curve: -0.3, rotation: -45 },
    },
    {
      id: 7,
      photoUrl: "/images/mascotbunga.png",
      size: "medium",
      bloomDirection: { angle: 195, distance: 540, curve: 0.35, rotation: 160 },
    },
    {
      id: 8,
      photoUrl: "/images/mascotpot.png",
      size: "small",
      bloomDirection: { angle: 225, distance: 510, curve: -0.15, rotation: 30 },
    },
    {
      id: 9,
      photoUrl: "/images/mascotbunga.png",
      size: "large",
      bloomDirection: { angle: 255, distance: 590, curve: 0.2, rotation: -90 },
    },
    {
      id: 10,
      photoUrl: "/images/mascotpot.png",
      size: "medium",
      bloomDirection: { angle: 285, distance: 530, curve: -0.25, rotation: 135 },
    },
    {
      id: 11,
      photoUrl: "/images/mascotpohon.png",
      size: "small",
      bloomDirection: { angle: 315, distance: 560, curve: 0.4, rotation: -120 },
    },
    {
      id: 12,
      photoUrl: "/images/mascotbunga.png",
      size: "medium",
      bloomDirection: { angle: 345, distance: 540, curve: -0.1, rotation: 75 },
    },
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const animationFrame = () => {
      setTime(Date.now() * 0.001)
      requestAnimationFrame(animationFrame)
    }
    setTimeout(() => setIsLoaded(true), 500)
    window.addEventListener("scroll", handleScroll)
    requestAnimationFrame(animationFrame)

    // Set isHeroVisible to true after a short delay to trigger fade-in
    const heroEntryTimer = setTimeout(() => {
      setIsHeroVisible(true)
    }, 100) // Delay sedikit setelah komponen di-mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(heroEntryTimer)
    }
  }, [])

  const scatterProgress = Math.min(scrollY / 300, 1)
  const bloomEasing = 1 - Math.pow(1 - scatterProgress, 4)

  const getSizeValue = (size: string) => {
    switch (size) {
      case "small":
        return 110
      case "medium":
        return 160
      case "large":
        return 210
      default:
        return 130
    }
  }

  return (
    <section
      id="home"
      className={`relative min-h-screen bg-gradient-to-br from-emerald-50 to-lime-50 overflow-hidden transition-opacity duration-700 ease-out ${
        isHeroVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Garis SVG yang meliuk-liuk */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path
            d="M-100,200 Q300,100 600,300 T1300,400"
            stroke="url(#gradient1)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="2000"
            strokeDashoffset={2000 - scatterProgress * 2000}
            className="transition-all duration-1000 ease-out"
            opacity={0.6}
          />
          <path
            d="M-50,600 Q400,500 800,650 T1400,550"
            stroke="url(#gradient2)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="1800"
            strokeDashoffset={1800 - scatterProgress * 1800}
            className="transition-all duration-1200 ease-out"
            opacity={0.5}
          />
          <path
            d="M1300,150 Q900,250 500,200 T-200,350"
            stroke="url(#gradient3)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="1600"
            strokeDashoffset={1600 - scatterProgress * 1600}
            className="transition-all duration-1400 ease-out"
            opacity={0.4}
          />
          <path
            d="M200,50 Q600,150 1000,100 T1500,200"
            stroke="url(#gradient4)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="1400"
            strokeDashoffset={1400 - scatterProgress * 1400}
            className="transition-all duration-1600 ease-out"
            opacity={0.3}
          />
          <defs>
            {/* Gradient 1: Hijau ke Hijau Lebih Gelap */}
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" /> {/* emerald-400 */}
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" /> {/* emerald-500 */}
              <stop offset="100%" stopColor="#059669" stopOpacity="0.4" /> {/* emerald-600 */}
            </linearGradient>
            {/* Gradient 2: Lime ke Emerald */}
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#84CC16" stopOpacity="0.7" /> {/* lime-500 */}
              <stop offset="50%" stopColor="#22C55E" stopOpacity="0.5" /> {/* emerald-500 */}
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.3" /> {/* emerald-600 */}
            </linearGradient>
            {/* Gradient 3: Teal ke Emerald */}
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.6" /> {/* teal-500 */}
              <stop offset="50%" stopColor="#0D9488" stopOpacity="0.4" /> {/* teal-600 */}
              <stop offset="100%" stopColor="#047857" stopOpacity="0.2" /> {/* emerald-700 */}
            </linearGradient>
            {/* Gradient 4: Hijau Pucat ke Hijau Lebih Gelap */}
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.5" /> {/* emerald-300 */}
              <stop offset="50%" stopColor="#34D399" stopOpacity="0.3" /> {/* emerald-400 */}
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" /> {/* emerald-600 */}
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="absolute transition-all duration-1000 ease-out"
            style={{
              transform: `scale(${1 + bloomEasing * 0.1})`,
            }}
          >
            <div className="relative">
              {photoSlots.map((slot, index) => {
                const size = getSizeValue(slot.size)
                const baseRadius = 300
                const angle = index * (360 / photoSlots.length) * (Math.PI / 180)
                const initialX = Math.cos(angle) * baseRadius
                const initialY = Math.sin(angle) * baseRadius

                const bloomAngle = (slot.bloomDirection.angle * Math.PI) / 180
                const bloomDistance = slot.bloomDirection.distance
                const curve = slot.bloomDirection.curve

                const bloomX = Math.cos(bloomAngle) * bloomDistance * bloomEasing
                const bloomY = Math.sin(bloomAngle) * bloomDistance * bloomEasing
                const curveOffset = curve * bloomEasing * 100

                const curvedX = bloomX + Math.sin(bloomAngle + Math.PI / 2) * curveOffset
                const curvedY = bloomY + Math.cos(bloomAngle + Math.PI / 2) * curveOffset

                const currentX = initialX + (curvedX - initialX) * bloomEasing
                const currentY = initialY + (curvedY - initialY) * bloomEasing

                const baseRotation = Math.sin(time * 0.3 + index * 0.5) * 3
                const bloomRotation = slot.bloomDirection.rotation * bloomEasing
                const totalRotation = baseRotation + bloomRotation

                const breathingScale = 1 + Math.sin(time * 2 + index * 0.8) * (bloomEasing * 0.1)

                return (
                  <div
                    key={slot.id}
                    className={`absolute top-1/2 left-1/2 transition-all duration-1000 ease-out cursor-pointer group ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transform: `translate(-50%, -50%) translate(${currentX}px, ${currentY}px) rotate(${totalRotation}deg) scale(${breathingScale})`,
                      animationDelay: `${index * 0.04}s`,
                      zIndex: 10 + index,
                      willChange: "transform",
                    }}
                  >
                    <div
                      className="relative hover:scale-110 transition-all duration-300"
                      style={{ width: size, height: size }}
                    >
                      <img
                        src={slot.photoUrl || "/placeholder.svg"}
                        alt={`Character ${slot.id}`}
                        className="w-full h-full object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              className="absolute top-1/2 left-1/2 transition-all duration-1000 ease-out"
              style={{
                opacity: 1 - scatterProgress * 0.5,
                transform: `translate(-50%, -50%) scale(${1 - scatterProgress * 0.4})`,
                willChange: "transform, opacity",
              }}
            >
              <div className="text-center relative">
                <img
                  src="/images/OURTALA.png"
                  alt="OurTala Logo"
                  className="h-36 md:h-44 mx-auto drop-shadow-2xl mb-4"
                />
                <h2 className="text-7xl md:text-9xl font-modak tracking-wider bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600 bg-clip-text text-transparent">
                  OURTALA
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mt-2 font-light">Sustainable Innovation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
