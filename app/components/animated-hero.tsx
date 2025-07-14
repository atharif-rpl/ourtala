"use client"

import { useEffect, useState, useRef } from "react"

export default function AnimatedHero() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [time, setTime] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  // Floating particles data
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    speed: Math.random() * 0.5 + 0.2,
    opacity: Math.random() * 0.5 + 0.3,
  }))

  // Decorative ornaments that react to scroll
  const ornaments = Array.from({ length: 12 }, (_, i) => ({
    id: `ornament-${i}`,
    type: ["circle", "diamond", "star", "hexagon"][i % 4],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 20,
    initialRotation: Math.random() * 360,
    scrollRotation: Math.random() * 180 + 90, // 90-270 degrees on scroll
    opacity: Math.random() * 0.3 + 0.1,
    scale: Math.random() * 0.8 + 0.4,
    color: ["amber", "yellow", "orange"][i % 3],
  }))

  // Photo slots - keeping original functionality
  const photoSlots = [
    {
      id: 1,
      photoUrl: "/images/mascotbunga.png",
      size: "large",
      bloomDirection: { angle: 15, distance: 500, curve: 0.3, rotation: 45 },
    },
    {
      id: 2,
      photoUrl: "/images/mascotpot.png",
      size: "medium",
      bloomDirection: { angle: 45, distance: 420, curve: -0.2, rotation: -30 },
    },
    {
      id: 3,
      photoUrl: "/images/mascotpohon.png",
      size: "large",
      bloomDirection: { angle: 75, distance: 480, curve: 0.4, rotation: 120 },
    },
    {
      id: 4,
      photoUrl: "/images/mascotbunga.png",
      size: "small",
      bloomDirection: { angle: 105, distance: 400, curve: -0.1, rotation: -75 },
    },
    {
      id: 5,
      photoUrl: "/images/mascotpot.png",
      size: "medium",
      bloomDirection: { angle: 135, distance: 450, curve: 0.25, rotation: 90 },
    },
    {
      id: 6,
      photoUrl: "/images/mascotpohon.png",
      size: "large",
      bloomDirection: { angle: 165, distance: 520, curve: -0.3, rotation: -45 },
    },
    {
      id: 7,
      photoUrl: "/images/mascotbunga.png",
      size: "medium",
      bloomDirection: { angle: 195, distance: 440, curve: 0.35, rotation: 160 },
    },
    {
      id: 8,
      photoUrl: "/images/mascotpot.png",
      size: "small",
      bloomDirection: { angle: 225, distance: 410, curve: -0.15, rotation: 30 },
    },
    {
      id: 9,
      photoUrl: "/images/mascotbunga.png",
      size: "large",
      bloomDirection: { angle: 255, distance: 490, curve: 0.2, rotation: -90 },
    },
    {
      id: 10,
      photoUrl: "/images/mascotpot.png",
      size: "medium",
      bloomDirection: { angle: 285, distance: 430, curve: -0.25, rotation: 135 },
    },
    {
      id: 11,
      photoUrl: "/images/mascotpohon.png",
      size: "small",
      bloomDirection: { angle: 315, distance: 460, curve: 0.4, rotation: -120 },
    },
    {
      id: 12,
      photoUrl: "/images/mascotbunga.png",
      size: "medium",
      bloomDirection: { angle: 345, distance: 440, curve: -0.1, rotation: 75 },
    },
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        })
      }
    }

    const animationFrame = () => {
      setTime(Date.now() * 0.001)
      requestAnimationFrame(animationFrame)
    }

    setTimeout(() => setIsLoaded(true), 500)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    requestAnimationFrame(animationFrame)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
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

  const getOrnamentShape = (type: string, size: number, color: string) => {
    const colorClasses = {
      amber: "from-amber-300/40 to-amber-400/60",
      yellow: "from-yellow-300/40 to-yellow-400/60",
      orange: "from-orange-300/40 to-orange-400/60",
    }

    switch (type) {
      case "circle":
        return (
          <div
            className={`w-full h-full rounded-full bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm`}
          />
        )
      case "diamond":
        return (
          <div
            className={`w-full h-full bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm`}
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
        )
      case "star":
        return (
          <div
            className={`w-full h-full bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm`}
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />
        )
      case "hexagon":
        return (
          <div
            className={`w-full h-full bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm`}
            style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
          />
        )
      default:
        return (
          <div
            className={`w-full h-full rounded-full bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm`}
          />
        )
    }
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-yellow-50/50 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Main gradient overlays */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-300/40 via-amber-300/30 to-orange-300/20 rounded-full filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-400/35 via-yellow-300/25 to-orange-400/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-orange-300/40 via-amber-200/30 to-yellow-300/25 rounded-full filter blur-3xl opacity-55 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-tl from-yellow-400/30 via-amber-300/25 to-orange-200/35 rounded-full filter blur-3xl opacity-45 animate-blob animation-delay-6000"></div>
      </div>

      {/* Curved Lines that extend on scroll */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          {/* Curved Line 1 */}
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

          {/* Curved Line 2 */}
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

          {/* Curved Line 3 */}
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

          {/* Curved Line 4 */}
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

          {/* Gradients for lines */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Decorative Ornaments that react to scroll */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
        {ornaments.map((ornament, index) => {
          const scrollRotation = ornament.initialRotation + scatterProgress * ornament.scrollRotation
          const scrollScale = ornament.scale + scatterProgress * 0.3
          const scrollOpacity = ornament.opacity * (1 + scatterProgress * 0.5)

          return (
            <div
              key={ornament.id}
              className={`absolute transition-all duration-1000 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
              style={{
                left: `${ornament.x}%`,
                top: `${ornament.y}%`,
                transform: `translate(-50%, -50%) rotate(${scrollRotation}deg) scale(${scrollScale})`,
                opacity: Math.min(scrollOpacity, 0.8),
                animationDelay: `${index * 0.1}s`,
                width: ornament.size,
                height: ornament.size,
              }}
            >
              {getOrnamentShape(ornament.type, ornament.size, ornament.color)}
            </div>
          )
        })}
      </div>

      {/* Additional scroll-reactive elements */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 3 }}>
        {/* Expanding circles on scroll */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`expanding-${i}`}
            className={`absolute rounded-full border-2 transition-all duration-1500 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              width: `${50 + scatterProgress * 100}px`,
              height: `${50 + scatterProgress * 100}px`,
              borderColor: `rgba(251, 191, 36, ${0.2 - scatterProgress * 0.1})`,
              transform: `translate(-50%, -50%) rotate(${scatterProgress * 180}deg)`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 4 }}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-amber-300/60 to-yellow-300/40 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: `${particle.id * 0.5}s`,
              animationDuration: `${8 + particle.speed * 4}s`,
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              transition: "transform 0.3s ease-out",
            }}
          />
        ))}
      </div>

      {/* Magical sparkles */}
      <div className="absolute inset-0" style={{ zIndex: 5 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full opacity-70 animate-ping"></div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4" style={{ zIndex: 10 }}>
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Enhanced mascot container - Main mascots */}
          <div
            className="absolute"
            style={{
              transform: `scale(${1 + bloomEasing * 0.1}) translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
              transition: "transform 0.3s ease-out",
              zIndex: 20,
            }}
          >
            <div className="relative">
              {photoSlots.map((slot, index) => {
                const size = getSizeValue(slot.size)
                const baseRadius = 250
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
                      zIndex: 30 + index,
                      willChange: "transform",
                    }}
                  >
                    <div
                      className="relative hover:scale-110 transition-all duration-300 filter hover:drop-shadow-2xl"
                      style={{ width: size, height: size }}
                    >
                      {/* Glow effect behind mascot */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-300/30 to-yellow-300/30 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150"></div>

                      <img
                        src={slot.photoUrl || "/placeholder.svg"}
                        alt={`Character ${slot.id}`}
                        className="relative w-full h-full object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                      />

                      {/* Sparkle effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {Array.from({ length: 3 }, (_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${10 + i * 20}%`,
                              animationDelay: `${i * 0.2}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Enhanced center logo */}
            <div
              className="absolute top-1/2 left-1/2 transition-all duration-1000 ease-out"
              style={{
                opacity: 1 - scatterProgress * 0.5,
                transform: `translate(-50%, -50%) scale(${1 - scatterProgress * 0.4}) translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`,
                willChange: "transform, opacity",
                zIndex: 50,
              }}
            >
              <div className="text-center relative">
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 via-yellow-300/30 to-orange-300/20 rounded-full filter blur-3xl scale-150 animate-pulse"></div>

                <div className="relative">
                  <img
                    src="/images/OURTALA.png"
                    alt="OurTala Logo"
                    className="h-28 md:h-32 mx-auto drop-shadow-2xl mb-4 hover:scale-105 transition-all duration-300 filter hover:brightness-110"
                  />

                  {/* Enhanced typography */}
                  <h2 className="text-6xl md:text-8xl font-modak tracking-wider bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                    OURTALA
                  </h2>

                  <p className="text-lg md:text-xl text-gray-600 mt-2 font-light tracking-wide opacity-80 hover:opacity-100 transition-all duration-300">
                    ✨ Sustainable Innovation ✨
                  </p>

                  {/* Decorative elements */}
                  <div className="flex justify-center items-center mt-4 space-x-4">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ zIndex: 60 }}>
        <div className="flex flex-col items-center text-amber-600">
          <span className="text-sm font-medium mb-2 opacity-70">Scroll to explore</span>
          <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
        .animation-delay-3000 { animation-delay: 3s; }
      `}</style>
    </section>
  )
}
