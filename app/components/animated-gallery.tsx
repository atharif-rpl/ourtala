"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
// Removed: import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  description: string
}

export default function AnimatedGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [isVisible, setIsVisible] = useState(false) // For section animation
  const sectionRef = useRef<HTMLElement>(null)

  const categories = ["all", "gardens", "community", "workshops", "events"]

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Urban Rooftop Garden",
      category: "gardens",
      image: "/images/galeryabout.jpeg",
      description:
        "A thriving rooftop garden in the heart of the city, providing fresh produce and green space for urban residents. It's a testament to sustainable living in metropolitan areas.",
    },
    {
      id: 2,
      title: "Community Workshop",
      category: "workshops",
      image: "/images/galeryabout3.jpeg",
      description:
        "Teaching sustainable gardening techniques to community members of all ages. These workshops foster knowledge sharing and hands-on experience for a greener future.",
    },
    {
      id: 3,
      title: "Harvest Festival",
      category: "events",
      image: "/images/galeryabout5.jpeg",
      description:
        "Annual celebration of our community's gardening achievements and sustainable practices. A joyous occasion bringing people together to appreciate nature's bounty.",
    },
    {
      id: 4,
      title: "School Garden Project",
      category: "gardens",
      image: "/images/galery11.jpg",
      description:
        "Students learning about nutrition and sustainability through hands-on gardening experience. This program instills environmental values from a young age.",
    },
    {
      id: 5,
      title: "Volunteer Day",
      category: "community",
      image: "/images/galery22.jpg",
      description:
        "Community members coming together to maintain and expand our urban gardens. Their dedication ensures the continuous growth and beauty of our green spaces.",
    },
    {
      id: 6,
      title: "Composting Workshop",
      category: "workshops",
      image: "/images/galery33.jpg",
      description:
        "Learning how to turn kitchen scraps into nutrient-rich soil for our gardens. A practical approach to waste reduction and soil enrichment.",
    },
    {
      id: 7,
      title: "Vertical Garden Installation",
      category: "gardens",
      image: "/images/galery44.jpg",
      description:
        "Innovative vertical growing systems maximizing space in urban environments. These installations are perfect for small balconies and limited areas.",
    },
    {
      id: 8,
      title: "Earth Day Celebration",
      category: "events",
      image: "/images/galery55.jpg",
      description:
        "Community gathering to celebrate environmental awareness and sustainable living. A day dedicated to appreciating our planet and committing to its protection.",
    },
    {
      id: 9,
      title: "Neighborhood Cleanup",
      category: "community",
      image: "/images/galery66.jpg",
      description:
        "Working together to beautify our neighborhoods and create space for new gardens. A collective effort to foster cleaner and greener living spaces.",
    },
  ]

  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredItems.length)
  }, [filteredItems.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + filteredItems.length) % filteredItems.length)
  }, [filteredItems.length])

  const nextModalImage = useCallback(() => {
    if (selectedImage) {
      const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id)
      const nextIndex = (currentIndex + 1) % filteredItems.length
      setSelectedImage(filteredItems[nextIndex])
    }
  }, [selectedImage, filteredItems])

  const prevModalImage = useCallback(() => {
    if (selectedImage) {
      const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id)
      const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
      setSelectedImage(filteredItems[prevIndex])
    }
  }, [selectedImage, filteredItems])

  useEffect(() => {
    // Auto-slide carousel
    const interval = setInterval(() => {
      if (filteredItems.length > 0) {
        nextImage()
      }
    }, 5000) // Change image every 5 seconds

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [filteredItems.length, nextImage])

  useEffect(() => {
    // Reset currentImageIndex when category changes
    setCurrentImageIndex(0)
  }, [selectedCategory])

  const currentCarouselItem = filteredItems[currentImageIndex]

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-50 relative overflow-hidden"
    >
      {/* Background decorations - Aligned with Hero, About, Team */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-teal-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-lime-300/15 rounded-full blur-lg animate-pulse delay-2000"></div>
        {/* Additional subtle shapes */}
        <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-lime-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-teal-100/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Aligned with Hero, About, Team */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-block mb-4">
            <span className="bg-white/80 backdrop-blur-sm text-emerald-800 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase border border-emerald-200 shadow-sm">
              Our Gallery
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Stories in
            <span className="bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600 bg-clip-text text-transparent">
              Pictures
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the journey of our community as we transform spaces, educate minds, and grow together towards a
            sustainable future.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize shadow-sm ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white shadow-lg transform scale-105"
                  : "bg-white/70 backdrop-blur-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-emerald-100"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* New Grid container for Carousel and Mascot */}
        <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-center max-w-6xl mx-auto">
          {/* Mascot Explainer (New) - in auto column of the grid */}
          <div
            className={`hidden lg:block transition-all duration-1000 delay-500 mr-[-80px] z-20`} // Added mr-[-80px] and z-index
          >
            <Image
              id="mascot-explainer-gallery"
              src="/images/mascotpohon.png" // Menggunakan mascotpot.png sebagai placeholder
              alt="Mascot explaining gallery"
              width={180}
              height={180}
              className="object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Main Carousel Display (now takes 1fr) */}
          {filteredItems.length > 0 ? (
            <div
              className={`relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-8 shadow-2xl border border-emerald-100 w-full transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ zIndex: 10 }} // Ensure carousel is behind mascot
            >
              <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden rounded-2xl">
                <Image
                  key={currentCarouselItem.id} // Key for re-render and transition
                  src={currentCarouselItem.image || "/placeholder.svg"}
                  alt={currentCarouselItem.title}
                  fill
                  className="object-cover transition-opacity duration-700 ease-in-out animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                {/* Navigation Buttons (Text instead of Icons) */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-white transition-all duration-200 hover:scale-105 font-semibold"
                  aria-label="Previous image"
                >
                  Prev
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-white transition-all duration-200 hover:scale-105 font-semibold"
                  aria-label="Next image"
                >
                  Next
                </button>

                {/* Image Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="bg-emerald-600 px-4 py-1.5 rounded-full text-sm font-medium capitalize mb-3 inline-block shadow-md">
                    {currentCarouselItem.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">{currentCarouselItem.title}</h3>
                  <p className="text-white/90 text-base md:text-lg mb-4 line-clamp-2">
                    {currentCarouselItem.description}
                  </p>
                  <button
                    onClick={() => setSelectedImage(currentCarouselItem)}
                    className="inline-flex items-center text-emerald-200 hover:text-white font-semibold transition-colors group"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-6">
                {filteredItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "bg-emerald-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 text-lg py-10 w-full">No images found for this category.</div>
          )}
        </div>

        {/* Call to Action (Optional, if still needed after carousel focus) */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-emerald-100 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Want to See More?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore our full collection of moments and discover the beauty of our community's journey.
            </p>
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md">
              Browse All Images
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Aesthetic Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 md:h-[550px]">
              <Image
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

              {/* Close Button (Text instead of Icon) */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full hover:scale-105 transition-all duration-200 shadow-xl z-10 backdrop-blur-sm font-semibold"
                aria-label="Close image viewer"
              >
                Close
              </button>

              {/* Modal Navigation Buttons (Text instead of Icons) */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full shadow-xl z-10 backdrop-blur-sm hover:scale-105 transition-all duration-200 font-semibold"
                    aria-label="Previous image in modal"
                  >
                    Prev
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full shadow-xl z-10 backdrop-blur-sm hover:scale-105 transition-all duration-200 font-semibold"
                    aria-label="Next image in modal"
                  >
                    Next
                  </button>
                </>
              )}

              {/* Modal Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="bg-emerald-600 px-4 py-2 rounded-full text-sm font-bold capitalize mb-4 inline-block shadow-lg">
                  {selectedImage.category}
                </span>
                <h3 className="text-3xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-white/80 text-sm">{selectedImage.description}</p>
              </div>
            </div>

            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-4">
                <span className="text-white text-2xl font-bold">🌱</span> {/* Simple text icon */}
              </div>
              <p className="text-gray-600 text-lg font-light">Beautiful moments deserve to be cherished</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </section>
  )
}
