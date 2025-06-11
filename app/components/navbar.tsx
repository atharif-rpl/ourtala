// File: app/components/navbar.tsx

"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const navRef = useRef<HTMLElement>(null)

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLinkClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrollY(scrollPosition)
      setIsScrolled(scrollPosition > 50)

      const newAngle = scrollPosition * 0.2
      setRotationAngle(newAngle)

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

    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isHovered) {
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.1,
      }))
      setParticles(newParticles)
    } else {
      setParticles([])
    }
  }, [isHovered])

  return (
    <>
      {/* Menambahkan 'group' di sini untuk efek hover kolektif */}
      <nav
        ref={navRef}
        className={`group fixed top-6 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-6xl transition-all duration-400 backdrop-blur-xl rounded-full border border-white/20 ${
          isScrolled || isMenuOpen ? "bg-white/95 shadow-lg" : "bg-white/80"
        }`}
        style={{ padding: "8px" }} // Padding disesuaikan
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ... efek lainnya ... */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none rounded-full"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.3), transparent 70%)`,
            transition: "background 0.3s ease-out",
          }}
        ></div>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-60 pointer-events-none animate-float-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 opacity-30 pointer-events-none animate-border-glow rounded-full"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center h-16">
            <a
              href="#home"
              onClick={() => handleLinkClick("home")}
              className="flex items-center transition-all duration-300 hover:scale-110 relative group"
              style={{
                transform: `rotate(${rotationAngle}deg) scale(${isHovered ? 1.05 : 1})`,
                filter: `hue-rotate(${scrollY * 0.1}deg) brightness(1.1)`,
                transition: "all 0.4s ease-out",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-300 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"></div>
              <Image
                src="/images/ourtalah.png"
                alt="Ourtala Logo"
                width={120}
                height={40}
                className="h-auto relative z-10"
                priority
              />
              <div className="absolute inset-0 border-2 border-green-400/30 rounded-full opacity-0 group-hover:opacity-100 animate-spin-slow transition-opacity duration-300"></div>
            </a>

            {/* ===== BAGIAN TOMBOL NAVIGASI YANG DIUBAH ===== */}
            <div className="hidden md:flex items-center space-x-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  // Class dan logic transform diubah di sini
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none transform group-hover:-translate-y-1 hover:!scale-110 overflow-hidden ${
                    activeSection === section.id
                      ? "bg-gray-800 text-white shadow-xl"
                      : "text-gray-700 hover:bg-gray-200 hover:shadow-lg"
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <span className="relative z-10">{section.label}</span>
                  {activeSection === section.id && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-gray-800 animate-pulse opacity-20"></span>
                      <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-400 to-yellow-300 opacity-30 blur animate-spin-slow"></span>
                    </>
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-green-400 rounded-full animate-micro-float"></div>
                    <div
                      className="absolute bottom-1 right-1 w-1 h-1 bg-yellow-400 rounded-full animate-micro-float"
                      style={{ animationDelay: "0.3s" }}
                    ></div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* ... sisa kode mobile menu tetap sama ... */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="z-50 relative w-6 h-6 flex flex-col justify-around items-center transition-all duration-300 hover:scale-110 group"
                aria-label="Open Menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-300 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"></div>
                <span
                  className={`block w-5 h-0.5 bg-gray-800 transform transition-all duration-300 ease-in-out relative z-10 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out relative z-10 ${isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-gray-800 transform transition-all duration-300 ease-in-out relative z-10 ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ... sisa kode (mobile menu overlay & style jsx) tetap sama ... */}
      {/* ... */}
    </>
  )
}