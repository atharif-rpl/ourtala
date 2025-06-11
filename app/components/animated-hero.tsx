"use client"

import { useEffect, useState } from "react"

export default function AnimatedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced animated background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500"><rect fill="%234ade80" width="1000" height="500"/><circle fill="%2365a30d" cx="100" cy="100" r="20"/><circle fill="%2365a30d" cx="300" cy="150" r="15"/><circle fill="%2365a30d" cx="500" cy="80" r="25"/><circle fill="%2365a30d" cx="700" cy="200" r="18"/><circle fill="%2365a30d" cx="900" cy="120" r="22"/></svg>\')',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) scale(1.05)`,
        }}
      ></div>

      {/* Floating garden elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated leaves */}
        <div className="absolute top-10 left-10 w-8 h-8 opacity-30">
          <div className="w-full h-full bg-green-300 rounded-full animate-spin-slow transform rotate-45"></div>
        </div>
        <div className="absolute top-20 right-20 w-6 h-6 opacity-40">
          <div className="w-full h-full bg-green-400 rounded-full animate-bounce-slow transform -rotate-12"></div>
        </div>
        <div className="absolute bottom-20 left-20 w-10 h-10 opacity-25">
          <div className="w-full h-full bg-green-200 rounded-full animate-pulse-slow transform rotate-90"></div>
        </div>

        {/* Enhanced floating dots with complex animations */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-200 rounded-full animate-float-1"></div>
        <div className="absolute top-32 right-32 w-3 h-3 bg-yellow-300 rounded-full animate-float-2"></div>
        <div className="absolute top-40 left-1/3 w-5 h-5 bg-yellow-200 rounded-full animate-float-3"></div>
        <div className="absolute bottom-32 right-20 w-4 h-4 bg-yellow-400 rounded-full animate-float-4"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-yellow-200 rounded-full animate-float-5"></div>

        {/* Additional floating elements */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-white rounded-full animate-twinkle-1"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-white rounded-full animate-twinkle-2"></div>
        <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-green-300 rounded-full animate-orbit-1"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-orbit-2"></div>
      </div>

      {/* Main content with enhanced animations */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-9xl font-bold mb-6 animate-title-entrance">
          <span className="inline-block animate-letter-bounce-1 font-modak stroke-3">O</span>
          <span className="inline-block animate-letter-bounce-2 font-modak">u</span>
          <span className="inline-block animate-letter-bounce-3 font-modak">r</span>
          <span className="inline-block animate-letter-bounce-4 font-modak">t</span>
          <span className="inline-block animate-letter-bounce-5 font-modak">a</span>
          <span className="inline-block animate-letter-bounce-6 font-modak">l</span>
          <span className="inline-block animate-letter-bounce-7 font-modak">a</span>
          <span className="text-5xl md:text-7xl align-top animate-asterisk-spin">*</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-subtitle-slide tracking-widest">gardens for everyone</p>
        <p className="text-lg mb-12 opacity-90 animate-description-fade">
          no yard doesn&apos;t have to mean no garden! let your flowers Ourtala*
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-buttons-rise">
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 hover:rotate-2 animate-button-glow-1"
          >
            learn more
          </button>
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:-rotate-2 animate-button-glow-2"
          >
            shop now
          </button>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-scroll-indicator">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center animate-border-pulse">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll-dot"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(90deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
          75% { transform: translateY(-30px) rotate(270deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateX(0px) scale(1); }
          33% { transform: translateX(15px) scale(1.2); }
          66% { transform: translateX(-10px) scale(0.8); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(10px, -15px) rotate(45deg); }
          50% { transform: translate(-5px, -25px) rotate(90deg); }
          75% { transform: translate(-15px, -10px) rotate(135deg); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-40px) scale(1.5); }
        }
        
        @keyframes float-5 {
          0%, 100% { transform: rotate(0deg) translateX(0px); }
          25% { transform: rotate(90deg) translateX(20px); }
          50% { transform: rotate(180deg) translateX(0px); }
          75% { transform: rotate(270deg) translateX(-20px); }
        }
        
        @keyframes twinkle-1 {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes twinkle-2 {
          0%, 100% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 0.2; transform: scale(1.3); }
        }
        
        @keyframes orbit-1 {
          0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }
        
        @keyframes orbit-2 {
          0% { transform: rotate(0deg) translateX(25px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(25px) rotate(360deg); }
        }
        
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
        
        @keyframes asterisk-spin {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.1); }
          50% { transform: rotate(180deg) scale(0.9); }
          75% { transform: rotate(270deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
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
        
        @keyframes button-glow-1 {
          0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4); }
        }
        
        @keyframes button-glow-2 {
          0%, 100% { box-shadow: 0 0 5px rgba(0,0,0,0.3); }
          50% { box-shadow: 0 0 20px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.4); }
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
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .animate-float-1 { animation: float-1 4s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 3s ease-in-out infinite 0.5s; }
        .animate-float-3 { animation: float-3 5s ease-in-out infinite 1s; }
        .animate-float-4 { animation: float-4 3.5s ease-in-out infinite 1.5s; }
        .animate-float-5 { animation: float-5 6s linear infinite 2s; }
        .animate-twinkle-1 { animation: twinkle-1 2s ease-in-out infinite; }
        .animate-twinkle-2 { animation: twinkle-2 2.5s ease-in-out infinite 0.7s; }
        .animate-orbit-1 { animation: orbit-1 8s linear infinite; }
        .animate-orbit-2 { animation: orbit-2 10s linear infinite reverse; }
        .animate-title-entrance { animation: title-entrance 1s ease-out 0.2s both; }
        .animate-letter-bounce-1 { animation: letter-bounce-1 2s ease-in-out infinite 0.1s; }
        .animate-letter-bounce-2 { animation: letter-bounce-2 2s ease-in-out infinite 0.2s; }
        .animate-letter-bounce-3 { animation: letter-bounce-3 2s ease-in-out infinite 0.3s; }
        .animate-letter-bounce-4 { animation: letter-bounce-4 2s ease-in-out infinite 0.4s; }
        .animate-letter-bounce-5 { animation: letter-bounce-5 2s ease-in-out infinite 0.5s; }
        .animate-letter-bounce-6 { animation: letter-bounce-6 2s ease-in-out infinite 0.6s; }
        .animate-letter-bounce-7 { animation: letter-bounce-7 2s ease-in-out infinite 0.7s; }
        .animate-asterisk-spin { animation: asterisk-spin 4s ease-in-out infinite 0.8s; }
        .animate-subtitle-slide { animation: subtitle-slide 1s ease-out 0.8s both; }
        .animate-description-fade { animation: description-fade 1s ease-out 1.2s both; }
        .animate-buttons-rise { animation: buttons-rise 1s ease-out 1.6s both; }
        .animate-button-glow-1 { animation: button-glow-1 3s ease-in-out infinite; }
        .animate-button-glow-2 { animation: button-glow-2 3s ease-in-out infinite 0.5s; }
        .animate-scroll-indicator { animation: scroll-indicator 2s ease-in-out infinite; }
        .animate-border-pulse { animation: border-pulse 2s ease-in-out infinite; }
        .animate-scroll-dot { animation: scroll-dot 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </section>
  )
}
