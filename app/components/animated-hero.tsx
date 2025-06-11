"use client"

import { useEffect, useState } from "react"

export default function AnimatedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const animationFrame = () => {
      setTime(Date.now() * 0.001)
      requestAnimationFrame(animationFrame)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    requestAnimationFrame(animationFrame)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced animated background with multiple layers */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), 
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
            linear-gradient(${time * 20}deg, rgba(34, 197, 94, 0.1) 0%, rgba(251, 191, 36, 0.1) 50%, rgba(34, 197, 94, 0.1) 100%),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500"><rect fill="%234ade80" width="1000" height="500"/><circle fill="%2365a30d" cx="100" cy="100" r="20"/><circle fill="%2365a30d" cx="300" cy="150" r="15"/><circle fill="%2365a30d" cx="500" cy="80" r="25"/><circle fill="%2365a30d" cx="700" cy="200" r="18"/><circle fill="%2365a30d" cx="900" cy="120" r="22"/></svg>')
          `,
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) scale(1.05)`,
        }}
      ></div>

      {/* Floating garden ornaments - Enhanced */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large decorative leaves */}
        <div
          className="absolute w-16 h-16 opacity-40"
          style={{
            top: "10%",
            left: "8%",
            transform: `rotate(${time * 30 + 45}deg) scale(${1 + Math.sin(time * 2) * 0.2})`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-300">
            <path d="M50 10 C30 20, 20 40, 30 60 C40 80, 60 80, 70 60 C80 40, 70 20, 50 10 Z" />
          </svg>
        </div>

        <div
          className="absolute w-20 h-20 opacity-35"
          style={{
            top: "15%",
            right: "12%",
            transform: `rotate(${-time * 25 + 120}deg) scale(${1 + Math.cos(time * 1.8) * 0.3})`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-400">
            <path d="M50 5 C25 15, 15 35, 25 55 C35 75, 65 75, 75 55 C85 35, 75 15, 50 5 Z" />
          </svg>
        </div>

        {/* Decorative flowers */}
        <div
          className="absolute w-12 h-12 opacity-50"
          style={{
            top: "25%",
            left: "15%",
            transform: `rotate(${time * 40}deg) scale(${1 + Math.sin(time * 3) * 0.15})`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="30" r="8" fill="#fbbf24" />
            <circle cx="70" cy="50" r="8" fill="#fbbf24" />
            <circle cx="50" cy="70" r="8" fill="#fbbf24" />
            <circle cx="30" cy="50" r="8" fill="#fbbf24" />
            <circle cx="50" cy="50" r="6" fill="#f59e0b" />
          </svg>
        </div>

        <div
          className="absolute w-14 h-14 opacity-45"
          style={{
            top: "20%",
            right: "20%",
            transform: `rotate(${-time * 35}deg) scale(${1 + Math.cos(time * 2.5) * 0.2})`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="25" r="10" fill="#22c55e" />
            <circle cx="75" cy="50" r="10" fill="#22c55e" />
            <circle cx="50" cy="75" r="10" fill="#22c55e" />
            <circle cx="25" cy="50" r="10" fill="#22c55e" />
            <circle cx="50" cy="50" r="8" fill="#16a34a" />
          </svg>
        </div>

        {/* Vine decorations */}
        <div
          className="absolute w-32 h-8 opacity-30"
          style={{
            top: "35%",
            left: "5%",
            transform: `rotate(${time * 15}deg) scaleX(${1 + Math.sin(time * 2) * 0.3})`,
          }}
        >
          <svg viewBox="0 0 200 50" className="w-full h-full fill-green-300">
            <path
              d="M10 25 Q50 10, 90 25 Q130 40, 170 25 Q190 15, 190 25"
              stroke="#22c55e"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="30" cy="20" r="3" fill="#22c55e" />
            <circle cx="70" cy="30" r="3" fill="#22c55e" />
            <circle cx="110" cy="20" r="3" fill="#22c55e" />
            <circle cx="150" cy="30" r="3" fill="#22c55e" />
          </svg>
        </div>

        <div
          className="absolute w-28 h-8 opacity-35"
          style={{
            bottom: "30%",
            right: "8%",
            transform: `rotate(${-time * 18}deg) scaleX(${1 + Math.cos(time * 1.5) * 0.25})`,
          }}
        >
          <svg viewBox="0 0 200 50" className="w-full h-full fill-green-400">
            <path
              d="M10 25 Q50 40, 90 25 Q130 10, 170 25 Q190 35, 190 25"
              stroke="#16a34a"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="40" cy="35" r="3" fill="#16a34a" />
            <circle cx="80" cy="15" r="3" fill="#16a34a" />
            <circle cx="120" cy="35" r="3" fill="#16a34a" />
            <circle cx="160" cy="15" r="3" fill="#16a34a" />
          </svg>
        </div>

        {/* Enhanced floating dots with plant-like patterns */}
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              top: `${15 + ((i * 7) % 70)}%`,
              left: `${10 + ((i * 11) % 80)}%`,
              background: i % 3 === 0 ? "#22c55e" : i % 3 === 1 ? "#fbbf24" : "#16a34a",
              opacity: 0.4 + (i % 3) * 0.1,
              transform: `
                translate(${Math.sin(time * (1 + i * 0.1)) * 20}px, ${Math.cos(time * (1.2 + i * 0.1)) * 15}px) 
                scale(${1 + Math.sin(time * (2 + i * 0.2)) * 0.3})
              `,
              boxShadow: `0 0 ${10 + (i % 3) * 5}px rgba(34, 197, 94, 0.3)`,
            }}
          />
        ))}

        {/* Butterfly ornaments */}
        <div
          className="absolute w-8 h-6 opacity-60"
          style={{
            top: "40%",
            left: "25%",
            transform: `
              translate(${Math.sin(time * 2) * 30}px, ${Math.cos(time * 1.5) * 20}px) 
              rotate(${Math.sin(time * 3) * 15}deg)
            `,
          }}
        >
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <ellipse cx="25" cy="20" rx="15" ry="10" fill="#fbbf24" opacity="0.8" />
            <ellipse cx="75" cy="20" rx="15" ry="10" fill="#fbbf24" opacity="0.8" />
            <ellipse cx="25" cy="40" rx="12" ry="8" fill="#f59e0b" opacity="0.8" />
            <ellipse cx="75" cy="40" rx="12" ry="8" fill="#f59e0b" opacity="0.8" />
            <line x1="50" y1="10" x2="50" y2="50" stroke="#92400e" strokeWidth="2" />
          </svg>
        </div>

        <div
          className="absolute w-6 h-5 opacity-50"
          style={{
            top: "60%",
            right: "30%",
            transform: `
              translate(${Math.cos(time * 1.8) * 25}px, ${Math.sin(time * 2.2) * 18}px) 
              rotate(${Math.cos(time * 2.5) * 20}deg)
            `,
          }}
        >
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <ellipse cx="25" cy="20" rx="12" ry="8" fill="#22c55e" opacity="0.8" />
            <ellipse cx="75" cy="20" rx="12" ry="8" fill="#22c55e" opacity="0.8" />
            <ellipse cx="25" cy="40" rx="10" ry="6" fill="#16a34a" opacity="0.8" />
            <ellipse cx="75" cy="40" rx="10" ry="6" fill="#16a34a" opacity="0.8" />
            <line x1="50" y1="10" x2="50" y2="50" stroke="#166534" strokeWidth="2" />
          </svg>
        </div>

        {/* Seed/pollen particles */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`seed-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${20 + ((i * 3) % 60)}%`,
              left: `${15 + ((i * 7) % 70)}%`,
              background: i % 2 === 0 ? "#fbbf24" : "#22c55e",
              opacity: 0.6,
              transform: `
                translate(${Math.sin(time * (2 + i * 0.3)) * 40}px, ${Math.cos(time * (1.8 + i * 0.2)) * 30}px) 
                scale(${1 + Math.sin(time * (3 + i * 0.4)) * 0.5})
              `,
              boxShadow: `0 0 4px ${i % 2 === 0 ? "#fbbf24" : "#22c55e"}`,
            }}
          />
        ))}

        {/* Decorative grass elements */}
        <div
          className="absolute bottom-0 left-0 w-full h-20 opacity-20"
          style={{
            background: `
              linear-gradient(to top, 
                rgba(34, 197, 94, 0.3) 0%, 
                transparent 100%
              )
            `,
          }}
        >
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={`grass-${i}`}
              className="absolute bottom-0"
              style={{
                left: `${i * 3.33}%`,
                width: "2px",
                height: `${15 + Math.sin(i) * 10}px`,
                background: "#22c55e",
                transform: `rotate(${Math.sin(time * 2 + i * 0.5) * 5}deg)`,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>

        {/* Floating petals */}
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute opacity-40"
            style={{
              top: `${10 + ((i * 8) % 80)}%`,
              left: `${5 + ((i * 9) % 90)}%`,
              transform: `
                translate(${Math.sin(time * (1.5 + i * 0.2)) * 50}px, ${Math.cos(time * (1.2 + i * 0.15)) * 35}px) 
                rotate(${time * (30 + i * 10)}deg)
              `,
            }}
          >
            <svg width="12" height="8" viewBox="0 0 12 8">
              <ellipse
                cx="6"
                cy="4"
                rx="6"
                ry="4"
                fill={i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#f472b6" : "#22c55e"}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Main content with enhanced animations */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Enhanced title with more ornamental effects */}
        <h1 className="text-6xl md:text-[200px] font-bold mb-6 animate-title-entrance relative">
          <div className="relative inline-block">
            {/* Decorative elements around title */}
            <div
              className="absolute -top-8 -left-8 w-6 h-6 opacity-60"
              style={{
                transform: `rotate(${time * 60}deg) scale(${1 + Math.sin(time * 4) * 0.2})`,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full fill-yellow-300">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>

            <div
              className="absolute -top-6 -right-6 w-4 h-4 opacity-50"
              style={{
                transform: `rotate(${-time * 80}deg) scale(${1 + Math.cos(time * 3) * 0.3})`,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full fill-green-300">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>

            <span className="inline-block animate-letter-bounce-1 w-[150px] mr-2"><img src="/images/ourtalah.png" alt="" /></span>
            <span className="inline-block animate-letter-bounce-2 font-modak">u</span>
            <span className="inline-block animate-letter-bounce-3 font-modak">r</span>
            <span className="inline-block animate-letter-bounce-4 font-modak">t</span>
            <span className="inline-block animate-letter-bounce-5 font-modak">a</span>
            <span className="inline-block animate-letter-bounce-6 font-modak">l</span>
            <span className="inline-block animate-letter-bounce-7 font-modak">a</span>
            <span
              className="text-5xl md:text-7xl align-top inline-block"
              style={{
                transform: `rotate(${time * 60}deg) scale(${1 + Math.sin(time * 4) * 0.2})`,
                color: "#fbbf24",
                textShadow: `0 0 20px rgba(251, 191, 36, 0.8)`,
              }}
            >
              *
            </span>

            {/* Additional decorative elements */}
            <div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-2 opacity-40"
              style={{
                background: `linear-gradient(${time * 90}deg, #22c55e, #fbbf24, #22c55e)`,
                borderRadius: "4px",
                transform: `translateX(-50%) scaleX(${1 + Math.sin(time * 3) * 0.3})`,
              }}
            />
          </div>
        </h1>

        {/* Enhanced subtitle with ornamental frame */}
        <div className="relative mb-8">
          <div
            className="absolute -top-2 -left-4 w-3 h-3 opacity-50"
            style={{
              transform: `rotate(${time * 45}deg)`,
            }}
          >
            <svg viewBox="0 0 12 12" className="w-full h-full fill-yellow-300">
              <polygon points="6,0 8,4 12,4 9,7 10,12 6,9 2,12 3,7 0,4 4,4" />
            </svg>
          </div>

          <div
            className="absolute -top-2 -right-4 w-3 h-3 opacity-50"
            style={{
              transform: `rotate(${-time * 45}deg)`,
            }}
          >
            <svg viewBox="0 0 12 12" className="w-full h-full fill-green-300">
              <polygon points="6,0 8,4 12,4 9,7 10,12 6,9 2,12 3,7 0,4 4,4" />
            </svg>
          </div>

          <p
            className="text-xl md:text-2xl animate-subtitle-slide tracking-widest relative"
            style={{
              textShadow: `0 0 15px rgba(255, 255, 255, 0.5)`,
            }}
          >
            gardens for everyone
          </p>

          <div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 opacity-60"
            style={{
              background: `linear-gradient(${time * 120}deg, #22c55e, #fbbf24, #22c55e)`,
              boxShadow: `0 0 10px rgba(34, 197, 94, 0.5)`,
            }}
          />
        </div>

        <p
          className="text-lg mb-12 opacity-90 animate-description-fade relative"
          style={{
            textShadow: `0 0 10px rgba(255, 255, 255, 0.3)`,
          }}
        >
          no yard doesn&apos;t have to mean no garden! let your flowers Ourtala*
        </p>

        {/* Enhanced buttons with ornamental effects */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-buttons-rise">
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="relative bg-white text-gray-800 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-110 hover:rotate-2 group overflow-hidden"
            style={{
              boxShadow: `0 4px 20px rgba(255, 255, 255, 0.3)`,
            }}
          >
            {/* Decorative elements on button */}
            <div
              className="absolute -top-1 -left-1 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: `rotate(${time * 90}deg)`,
              }}
            >
              <svg viewBox="0 0 8 8" className="w-full h-full fill-green-500">
                <circle cx="4" cy="4" r="4" />
              </svg>
            </div>

            <div
              className="absolute -bottom-1 -right-1 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: `rotate(${-time * 90}deg)`,
              }}
            >
              <svg viewBox="0 0 8 8" className="w-full h-full fill-yellow-500">
                <circle cx="4" cy="4" r="4" />
              </svg>
            </div>

            <span className="relative z-10">learn more</span>
          </button>

          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="relative bg-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-110 hover:-rotate-2 group overflow-hidden"
            style={{
              boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3)`,
            }}
          >
            {/* Decorative elements on button */}
            <div
              className="absolute -top-1 -right-1 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: `rotate(${time * 90}deg)`,
              }}
            >
              <svg viewBox="0 0 8 8" className="w-full h-full fill-green-400">
                <circle cx="4" cy="4" r="4" />
              </svg>
            </div>

            <div
              className="absolute -bottom-1 -left-1 w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: `rotate(${-time * 90}deg)`,
              }}
            >
              <svg viewBox="0 0 8 8" className="w-full h-full fill-yellow-400">
                <circle cx="4" cy="4" r="4" />
              </svg>
            </div>

            <span className="relative z-10">shop now</span>
          </button>
        </div>
      </div>

      {/* Enhanced scroll indicator with ornamental frame */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-scroll-indicator">
        <div className="relative">
          {/* Decorative frame around scroll indicator */}
          <div
            className="absolute -top-4 -left-4 w-3 h-3 opacity-40"
            style={{
              transform: `rotate(${time * 60}deg)`,
            }}
          >
            <svg viewBox="0 0 12 12" className="w-full h-full fill-white">
              <polygon points="6,0 8,4 12,4 9,7 10,12 6,9 2,12 3,7 0,4 4,4" />
            </svg>
          </div>

          <div
            className="absolute -top-4 -right-4 w-3 h-3 opacity-40"
            style={{
              transform: `rotate(${-time * 60}deg)`,
            }}
          >
            <svg viewBox="0 0 12 12" className="w-full h-full fill-white">
              <polygon points="6,0 8,4 12,4 9,7 10,12 6,9 2,12 3,7 0,4 4,4" />
            </svg>
          </div>

          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center animate-border-pulse">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll-dot"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes title-entrance {
          0% { transform: translateY(50px) scale(0.8); opacity: 0; }
          100% { transform: translateY(0px) scale(1); opacity: 1; }
        }
        
        @keyframes letter-bounce-1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes letter-bounce-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes letter-bounce-3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes letter-bounce-4 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes letter-bounce-5 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        
        @keyframes letter-bounce-6 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes letter-bounce-7 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        
        @keyframes subtitle-slide {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0px); opacity: 1; }
        }
        
        @keyframes description-fade {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0px); opacity: 0.9; }
        }
        
        @keyframes buttons-rise {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0px); opacity: 1; }
        }
        
        @keyframes scroll-indicator {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        
        @keyframes border-pulse {
          0%, 100% { border-color: rgba(255,255,255,1); }
          50% { border-color: rgba(255,255,255,0.5); }
        }
        
        @keyframes scroll-dot {
          0% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(15px); opacity: 0.3; }
          100% { transform: translateY(0px); opacity: 1; }
        }
        
        .animate-title-entrance { animation: title-entrance 1s ease-out 0.2s both; }
        .animate-letter-bounce-1 { animation: letter-bounce-1 2s ease-in-out infinite 0.1s; }
        .animate-letter-bounce-2 { animation: letter-bounce-2 2s ease-in-out infinite 0.2s; }
        .animate-letter-bounce-3 { animation: letter-bounce-3 2s ease-in-out infinite 0.3s; }
        .animate-letter-bounce-4 { animation: letter-bounce-4 2s ease-in-out infinite 0.4s; }
        .animate-letter-bounce-5 { animation: letter-bounce-5 2s ease-in-out infinite 0.5s; }
        .animate-letter-bounce-6 { animation: letter-bounce-6 2s ease-in-out infinite 0.6s; }
        .animate-letter-bounce-7 { animation: letter-bounce-7 2s ease-in-out infinite 0.7s; }
        .animate-subtitle-slide { animation: subtitle-slide 1s ease-out 0.8s both; }
        .animate-description-fade { animation: description-fade 1s ease-out 1.2s both; }
        .animate-buttons-rise { animation: buttons-rise 1s ease-out 1.6s both; }
        .animate-scroll-indicator { animation: scroll-indicator 2s ease-in-out infinite; }
        .animate-border-pulse { animation: border-pulse 2s ease-in-out infinite; }
        .animate-scroll-dot { animation: scroll-dot 2s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
