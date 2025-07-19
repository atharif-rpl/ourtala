"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface IntroAnimationProps {
  onAnimationComplete: () => void
}

export default function IntroAnimation({ onAnimationComplete }: IntroAnimationProps) {
  const [animationStep, setAnimationStep] = useState("start")
  const [showShockwave, setShowShockwave] = useState(false)

  useEffect(() => {
    // Urutan animasi yang lebih "gila"
    const timer1 = setTimeout(() => setAnimationStep("slam"), 100) // 1. Logo jatuh & memantul
    const timer2 = setTimeout(() => {
      setAnimationStep("vibrate") // 2. Logo bergetar...
      setShowShockwave(true) // ...dan memicu efek shockwave!
    }, 1300)
    const timer3 = setTimeout(() => setAnimationStep("burst"), 2800) // 3. Logo meledak keluar
    const timer4 = setTimeout(onAnimationComplete, 3500) // Selesaikan animasi

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onAnimationComplete])

  const getLogoAnimationClass = () => {
    switch (animationStep) {
      case "slam":
        return "animate-intro-slam"
      case "vibrate":
        return "animate-intro-vibrate"
      case "burst":
        return "animate-intro-burst"
      default:
        return "opacity-0" // Sembunyikan di awal
    }
  }

  const getBgElementClass = (initialDelay: number) => {
    if (animationStep === "slam") {
      return `animate-bg-burst-anim` // Meledak masuk bersamaan dengan logo slam
    } else if (animationStep === "vibrate") {
      return `animate-bg-float-anim` // Mengambang saat bergetar
    } else if (animationStep === "burst") {
      return `animate-bg-exit-anim` // Keluar bersamaan dengan logo burst
    }
    return "opacity-0" // Sembunyikan di awal
  }

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-emerald-50 to-lime-50 z-50 transition-all duration-700 ease-in-out ${
        animationStep === "burst" ? "animate-bg-exit-anim" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Efek Shockwave saat logo mendarat */}
        {showShockwave && (
          <div className="absolute w-1 h-1 bg-transparent rounded-full animate-shockwave-anim" style={{ zIndex: 55 }} />
        )}

        {/* Elemen latar belakang yang meledak dan mengambang */}
        <div
          className={`absolute w-24 h-24 bg-emerald-300/70 rounded-full blur-xl ${getBgElementClass(0.1)}`}
          style={{ top: "10%", left: "15%", animationDelay: "0.1s" }}
        ></div>
        <div
          className={`absolute w-32 h-32 bg-teal-300/60 rounded-full blur-2xl ${getBgElementClass(0.2)}`}
          style={{ bottom: "20%", right: "10%", animationDelay: "0.2s" }}
        ></div>
        <div
          className={`absolute w-20 h-20 bg-lime-300/80 rounded-full blur-lg ${getBgElementClass(0.3)}`}
          style={{ top: "40%", right: "25%", animationDelay: "0.3s" }}
        ></div>
        <div
          className={`absolute w-28 h-28 bg-emerald-200/50 rounded-full blur-xl ${getBgElementClass(0.4)}`}
          style={{ bottom: "10%", left: "30%", animationDelay: "0.4s" }}
        ></div>

        {/* Partikel yang meledak saat logo keluar */}
        {animationStep === "burst" &&
          Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30 // 360 / 12 = 30 derajat per partikel
            const distance = 150 // Seberapa jauh partikel menyebar
            const endX = Math.cos((angle * Math.PI) / 180) * distance
            const endY = Math.sin((angle * Math.PI) / 180) * distance
            return (
              <div
                key={i}
                className="absolute w-3 h-3 bg-amber-400 rounded-full animate-particle-burst-anim"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%)`, // Posisikan partikel di tengah awalnya
                  "--tw-particle-end-x": `${endX}px`, // Variabel CSS untuk tujuan X
                  "--tw-particle-end-y": `${endY}px`, // Variabel CSS untuk tujuan Y
                  animationDelay: `${Math.random() * 0.1}s`,
                  zIndex: 54,
                }}
              />
            )
          })}

        <div className="relative z-50">
          <div className={getLogoAnimationClass()}>
            <Image
              src="/images/OURTALA.png"
              alt="Ourtala Logo"
              width={208}
              height={208}
              className="object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
