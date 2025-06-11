"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const galleryImages = [
  "/placeholder.svg?height=500&width=800",
  "/placeholder.svg?height=500&width=800",
  "/placeholder.svg?height=500&width=800",
  "/placeholder.svg?height=500&width=800",
  "/placeholder.svg?height=500&width=800",
]

export default function AnimatedGallery() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById("gallery")?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    const galleryElement = document.getElementById("gallery")
    galleryElement?.addEventListener("mousemove", handleMouseMove)
    return () => galleryElement?.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <section
      id="gallery"
      className="py-20 bg-amber-50 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating garden elements */}
        <div className="absolute top-10 left-10 w-16 h-16 opacity-20">
          <div className="w-full h-full bg-green-400 rounded-full animate-float-leaf-1 transform rotate-45"></div>
        </div>
        <div className="absolute top-20 right-20 w-12 h-12 opacity-30">
          <div className="w-full h-full bg-yellow-400 rounded-full animate-float-flower-1"></div>
        </div>
        <div className="absolute bottom-20 left-20 w-20 h-20 opacity-15">
          <div className="w-full h-full bg-green-300 rounded-full animate-float-leaf-2 transform -rotate-12"></div>
        </div>
        <div className="absolute bottom-10 right-10 w-14 h-14 opacity-25">
          <div className="w-full h-full bg-amber-400 rounded-full animate-float-flower-2"></div>
        </div>

        {/* Dynamic particles */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-particle-1"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-300 rounded-full animate-particle-2"></div>
        <div className="absolute top-2/3 left-1/6 w-4 h-4 bg-amber-300 rounded-full animate-particle-3"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-green-300 rounded-full animate-particle-4"></div>

        {/* Interactive light rays */}
        <div
          className="absolute w-1 h-32 bg-gradient-to-b from-yellow-200 to-transparent opacity-30 animate-light-ray-1"
          style={{
            left: `${mousePosition.x * 0.8}%`,
            top: `${mousePosition.y * 0.5}%`,
            transform: `rotate(${mousePosition.x * 0.5}deg)`,
          }}
        ></div>
        <div
          className="absolute w-1 h-24 bg-gradient-to-b from-amber-200 to-transparent opacity-40 animate-light-ray-2"
          style={{
            right: `${(100 - mousePosition.x) * 0.6}%`,
            bottom: `${(100 - mousePosition.y) * 0.4}%`,
            transform: `rotate(${-mousePosition.x * 0.3}deg)`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-title-wave">
            <span className="inline-block animate-letter-dance-1">G</span>
            <span className="inline-block animate-letter-dance-2">a</span>
            <span className="inline-block animate-letter-dance-3">r</span>
            <span className="inline-block animate-letter-dance-4">d</span>
            <span className="inline-block animate-letter-dance-5">e</span>
            <span className="inline-block animate-letter-dance-6">n</span>
            <span className="inline-block mx-4"></span>
            <span className="inline-block animate-letter-dance-7">G</span>
            <span className="inline-block animate-letter-dance-8">a</span>
            <span className="inline-block animate-letter-dance-9">l</span>
            <span className="inline-block animate-letter-dance-10">l</span>
            <span className="inline-block animate-letter-dance-11">e</span>
            <span className="inline-block animate-letter-dance-12">r</span>
            <span className="inline-block animate-letter-dance-13">y</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-subtitle-glow">
            Beautiful spaces created with our products and community projects
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Gallery container with 3D effects */}
          <div
            className="overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 animate-gallery-float"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1 - 5}deg) rotateY(${mousePosition.x * 0.1 - 5}deg) scale(${isHovered ? 1.05 : 1})`,
              boxShadow: isHovered ? "0 25px 50px rgba(0,0,0,0.3)" : "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <div
              className="flex transition-all duration-700 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                filter: isHovered ? "brightness(1.1) contrast(1.1)" : "brightness(1) contrast(1)",
              }}
            >
              {galleryImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    width={800}
                    height={500}
                    className="w-full h-96 object-cover transition-all duration-700"
                  />
                  {/* Image overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-shimmer"></div>
                  {currentSlide === index && <div className="absolute inset-0 animate-image-glow"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:-rotate-12 animate-arrow-float-left animate-arrow-glow z-10"
          >
            <svg className="w-6 h-6 animate-arrow-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-12 animate-arrow-float-right animate-arrow-glow z-10"
          >
            <svg className="w-6 h-6 animate-arrow-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Enhanced gallery navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-500 transform hover:scale-150 ${currentSlide === index
                  ? "bg-gray-800 animate-dot-active"
                  : "bg-gray-300 hover:bg-gray-500 animate-dot-inactive"
                  }`}
              >
                {currentSlide === index && (
                  <div className="absolute inset-0 rounded-full bg-gray-800 animate-dot-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Floating decorative elements around gallery */}
          <div className="absolute -top-8 -left-8 w-6 h-6 bg-yellow-300 rounded-full animate-orbit-gallery-1 opacity-60"></div>
          <div className="absolute -top-4 -right-12 w-4 h-4 bg-green-400 rounded-full animate-orbit-gallery-2 opacity-70"></div>
          <div className="absolute -bottom-6 -left-10 w-5 h-5 bg-amber-400 rounded-full animate-orbit-gallery-3 opacity-50"></div>
          <div className="absolute -bottom-8 -right-6 w-3 h-3 bg-green-300 rounded-full animate-orbit-gallery-4 opacity-80"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-leaf-1 {
          0%, 100% { transform: translateY(0px) rotate(45deg) scale(1); }
          25% { transform: translateY(-20px) rotate(90deg) scale(1.1); }
          50% { transform: translateY(-10px) rotate(135deg) scale(0.9); }
          75% { transform: translateY(-30px) rotate(180deg) scale(1.2); }
        }
        
        @keyframes float-flower-1 {
          0%, 100% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.3) rotate(120deg); }
          66% { transform: scale(0.8) rotate(240deg); }
        }
        
        @keyframes float-leaf-2 {
          0%, 100% { transform: translateX(0px) rotate(-12deg); }
          50% { transform: translateX(40px) rotate(12deg); }
        }
        
        @keyframes float-flower-2 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.4); }
        }
        
        @keyframes particle-1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.8; }
          25% { transform: translate(20px, -30px) scale(1.5); opacity: 0.4; }
          50% { transform: translate(-10px, -50px) scale(0.8); opacity: 1; }
          75% { transform: translate(-30px, -20px) scale(1.2); opacity: 0.6; }
        }
        
        @keyframes particle-2 {
          0%, 100% { transform: rotate(0deg) translateX(25px) scale(1); }
          50% { transform: rotate(180deg) translateX(35px) scale(1.8); }
        }
        
        @keyframes particle-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          33% { transform: translateY(-40px) rotate(120deg); opacity: 0.3; }
          66% { transform: translateY(-20px) rotate(240deg); opacity: 1; }
        }
        
        @keyframes particle-4 {
          0%, 100% { transform: scale(1) translateX(0px); }
          50% { transform: scale(2) translateX(-20px); }
        }
        
        @keyframes light-ray-1 {
          0%, 100% { opacity: 0.3; transform: scaleY(1) rotate(0deg); }
          50% { opacity: 0.7; transform: scaleY(1.5) rotate(10deg); }
        }
        
        @keyframes light-ray-2 {
          0%, 100% { opacity: 0.4; transform: scaleY(1) rotate(0deg); }
          50% { opacity: 0.8; transform: scaleY(1.3) rotate(-15deg); }
        }
        
        @keyframes letter-dance-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        
        @keyframes letter-dance-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-3deg); }
        }
        
        @keyframes letter-dance-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(7deg); }
        }
        
        @keyframes letter-dance-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        
        @keyframes letter-dance-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-9px) rotate(4deg); }
        }
        
        @keyframes letter-dance-6 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-11px) rotate(-6deg); }
        }
        
        @keyframes letter-dance-7 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(3deg); }
        }
        
        @keyframes letter-dance-8 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-13px) rotate(-4deg); }
        }
        
        @keyframes letter-dance-9 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(6deg); }
        }
        
        @keyframes letter-dance-10 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-1deg); }
        }
        
        @keyframes letter-dance-11 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        
        @keyframes letter-dance-12 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-7deg); }
        }
        
        @keyframes letter-dance-13 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-9px) rotate(2deg); }
        }
        
        @keyframes subtitle-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(0,0,0,0.1); }
          50% { text-shadow: 0 0 20px rgba(251,191,36,0.3), 0 0 30px rgba(251,191,36,0.2); }
        }
        
        @keyframes gallery-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes image-glow {
          0%, 100% { box-shadow: inset 0 0 20px rgba(251,191,36,0.2); }
          50% { box-shadow: inset 0 0 40px rgba(251,191,36,0.4); }
        }
        
        @keyframes dot-active {
          0%, 100% { transform: scale(1); box-shadow: 0 0 5px rgba(0,0,0,0.3); }
          50% { transform: scale(1.3); box-shadow: 0 0 15px rgba(0,0,0,0.5); }
        }
        
        @keyframes dot-inactive {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }
        
        @keyframes orbit-gallery-1 {
          0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }
        
        @keyframes orbit-gallery-2 {
          0% { transform: rotate(0deg) translateX(35px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(35px) rotate(360deg); }
        }
        
        @keyframes orbit-gallery-3 {
          0% { transform: rotate(0deg) translateX(45px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(45px) rotate(-360deg); }
        }
        
        @keyframes orbit-gallery-4 {
          0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(30px) rotate(360deg); }
        }

        @keyframes arrow-float-left {
          0%, 100% { transform: translateY(-50%) translateX(0px) scale(1); }
          50% { transform: translateY(-50%) translateX(-5px) scale(1.05); }
        }

        @keyframes arrow-float-right {
          0%, 100% { transform: translateY(-50%) translateX(0px) scale(1); }
          50% { transform: translateY(-50%) translateX(5px) scale(1.05); }
        }

        @keyframes arrow-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes arrow-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(251,191,36,0.3); }
          50% { box-shadow: 0 0 25px rgba(251,191,36,0.6), 0 0 35px rgba(251,191,36,0.4); }
        }
        
        .animate-float-leaf-1 { animation: float-leaf-1 6s ease-in-out infinite; }
        .animate-float-flower-1 { animation: float-flower-1 4s ease-in-out infinite 0.5s; }
        .animate-float-leaf-2 { animation: float-leaf-2 8s ease-in-out infinite 1s; }
        .animate-float-flower-2 { animation: float-flower-2 5s ease-in-out infinite 1.5s; }
        .animate-particle-1 { animation: particle-1 7s ease-in-out infinite; }
        .animate-particle-2 { animation: particle-2 5s linear infinite 0.8s; }
        .animate-particle-3 { animation: particle-3 6s ease-in-out infinite 1.2s; }
        .animate-particle-4 { animation: particle-4 4s ease-in-out infinite 2s; }
        .animate-light-ray-1 { animation: light-ray-1 3s ease-in-out infinite; }
        .animate-light-ray-2 { animation: light-ray-2 4s ease-in-out infinite 0.5s; }
        .animate-letter-dance-1 { animation: letter-dance-1 2s ease-in-out infinite 0.1s; }
        .animate-letter-dance-2 { animation: letter-dance-2 2s ease-in-out infinite 0.2s; }
        .animate-letter-dance-3 { animation: letter-dance-3 2s ease-in-out infinite 0.3s; }
        .animate-letter-dance-4 { animation: letter-dance-4 2s ease-in-out infinite 0.4s; }
        .animate-letter-dance-5 { animation: letter-dance-5 2s ease-in-out infinite 0.5s; }
        .animate-letter-dance-6 { animation: letter-dance-6 2s ease-in-out infinite 0.6s; }
        .animate-letter-dance-7 { animation: letter-dance-7 2s ease-in-out infinite 0.7s; }
        .animate-letter-dance-8 { animation: letter-dance-8 2s ease-in-out infinite 0.8s; }
        .animate-letter-dance-9 { animation: letter-dance-9 2s ease-in-out infinite 0.9s; }
        .animate-letter-dance-10 { animation: letter-dance-10 2s ease-in-out infinite 1s; }
        .animate-letter-dance-11 { animation: letter-dance-11 2s ease-in-out infinite 1.1s; }
        .animate-letter-dance-12 { animation: letter-dance-12 2s ease-in-out infinite 1.2s; }
        .animate-letter-dance-13 { animation: letter-dance-13 2s ease-in-out infinite 1.3s; }
        .animate-subtitle-glow { animation: subtitle-glow 4s ease-in-out infinite; }
        .animate-gallery-float { animation: gallery-float 4s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .animate-image-glow { animation: image-glow 2s ease-in-out infinite; }
        .animate-dot-active { animation: dot-active 1.5s ease-in-out infinite; }
        .animate-dot-inactive { animation: dot-inactive 2s ease-in-out infinite; }
        .animate-dot-pulse { animation: dot-pulse 1s ease-in-out infinite; }
        .animate-orbit-gallery-1 { animation: orbit-gallery-1 12s linear infinite; }
        .animate-orbit-gallery-2 { animation: orbit-gallery-2 15s linear infinite reverse; }
        .animate-orbit-gallery-3 { animation: orbit-gallery-3 10s linear infinite; }
        .animate-orbit-gallery-4 { animation: orbit-gallery-4 18s linear infinite reverse; }
        .animate-arrow-float-left { animation: arrow-float-left 2s ease-in-out infinite; }
        .animate-arrow-float-right { animation: arrow-float-right 2s ease-in-out infinite; }
        .animate-arrow-pulse { animation: arrow-pulse 1.5s ease-in-out infinite; }
        .animate-arrow-glow { animation: arrow-glow 3s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
