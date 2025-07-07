"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  description: string
}

export default function AnimatedGallery() {
  const [time, setTime] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const categories = ["all", "gardens", "community", "workshops", "events"]

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Urban Rooftop Garden",
      category: "gardens",
      image: "/placeholder.svg?height=400&width=600",
      description: "A thriving rooftop garden in the heart of the city, providing fresh produce and green space.",
    },
    {
      id: 2,
      title: "Community Workshop",
      category: "workshops",
      image: "/placeholder.svg?height=400&width=600",
      description: "Teaching sustainable gardening techniques to community members of all ages.",
    },
    {
      id: 3,
      title: "Harvest Festival",
      category: "events",
      image: "/placeholder.svg?height=400&width=600",
      description: "Annual celebration of our community's gardening achievements and sustainable practices.",
    },
    {
      id: 4,
      title: "School Garden Project",
      category: "gardens",
      image: "/placeholder.svg?height=400&width=600",
      description: "Students learning about nutrition and sustainability through hands-on gardening experience.",
    },
    {
      id: 5,
      title: "Volunteer Day",
      category: "community",
      image: "/placeholder.svg?height=400&width=600",
      description: "Community members coming together to maintain and expand our urban gardens.",
    },
    {
      id: 6,
      title: "Composting Workshop",
      category: "workshops",
      image: "/placeholder.svg?height=400&width=600",
      description: "Learning how to turn kitchen scraps into nutrient-rich soil for our gardens.",
    },
    {
      id: 7,
      title: "Vertical Garden Installation",
      category: "gardens",
      image: "/placeholder.svg?height=400&width=600",
      description: "Innovative vertical growing systems maximizing space in urban environments.",
    },
    {
      id: 8,
      title: "Earth Day Celebration",
      category: "events",
      image: "/placeholder.svg?height=400&width=600",
      description: "Community gathering to celebrate environmental awareness and sustainable living.",
    },
    {
      id: 9,
      title: "Neighborhood Cleanup",
      category: "community",
      image: "/placeholder.svg?height=400&width=600",
      description: "Working together to beautify our neighborhoods and create space for new gardens.",
    },
  ]

  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  useEffect(() => {
    const animationFrame = () => {
      setTime(Date.now() * 0.001)
      requestAnimationFrame(animationFrame)
    }
    requestAnimationFrame(animationFrame)
  }, [])

  return (
    <section id="gallery" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-amber-100/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-100/20 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-amber-100 text-amber-800 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase">
              Our Gallery
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Stories in
            <span className="text-amber-600"> Pictures</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the journey of our community as we transform spaces, educate minds, and grow together towards a
            sustainable future.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize ${
                selectedCategory === category
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {item.category}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <h3 className="text-white font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      Click to view details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105">
            Load More Images
          </button>
        </div>
      </div>

      {/* Modal for Selected Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96 md:h-[500px]">
              <Image
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {selectedImage.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{selectedImage.title}</h3>
              <p className="text-gray-600 leading-relaxed">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}
