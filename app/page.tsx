"use client"

import { useState } from "react"
import Image from "next/image"
import AnimatedHero from "./components/animated-hero"
import AnimatedGallery from "./components/animated-gallery"
import AnimatedTeamSection from "./components/animated-team"
import NavBar from "./components/navbar"
import AnimatedSocialSection from "./components/animated-social"
import AnimatedCharitySection from "./components/animated-charty"

interface CharityProject {
  id: number
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  image: string
  category: string
}

function ProductCard({
  product,
}: { product: { id: number; name: string; price: number; weight: string; image: string } }) {
  const [quantity, setQuantity] = useState(1)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg shadow-md mb-3 w-full">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={250}
          height={250}
          className="w-full h-auto"
        />
      </div>
      <div className="text-center mb-3">
        <p className="text-xs text-gray-500 uppercase">seed</p>
        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
      </div>
      <div className="flex flex-col items-center gap-2 w-full">
        <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-50">
          <span className="text-sm">↓</span>
          <span className="text-sm">{product.weight}</span>
          <span className="text-sm">${product.price}</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={decreaseQuantity}
            className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700"
          >
            -
          </button>
          <span className="text-sm mx-1 min-w-[20px] text-center">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-700"
          >
            +
          </button>
          <button className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm ml-2 hover:bg-gray-700">add</button>
        </div>
      </div>
    </div>
  )
}

function CharityCard({ project }: { project: CharityProject }) {
  const progress = (project.currentAmount / project.targetAmount) * 100

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">{project.category}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Raised</p>
            <p className="font-bold text-green-600">${project.currentAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Goal</p>
            <p className="font-bold text-gray-800">${project.targetAmount.toLocaleString()}</p>
          </div>
        </div>

        <button className="w-full bg-gray-800 text-white py-2 rounded-full font-medium hover:bg-gray-700 transition-all duration-300">
          Donate Now
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const products = [
    {
      id: 1,
      name: "mood boost",
      price: 10,
      weight: "50g",
      image: "/placeholder.svg?height=250&width=250",
    },
    {
      id: 2,
      name: "good cookin'",
      price: 10,
      weight: "50g",
      image: "/placeholder.svg?height=250&width=250",
    },
    {
      id: 3,
      name: "clean air",
      price: 10,
      weight: "50g",
      image: "/placeholder.svg?height=250&width=250",
    },
    {
      id: 4,
      name: "just for fun",
      price: 10,
      weight: "50g",
      image: "/placeholder.svg?height=250&width=250",
    },
  ]

  const charityProjects: CharityProject[] = [
    {
      id: 1,
      title: "Urban Garden Initiative",
      description:
        "Transforming urban spaces into thriving community gardens that provide fresh produce and green spaces for city residents.",
      targetAmount: 25000,
      currentAmount: 18500,
      image: "/placeholder.svg?height=300&width=400",
      category: "Community",
    },
    {
      id: 2,
      title: "School Garden Program",
      description:
        "Creating educational gardens in schools to teach children about sustainable agriculture, nutrition, and environmental stewardship.",
      targetAmount: 15000,
      currentAmount: 9000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Education",
    },
    {
      id: 3,
      title: "Rooftop Garden Network",
      description:
        "Establishing rooftop gardens in urban areas to reduce heat island effect, improve air quality, and create green spaces in concrete jungles.",
      targetAmount: 30000,
      currentAmount: 21000,
      image: "/placeholder.svg?height=300&width=400",
      category: "Environment",
    },
    {
      id: 4,
      title: "Therapeutic Gardens",
      description:
        "Building healing gardens in hospitals and rehabilitation centers to support recovery and mental wellbeing through nature connection.",
      targetAmount: 20000,
      currentAmount: 12500,
      image: "/placeholder.svg?height=300&width=400",
      category: "Healthcare",
    },
  ]

  return (
    <main className="min-h-screen bg-amber-50">
      <NavBar />

      {/* Hero Section */}
      <AnimatedHero />

      {/* About Section */}
      <section id="about" className="py-20 bg-amber-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300/20 rounded-full blur-lg"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase">
                About Us
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              About Our<span className="text-green-600">Tala</span>
              <span className="text-3xl md:text-5xl align-top">*</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Established community with the aim of providing insight and awareness on issues that exist on earth.
              <span className="block mt-2 text-lg text-gray-500">
                Transforming urban living through innovative green solutions.
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-green-50 hover:border-green-200">
                  <div className="flex items-start mb-6">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl mr-6 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Sustainable Innovation</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Our products are designed with sustainability at the core, using eco-friendly materials and
                        practices that protect our planet for future generations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-green-50 hover:border-green-200">
                  <div className="flex items-start mb-6">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl mr-6 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Urban Solutions</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Perfect for apartments, balconies, and small spaces. Our innovative solutions maximize growing
                        potential in any urban environment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-green-50 hover:border-green-200">
                  <div className="flex items-start mb-6">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl mr-6 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Expert Guidance</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Designed for gardeners of all experience levels, with comprehensive guides, expert support, and
                        a thriving community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Main mission card */}
              <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-10 shadow-2xl border border-green-100 relative overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-transparent rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-200/20 to-transparent rounded-full -ml-12 -mb-12"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-600 w-3 h-12 rounded-full mr-4"></div>
                    <h3 className="text-3xl font-bold text-gray-800">Our Mission</h3>
                  </div>

                  <p className="text-lg md:text-xl mb-8 text-gray-600 leading-relaxed">
                    To make gardening accessible to everyone by providing innovative, space-efficient solutions that
                    bring the joy of growing plants to any living situation, while fostering sustainable communities.
                  </p>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl text-center border border-green-100 hover:shadow-lg transition-all duration-300">
                      <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                      <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Plant Varieties</div>
                      <div className="w-12 h-1 bg-green-200 rounded-full mx-auto mt-2"></div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl text-center border border-green-100 hover:shadow-lg transition-all duration-300">
                      <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
                      <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Happy Gardeners</div>
                      <div className="w-12 h-1 bg-green-200 rounded-full mx-auto mt-2"></div>
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="mt-8 pt-6 border-t border-green-100">
                    <button className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Learn More About Us
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-200 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute -bottom-6 -right-6 w-6 h-6 bg-green-300 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Bottom section with values */}
          <div className="mt-20 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-green-100 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Community First</h4>
                  <p className="text-gray-600">Building connections through shared gardening experiences</p>
                </div>
              </div>

              <div className="group">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-green-100 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Innovation</h4>
                  <p className="text-gray-600">Constantly evolving our solutions for better results</p>
                </div>
              </div>

              <div className="group">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-green-100 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Sustainability</h4>
                  <p className="text-gray-600">Protecting our planet through responsible practices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}

      {/* <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our selection of seeds and gardening kits designed for small spaces
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
              view all products
            </button>
          </div>
        </div>
      </section> */}

      {/* Charity Section */}
      <AnimatedCharitySection/>


      <AnimatedTeamSection/>

      {/* Gallery Section */}
      <AnimatedGallery />

      {/* Social Media Section */}
      <AnimatedSocialSection />

      {/* Footer */}
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
    </main>
  )
}
