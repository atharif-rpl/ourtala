"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image" // Pastikan Image component diimpor

export default function AnimatedAbout() {
  const [time, setTime] = useState(0)
  const [showMore, setShowMore] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const aboutRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false) // Untuk animasi saat masuk viewport

  const images = ["/images/galery1.jpg", "/images/galery2.jpg", "/images/galery3.jpg", "/images/galery4.jpg"]

  useEffect(() => {
    const animationFrame = () => {
      setTime(Date.now() * 0.001)
      requestAnimationFrame(animationFrame)
    }
    requestAnimationFrame(animationFrame)

    // Auto-slide carousel
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)

    // Intersection Observer for section visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing once visible
        }
      },
      { threshold: 0.1 },
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [images.length])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-20 bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-50 relative overflow-hidden"
    >
      {/* Background decorations - Aligned with Hero */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-teal-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-lime-300/15 rounded-full blur-lg animate-pulse delay-2000"></div>
        {/* Additional subtle shapes */}
        <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-lime-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-teal-100/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Aligned with Hero */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-block mb-4">
            <span className="bg-white/80 backdrop-blur-sm text-emerald-800 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase border border-emerald-200 shadow-sm">
              About Us
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            About Our
            <span className="text-emerald-600"> Tala</span>
            <span
              className="text-3xl md:text-5xl align-top"
              style={{
                color: "#8BC34A", // Warna hijau terang untuk bintang
                textShadow: `0 0 10px rgba(139, 195, 74, 0.5)`,
              }}
            >
              *
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Mewujudkan masa depan yang lebih hijau melalui inovasi dan komunitas.
          </p>
        </div>

        {/* Main Content Grid - Lebih Padat & Menarik */}
        <div className="grid lg:grid-cols-3 gap-12 items-start relative">
          {/* Mascot Explainer 1 (Left of Text Content) */}
          <div className={`absolute -left-20 top-1/4 hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`} style={{ zIndex: 20 }} >
            <Image
              id="mascot-explainer-1"
              src="/images/mascotbunga.png" // Ganti dengan foto maskot Anda
              alt="Mascot explaining community"
              width={120}
              height={120}
              className="object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Left Side - Text Content (Column 1 & 2 on large screens) */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Community Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-600 w-3 h-8 rounded-full mr-4"></div>
                <h3 className="text-2xl font-bold text-gray-800">Our Community</h3>
              </div>
              <div className="text-gray-600 leading-relaxed">
                <p className="mb-4">
                  Ourtala is a youth community that is dedicated to protecting our planet for future generations by
                  raising awareness and empowering youth to take action on environmental issues.
                </p>
                {showMore && (
                  <div className="space-y-4">
                    <p>
                      The word "Bentala" is derived from Javanese, an indigenous language spoken in Indonesia. In
                      Javanese, bentala refers to the Earth or the land. So, Ourtala combines "Our" (signifying
                      collective ownership) and "Bentala" (meaning Earth),
                    </p>
                    <p>symbolizing a shared responsibility for protecting the planet.</p>
                  </div>
                )}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 flex items-center"
                >
                  {showMore ? (
                    <>
                      Show Less
                      <svg
                        className="w-4 h-4 ml-1 transform rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Show More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Vision & Mission Section - Dibuat lebih ringkas dalam satu baris */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="bg-emerald-600 w-3 h-8 rounded-full mr-4"></div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Menciptakan dunia di mana setiap orang memiliki akses ke ruang hijau dan dapat berkontribusi dalam
                  menjaga kelestarian lingkungan.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="bg-emerald-600 w-3 h-8 rounded-full mr-4"></div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Menyediakan solusi berkebun untuk ruang terbatas dan urban living</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Mengedukasi masyarakat tentang pentingnya gaya hidup berkelanjutan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image Carousel & Stats (Column 3 on large screens) */}
          <div
            className={`lg:sticky lg:top-8 space-y-6 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Our Community Gallery</h3>
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                  {images.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <Image
                        src={image || "/placeholder.svg?height=256&width=400"}
                        alt={`Community ${index + 1}`}
                        width={400}
                        height={256}
                        className="w-full h-64 object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentImage ? "bg-emerald-600 w-6" : "bg-white/60 hover:bg-white/80"}`}
                    />
                  ))}
                </div>
              </div>
              {/* Image Counter & Description - Lebih ringkas */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500 mb-2">
                  {currentImage + 1} / {images.length}
                </p>
                <p className="text-sm text-emerald-800">
                  Lihat aktivitas dan kegiatan komunitas OurTala dalam mewujudkan lingkungan yang lebih hijau.
                </p>
              </div>
            </div>

            {/* Stats - Dibuat lebih menonjol */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-100/80 to-lime-100/80 backdrop-blur-sm p-6 rounded-2xl text-center border border-emerald-200 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-emerald-700 mb-2">500+</div>
                <div className="text-sm font-medium text-gray-700 uppercase tracking-wide">Community Members</div>
              </div>
              <div className="bg-gradient-to-br from-teal-100/80 to-emerald-100/80 backdrop-blur-sm p-6 rounded-2xl text-center border border-teal-200 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-teal-700 mb-2">50+</div>
                <div className="text-sm font-medium text-gray-700 uppercase tracking-wide">Projects Completed</div>
              </div>
            </div>
          </div>

          {/* Mascot Explainer 2 (Right of Carousel/Stats) */}
          <div className={`absolute -right-20 bottom-1/4 hidden lg:block transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`} style={{ zIndex: 20 }} >
            <Image
              id="mascot-explainer-2"
              src="/images/mascotpot.png" // Ganti dengan foto maskot Anda
              alt="Mascot explaining projects"
              width={150}
              height={150}
              className="object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
