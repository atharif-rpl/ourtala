"use client"

import { useEffect, useState, useRef } from "react"

export default function AnimatedHero() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [time, setTime] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  // Photo slots - GANTI URL SESUAI KEBUTUHAN ANDA
  const photoSlots = [
    {
      id: 1,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "large",
      bloomDirection: { angle: 15, distance: 350, curve: 0.3, rotation: 45 },
    },
    {
      id: 2,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "medium",
      bloomDirection: { angle: 45, distance: 280, curve: -0.2, rotation: -30 },
    },
    {
      id: 3,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "large",
      bloomDirection: { angle: 75, distance: 320, curve: 0.4, rotation: 120 },
    },
    {
      id: 4,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "small",
      bloomDirection: { angle: 105, distance: 250, curve: -0.1, rotation: -75 },
    },
    {
      id: 5,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "medium",
      bloomDirection: { angle: 135, distance: 300, curve: 0.25, rotation: 90 },
    },
    {
      id: 6,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "large",
      bloomDirection: { angle: 165, distance: 380, curve: -0.3, rotation: -45 },
    },
    {
      id: 7,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "medium",
      bloomDirection: { angle: 195, distance: 290, curve: 0.35, rotation: 160 },
    },
    {
      id: 8,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "small",
      bloomDirection: { angle: 225, distance: 260, curve: -0.15, rotation: 30 },
    },
    {
      id: 9,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "large",
      bloomDirection: { angle: 255, distance: 340, curve: 0.2, rotation: -90 },
    },
    {
      id: 10,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "medium",
      bloomDirection: { angle: 285, distance: 270, curve: -0.25, rotation: 135 },
    },
    {
      id: 11,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "small",
      bloomDirection: { angle: 315, distance: 310, curve: 0.4, rotation: -120 },
    },
    {
      id: 12,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "medium",
      bloomDirection: { angle: 345, distance: 290, curve: -0.1, rotation: 75 },
    },
    {
      id: 13,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "large",
      bloomDirection: { angle: 30, distance: 360, curve: 0.3, rotation: -60 },
    },
    {
      id: 14,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "small",
      bloomDirection: { angle: 120, distance: 240, curve: -0.2, rotation: 105 },
    },
    {
      id: 15,
      photoUrl: "/flower-character.png", // Ganti dengan gambar Anda
      size: "medium",
      bloomDirection: { angle: 210, distance: 320, curve: 0.35, rotation: -15 },
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
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

  // Calculate bloom effect based on scroll - SMOOTH VERSION
  const scatterProgress = Math.min(scrollY / 300, 1)
  const easeOutQuart = 1 - Math.pow(1 - scatterProgress, 4)
  const bloomEasing =
    scatterProgress < 0.5
      ? 4 * scatterProgress * scatterProgress * scatterProgress
      : 1 - Math.pow(-2 * scatterProgress + 2, 3) / 2

  // Get size value
  const getSizeValue = (size: string) => {
    switch (size) {
      case "small":
        return 80
      case "medium":
        return 120
      case "large":
        return 160
      default:
        return 100
    }
  }

  return (
    <>
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-screen bg-gradient-to-br from-amber-50 to-white overflow-hidden"
      >
        {/* Main Content Area */}
        <div className="relative pt-0 min-h-screen flex items-center justify-center">
          {/* Background subtle pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #10B981 0%, transparent 50%)`,
            }}
          />

          {/* Photo Slots - BLOOM EFFECT dengan Karakter Bunga */}
          <div className="relative w-full max-w-6xl mx-auto px-6">
            {photoSlots.map((slot, index) => {
              const size = getSizeValue(slot.size)
              const angle = index * (360 / photoSlots.length) * (Math.PI / 180)
              const baseRadius = 180

              // Initial position (tight circle around logo)
              const initialX = Math.cos(angle) * baseRadius
              const initialY = Math.sin(angle) * baseRadius

              // BLOOM EFFECT - membuka seperti bunga dengan kurva abstrak
              const bloomAngle = (slot.bloomDirection.angle * Math.PI) / 180
              const bloomDistance = slot.bloomDirection.distance
              const curve = slot.bloomDirection.curve

              // Posisi bloom dengan kurva abstrak
              const bloomX = Math.cos(bloomAngle) * bloomDistance * bloomEasing
              const bloomY = Math.sin(bloomAngle) * bloomDistance * bloomEasing

              // Tambahkan efek kurva untuk gerakan yang lebih organic
              const curveOffset = curve * bloomEasing * 100
              const curvedX = bloomX + Math.sin(bloomAngle + Math.PI / 2) * curveOffset
              const curvedY = bloomY + Math.cos(bloomAngle + Math.PI / 2) * curveOffset

              // Interpolasi smooth dari posisi awal ke posisi bloom
              const currentX = initialX + (curvedX - initialX) * bloomEasing
              const currentY = initialY + (curvedY - initialY) * bloomEasing

              // Rotasi bloom dengan efek spiral
              const baseRotation = Math.sin(time * 0.3 + index * 0.5) * 3
              const bloomRotation = slot.bloomDirection.rotation * bloomEasing
              const spiralRotation = bloomEasing * 180 * (index % 2 === 0 ? 1 : -1)
              const totalRotation = baseRotation + bloomRotation + spiralRotation * 0.3

              // Efek "breathing" saat bloom
              const breathingScale = 1 + Math.sin(time * 2 + index * 0.8) * (bloomEasing * 0.1)

              // Efek shimmer saat membuka
              const shimmerOffset = Math.sin(time * 3 + index) * (bloomEasing * 5)

              return (
                <div
                  key={slot.id}
                  className={`absolute transition-all duration-1000 ease-out cursor-pointer group ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `
                      translate(-50%, -50%) 
                      translate(${currentX + shimmerOffset}px, ${currentY}px) 
                      rotate(${totalRotation}deg)
                      scale(${breathingScale * (1 - bloomEasing * 0.1)})
                    `,
                    animationDelay: `${index * 0.04}s`,
                    zIndex: 10 + index,
                    willChange: "transform",
                    filter: `blur(${bloomEasing * 0.2}px) brightness(${1 + bloomEasing * 0.1})`,
                  }}
                >
                  {/* Character Container - Mendukung PNG dengan transparansi */}
                  <div
                    className="relative hover:scale-110 transition-all duration-300 group"
                    style={{
                      width: size,
                      height: size,
                    }}
                  >
                    {/* Character Image - Mendukung transparansi PNG */}
                    <img
                      src={slot.photoUrl || "/placeholder.svg"}
                      alt={`Character ${slot.id}`}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                      style={{
                        filter: `saturate(${1 + bloomEasing * 0.3}) contrast(${1 + bloomEasing * 0.2})`,
                      }}
                    />

                    {/* Subtle glow effect untuk karakter */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-yellow-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl"
                      style={{
                        transform: "scale(1.5)",
                      }}
                    />

                    {/* Character ID indicator (for development) */}
                    <div className="absolute top-1 right-1 w-5 h-5 bg-red-500/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{slot.id}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Central Logo - Smooth appearance */}
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
            style={{
              opacity: bloomEasing * 0.9,
              transform: `translate(-50%, -50%) scale(${0.3 + bloomEasing * 0.7})`,
              willChange: "transform, opacity",
            }}
          >
            <div className="text-center">
              <div
                className="relative"
                style={{
                  transform: `rotate(${Math.sin(time * 0.2) * 3}deg)`,
                }}
              >
                <img
                  src="/logo.png"
                  alt="OurTala Logo"
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto drop-shadow-2xl transition-all duration-500"
                />

                {/* Bloom center glow */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-yellow-400/20 rounded-full blur-xl"
                  style={{
                    transform: `scale(${1.2 + Math.sin(time * 0.4) * 0.1 + bloomEasing * 0.3})`,
                    opacity: 0.3 + bloomEasing * 0.4,
                  }}
                />

                {/* Radiating lines effect */}
                {bloomEasing > 0.2 && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `conic-gradient(from ${time * 20}deg, transparent 0%, #EF444420 10%, transparent 20%, #F59E0B20 30%, transparent 40%, #EF444415 50%, transparent 60%)`,
                      transform: `scale(${3 + bloomEasing}) rotate(${time * 10}deg)`,
                      opacity: bloomEasing * 0.6,
                      borderRadius: "50%",
                    }}
                  />
                )}
              </div>

              <h2
                className="text-3xl md:text-5xl font-bold text-gray-800 mt-4 tracking-wider transition-all duration-700"
                style={{
                  transform: `translateY(${Math.sin(time * 0.3) * 2}px)`,
                }}
              >
                OURTALA
              </h2>
              <p
                className="text-lg md:text-xl text-gray-600 mt-2 font-light transition-all duration-700"
                style={{
                  transform: `translateY(${Math.sin(time * 0.25 + 1) * 1.5}px)`,
                }}
              >
                Sustainable Innovation
              </p>
            </div>
          </div>
        </div>

        {/* Smooth Scroll Indicator */}
        <div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out"
          style={{
            opacity: Math.max(0, 1 - bloomEasing * 1.5),
            transform: `translateX(-50%) translateY(${bloomEasing * 30}px) scale(${1 - bloomEasing * 0.3})`,
          }}
        >
          <div className="flex flex-col items-center text-gray-600">
            <div className="text-sm font-medium mb-2 animate-pulse-gentle">Scroll to see the magic bloom</div>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center animate-float-gentle">
              <div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                style={{
                  transform: `translateY(${Math.sin(time * 2) * 3}px)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div
            className="h-full bg-gradient-to-r from-red-400 to-yellow-400 transition-all duration-300"
            style={{ width: `${scatterProgress * 100}%` }}
          />
        </div>
      </section>

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }

        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        .animate-float-gentle {
          animation: float-gentle 8s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 4s ease-in-out infinite;
        }

        /* Smooth scrolling with momentum */
        html {
          scroll-behavior: smooth;
        }

        /* Hardware acceleration for smooth animations */
        * {
          -webkit-transform: translateZ(0);
          -moz-transform: translateZ(0);
          -ms-transform: translateZ(0);
          -o-transform: translateZ(0);
          transform: translateZ(0);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #EF4444, #F59E0B);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #DC2626, #D97706);
        }
      `}</style>
    </>
  )
}
