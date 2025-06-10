"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface CharityProject {
  id: number
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  image: string
  category: string
}

interface TeamMember {
  id: number
  name: string
  position: string
  image: string
  social: {
    linkedin?: string
    twitter?: string
    instagram?: string
  }
}

function NavBar() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [rotationAngle, setRotationAngle] = useState(0)

  const sections = [
    { id: "home", label: "home" },
    { id: "about", label: "about" },
    { id: "products", label: "products" },
    { id: "charity", label: "charity" },
    { id: "team", label: "team" },
    { id: "gallery", label: "gallery" },
    { id: "social", label: "social" },
    { id: "contact", label: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50)
      // --- TAMBAHKAN LOGIKA BARU DI SINI ---
      // Atur sudut rotasi berdasarkan posisi scroll.
      // Angka 0.5 adalah "faktor kecepatan", Anda bisa mengubahnya
      // menjadi lebih besar (lebih cepat) atau lebih kecil (lebih lambat).
      const newAngle = scrollPosition * 0.5;
      setRotationAngle(newAngle);
      // ------------------------------------

      // Update active section based on scroll position (kode ini sudah ada)
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))


      const currentSection = sectionElements.find((section) => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, []) // dependencies array tetap sama

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="#home"
            onClick={() => scrollToSection('home')}
            className="flex items-center" // Hapus kelas rotasi & transisi dari sini
            style={{
              transform: `rotate(${rotationAngle}deg)`,
            }}
          >
            <Image
              src="/images/ourtalah.png" // Sesuaikan dengan nama file logo Anda
              alt="Ourtala Logo"
              width={90} // Sesuaikan lebar logo
              height={10} // Sesuaikan tinggi logo
              className="h-auto" // Menjaga rasio aspek gambar
            />
          </a>
          <div className="hidden md:flex space-x-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`transition-all duration-300 px-6 py-2 rounded-full ${activeSection === section.id
                  ? "bg-gray-800 text-white"
                  : isScrolled
                    ? "bg-white text-gray-800 hover:bg-gray-100"
                    : "bg-white/80 text-gray-800 hover:bg-white"
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
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

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {member.social.linkedin && (
              <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                </svg>
              </button>
            )}
            {member.social.twitter && (
              <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
            )}
            {member.social.instagram && (
              <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2.163c2.67 0 2.987.01 4.042.059 2.71.123 3.976 1.409 4.099 4.099.048 1.054.057 1.37.057 4.042 0 2.672-.01 2.988-.057 4.042-.123 2.69-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.061 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
        <p className="text-green-600 font-medium">{member.position}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

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

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Amanda N. Shelima",
      position: "Founder & Head Ourtala",
      image: "/images/amanda.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      id: 2,
      name: "Freya Visesa S.",
      position: "Garden Designer",
      image: "/images/profile2.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 3,
      name: "Lily Waters",
      position: "Sustainability Expert",
      image: "/images/profile3.jpg",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: 4,
      name: "Oliver Seed",
      position: "Community Coordinator",
      image: "/images/profile4.jpg",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      id: 5,
      name: "ujang",
      position: "Community Coordinator",
      image: "/placeholder.svg?height=300&width=300",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },



  ]

  const galleryImages = [
    "/images/Galery1.jpg",
    "/images/Galery2.jpg",
    "/images/Galery3.jpg",
    "/images/Galery4.jpg",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-amber-50">
      <NavBar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500"><rect fill="%234ade80" width="1000" height="500"/><circle fill="%2365a30d" cx="100" cy="100" r="20"/><circle fill="%2365a30d" cx="300" cy="150" r="15"/><circle fill="%2365a30d" cx="500" cy="80" r="25"/><circle fill="%2365a30d" cx="700" cy="200" r="18"/><circle fill="%2365a30d" cx="900" cy="120" r="22"/></svg>\')',
          }}
        ></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-200 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-32 w-3 h-3 bg-yellow-200 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 left-1/3 w-5 h-5 bg-yellow-200 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-32 right-20 w-4 h-4 bg-yellow-200 rounded-full animate-bounce delay-1500"></div>
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-yellow-200 rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up">
            Ourtala<span className="text-5xl md:text-7xl align-top">*</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up delay-300 tracking-widest">gardens for everyone</p>
          <p className="text-lg mb-12 opacity-90 animate-fade-in-up delay-500">
            no yard doesn&apos;t have to mean no garden! let your flowers Ourtala*
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-700">
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              learn more
            </button>
            <button
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              shop now
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

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
              About Our<span className="text-green-600">Tula</span>
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
      <section id="products" className="py-20 bg-white">
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
      </section>

      {/* Charity Section */}
      <section id="charity" className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Garden Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Supporting community gardens and green initiatives to make our world a better place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {charityProjects.map((project) => (
              <CharityCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
              view all projects
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-green-300/20 rounded-full blur-lg"></div>
        <div className="absolute top-20 left-1/3 w-12 h-12 bg-yellow-300/30 rounded-full blur-md"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase">
                Our Team
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Meet Our <span className="text-green-600">Green</span> Team
              <span className="text-3xl md:text-5xl align-top">*</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Passionate plant lovers dedicated to bringing nature into your home
              <span className="block mt-2 text-lg text-gray-500">
                United by our love for gardening and sustainable living
              </span>
            </p>
          </div>

          {/* Team grid with enhanced styling */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div key={member.id} className="group relative">
                {/* Floating number indicator */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                  {index + 1}
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 border border-green-50 hover:border-green-200 hover:shadow-2xl">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Social media icons */}
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {member.social.linkedin && (
                          <button className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                            </svg>
                          </button>
                        )}
                        {member.social.twitter && (
                          <button className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </button>
                        )}
                        {member.social.instagram && (
                          <button className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 2.163c2.67 0 2.987.01 4.042.059 2.71.123 3.976 1.409 4.099 4.099.048 1.054.057 1.37.057 4.042 0 2.672-.01 2.988-.057 4.042-.123 2.69-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.061 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Role badge */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Team Member
                      </span>
                    </div>
                  </div>

                  <div className="p-8 text-center relative">
                    {/* Background pattern */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-semibold mb-4 text-lg">
                      {member.position}
                    </p>

                    {/* Decorative element */}
                    <div className="w-12 h-1 bg-green-200 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team stats section */}
          <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-10 shadow-lg border border-green-100 relative overflow-hidden">
            {/* Background decorative pattern */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-200/20 to-transparent rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-200/20 to-transparent rounded-full -ml-16 -mb-16"></div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Our Team Rocks</h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Combined experience and passion that makes the difference in everything we do
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 hover:border-green-200">
                    <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                      15+
                    </div>
                    <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Years Experience
                    </div>
                  </div>
                </div>

                <div className="text-center group">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 hover:border-green-200">
                    <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                      500+
                    </div>
                    <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Gardens Created
                    </div>
                  </div>
                </div>

                <div className="text-center group">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 hover:border-green-200">
                    <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                      24/7
                    </div>
                    <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Support Available
                    </div>
                  </div>
                </div>

                <div className="text-center group">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 hover:border-green-200">
                    <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                      100%
                    </div>
                    <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Satisfaction Rate
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="text-center mt-12 pt-8 border-t border-green-100">
                <p className="text-lg text-gray-600 mb-6">
                  Want to join our growing team of garden enthusiasts?
                </p>
                <button className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Join Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Garden Gallery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beautiful spaces created with our products and community projects
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {galleryImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Gallery image ${index + 1}`}
                      width={800}
                      height={500}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-gray-800" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social" className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Connect With Us</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Follow our social media for gardening tips, inspiration, and community updates
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="text-center group">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Twitter</h3>
              <p className="opacity-80">@blumegarden</p>
              <p className="text-2xl font-bold">8.5K</p>
              <p className="text-sm opacity-70">Followers</p>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Pinterest</h3>
              <p className="opacity-80">@blumegarden</p>
              <p className="text-2xl font-bold">12.2K</p>
              <p className="text-sm opacity-70">Followers</p>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Instagram</h3>
              <p className="opacity-80">@blumegarden</p>
              <p className="text-2xl font-bold">15.8K</p>
              <p className="text-sm opacity-70">Followers</p>
            </div>

            <div className="text-center group">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Facebook</h3>
              <p className="opacity-80">@blumegarden</p>
              <p className="text-2xl font-bold">9.4K</p>
              <p className="text-sm opacity-70">Likes</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl mb-6">Join our newsletter for gardening tips and exclusive offers</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
                subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Have questions about our products or need gardening advice? We're here to help!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="opacity-80">123 Garden Street, Green City, GC 12345</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="opacity-80">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="opacity-80">hello@blumegarden.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 rounded-full bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 rounded-full bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-full bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none transition-colors"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-full bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none transition-colors"
                />
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none transition-colors resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                >
                  send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

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
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </main>
  )
}
