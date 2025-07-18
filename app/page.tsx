"use client"

import { useState, useEffect } from "react"
import IntroAnimation from "./components/IntroAnimation" // Impor komponen intro
import AnimatedHero from "./components/animated-hero"
import AnimatedGallery from "./components/animated-gallery"
import AnimatedTeamSection from "./components/animated-team"
import NavBar from "./components/navbar"
import AnimatedSocialSection from "./components/animated-social"
import AnimatedCharitySection from "./components/animated-charty"
import AnimatedAbout from "./components/animated-about"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  // Fungsi ini akan dipanggil saat animasi intro selesai
  const handleIntroAnimationComplete = () => {
    setShowIntro(false) // Setelah animasi intro selesai, sembunyikan intro
  }

  // Mencegah scroll saat intro ditampilkan
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    // Cleanup function untuk mengembalikan overflow saat komponen di-unmount
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showIntro])

  return (
    <main>
      {showIntro ? (
        // Jika showIntro true, hanya render IntroAnimation
        <IntroAnimation onAnimationComplete={handleIntroAnimationComplete} />
      ) : (
        // Jika showIntro false, render seluruh konten utama aplikasi
        <>
          <NavBar />
          <AnimatedHero />
          <AnimatedAbout />
          <AnimatedCharitySection />
          <AnimatedTeamSection />
          <AnimatedGallery />
          <AnimatedSocialSection />
          <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <div className="text-3xl font-bold mb-4">
                  Ourtala<span className="text-2xl align-top">*</span>
                </div>
                <p className="text-gray-400 mb-6">gardens for everyone</p>
                <div className="flex justify-center space-x-6 mb-8">
                  <button className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
                  <button className="text-gray-400 hover:text-white transition-colors">Terms of Service</button>
                  <button className="text-gray-400 hover:text-white transition-colors">FAQ</button>
                </div>
                <p className="text-gray-500">&copy; 2024 Ourtala. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </main>
  )
}
