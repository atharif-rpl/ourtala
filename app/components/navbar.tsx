"use client"

import { useState, useEffect } from "react"
import Image from "next/image" // Import Image component for better image handling

const NavBar = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 50) // Navbar background changes after 50px scroll
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Calculate rotation based on scrollY
  // Adjust the multiplier (e.g., 0.1) to control rotation speed
  const logoRotation = scrollY * 0.15 // Rotate 0.15 degrees for every 1px scrolled

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 max-w-fit px-8 py-3 rounded-full border border-white/50 backdrop-blur-md ${isScrolled ? "bg-white/80 shadow-2xl" : "bg-white/70 shadow-xl"
          }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-6">
          {/* Logo with Scroll-based Rotation */}
          <a href="#home" className="flex items-center justify-center w-12 h-12 relative group">
            <Image
              src="/images/OURTALA.png"
              alt="OURTALA Logo"
              width={48}
              height={48}
              className="object-contain drop-shadow-md transition-transform duration-300 ease-out group-hover:scale-110 group-hover:brightness-110"
              style={{ transform: `rotate(${logoRotation}deg)` }}
            />

          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#home"
              className="text-gray-700 hover:text-amber-600 font-medium relative transition-all duration-200 ease-out group"
            >
              Home
              <span className="absolute left-0 bottom-0 h-0.5 bg-amber-600 w-0 group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-amber-600 font-medium relative transition-all duration-200 ease-out group"
            >
              About
              <span className="absolute left-0 bottom-0 h-0.5 bg-amber-600 w-0 group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
            <a
              href="#projects"
              className="text-gray-700 hover:text-amber-600 font-medium relative transition-all duration-200 ease-out group"
            >
              Projects
              <span className="absolute left-0 bottom-0 h-0.5 bg-amber-600 w-0 group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
            <a
              href="#team"
              className="text-gray-700 hover:text-amber-600 font-medium relative transition-all duration-200 ease-out group"
            >
              Team
              <span className="absolute left-0 bottom-0 h-0.5 bg-amber-600 w-0 group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
            <a
              href="#gallery"
              className="text-gray-700 hover:text-amber-600 font-medium relative transition-all duration-200 ease-out group"
            >
              Gallery
              <span className="absolute left-0 bottom-0 h-0.5 bg-amber-600 w-0 group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-full hover:bg-gray-100/50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-20 left-1/2 transform -translate-x-1/2 w-[calc(100%-theme(spacing.8))] max-w-xs rounded-xl bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0"}`}
        style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
      >
        <div className="flex flex-col items-center space-y-4">
          <a
            href="#home"
            className="block w-full text-center px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="block w-full text-center px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            className="block w-full text-center px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          >
            Projects
          </a>
          <a
            href="#team"
            className="block w-full text-center px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          >
            Team
          </a>
          <a
            href="#gallery"
            className="block w-full text-center px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
          >
            Gallery
          </a>

        </div>
      </div>
    </>
  )
}

export default NavBar
