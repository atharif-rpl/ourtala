"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface IntroAnimationProps {
  onAnimationComplete: () => void
}

export default function IntroAnimation({ onAnimationComplete }: IntroAnimationProps) {
  const [animationStep, setAnimationStep] = useState("slam")

  useEffect(() => {
    const timer2 = setTimeout(() => setAnimationStep("vibrate"), 1200)
    const timer3 = setTimeout(() => setAnimationStep("burst"), 2800)
    const timer4 = setTimeout(onAnimationComplete, 3600)

    return () => {
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onAnimationComplete])

  const getBgAnimationClass = () => {
    switch (animationStep) {
      case "slam":
        return "animate-bg-burst-anim"
      case "vibrate":
        return "animate-bg-float-anim"
      default:
        return "opacity-0"
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-emerald-50 to-lime-50 z-50 transition-all duration-700 ease-in-out ${
        animationStep === "burst" ? "animate-bg-exit-anim" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Elemen latar belakang yang meledak dan mengambang */}
        <div
          className={`absolute w-24 h-24 bg-emerald-300/70 rounded-full blur-xl ${getBgAnimationClass()}`}
          style={{ top: "10%", left: "15%", animationDelay: "0.1s" }}
        ></div>
        <div
          className={`absolute w-32 h-32 bg-teal-300/60 rounded-full blur-2xl ${getBgAnimationClass()}`}
          style={{ bottom: "20%", right: "10%", animationDelay: "0.2s" }}
        ></div>
        <div
          className={`absolute w-20 h-20 bg-lime-300/80 rounded-full blur-lg ${getBgAnimationClass()}`}
          style={{ top: "40%", right: "25%", animationDelay: "0.3s" }}
        ></div>
        <div
          className={`absolute w-28 h-28 bg-emerald-200/50 rounded-full blur-xl ${getBgAnimationClass()}`}
          style={{ bottom: "10%", left: "30%", animationDelay: "0.4s" }}
        ></div>

        {/* Logo dengan animasi intro-slam yang diterapkan langsung */}
        <div className={`relative w-40 h-40 md:w-52 md:h-52 z-10 animate-intro-slam`}>
          <Image src="/images/OURTALA.png" alt="Ourtala Logo" fill className="object-contain drop-shadow-2xl" />
        </div>
      </div>
    </div>
  )
}
