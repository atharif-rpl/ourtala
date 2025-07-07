"use client"

import { useEffect, useState } from "react"

export default function AnimatedAbout() {
  const [time, setTime] = useState(0)
  const [showMore, setShowMore] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ]

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

    return () => {
      clearInterval(interval)
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
      className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-200/15 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300/15 rounded-full blur-lg"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-white/80 backdrop-blur-sm text-amber-800 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase border border-amber-200 shadow-sm">
              About Us
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            About Our
            <span className="text-amber-600"> Tala</span>
            <span
              className="text-3xl md:text-5xl align-top"
              style={{
                color: "#d4af37",
                textShadow: `0 0 10px rgba(212, 175, 55, 0.5)`,
              }}
            >
              *
            </span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            {/* Community Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="bg-amber-600 w-3 h-8 rounded-full mr-4"></div>
                <h3 className="text-2xl font-bold text-gray-800">Our Community</h3>
              </div>
              <div className="text-gray-600 leading-relaxed">
                <p className="mb-4">
                  Komunitas kami terdiri dari para pecinta tanaman, aktivis lingkungan, dan individu yang peduli
                  terhadap masa depan planet ini. Bersama-sama, kami berbagi pengetahuan, pengalaman, dan solusi
                  inovatif untuk menciptakan gaya hidup yang lebih berkelanjutan.
                </p>
                {showMore && (
                  <div className="space-y-4">
                    <p>
                      Melalui berbagai program dan kegiatan, kami mengajak masyarakat untuk memulai perubahan kecil yang
                      berdampak besar. Dari berkebun di ruang terbatas hingga mengurangi jejak karbon, setiap langkah
                      kecil memiliki arti penting.
                    </p>
                    <p>
                      Bergabunglah dengan kami dalam misi menciptakan dunia yang lebih hijau dan berkelanjutan untuk
                      generasi mendatang.
                    </p>
                  </div>
                )}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-4 text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200 flex items-center"
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

            {/* Vision Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="bg-amber-600 w-3 h-8 rounded-full mr-4"></div>
                <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Menciptakan dunia di mana setiap orang memiliki akses ke ruang hijau dan dapat berkontribusi dalam
                menjaga kelestarian lingkungan melalui praktik berkebun yang berkelanjutan dan ramah lingkungan.
              </p>
            </div>

            {/* Mission Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-amber-100 shadow-sm">
              <div className="flex items-center mb-6">
                <div className="bg-amber-600 w-3 h-8 rounded-full mr-4"></div>
                <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <div className="space-y-3 text-gray-600 leading-relaxed">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Menyediakan solusi berkebun untuk ruang terbatas dan urban living</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Mengedukasi masyarakat tentang pentingnya gaya hidup berkelanjutan</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Membangun komunitas yang peduli lingkungan dan saling mendukung</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Mengembangkan inovasi dalam bidang pertanian urban dan teknologi hijau</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image Carousel */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Our Community Gallery</h3>

              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                  {images.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <img
                        src={image || "/placeholder.svg?height=256&width=400"}
                        alt={`Community ${index + 1}`}
                        className="w-full h-64 object-cover"
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
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImage ? "bg-amber-600 w-6" : "bg-white/60 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Image Counter */}
              <div className="text-center mt-4 text-sm text-gray-500">
                {currentImage + 1} / {images.length}
              </div>

              {/* Carousel Description */}
              <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                <p className="text-sm text-amber-800 text-center">
                  Lihat aktivitas dan kegiatan komunitas OurTala dalam mewujudkan lingkungan yang lebih hijau dan
                  berkelanjutan.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl text-center border border-amber-100 shadow-sm">
                <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Community Members</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl text-center border border-amber-100 shadow-sm">
                <div className="text-3xl font-bold text-amber-600 mb-2">50+</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
