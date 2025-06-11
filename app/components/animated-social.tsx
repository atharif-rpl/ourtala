"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

export default function AnimatedSocialSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeContactTab, setActiveContactTab] = useState("form")
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const socialPlatforms = [
    {
      id: 1,
      name: "Instagram",
      handle: "@ourtala",
      followers: "15.8K",
      color: "#E4405F",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
      emoji: "📸",
    },
    {
      id: 2,
      name: "Twitter",
      handle: "@ourtala",
      followers: "8.5K",
      color: "#1DA1F2",
      icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
      emoji: "🐦",
    },
    {
      id: 3,
      name: "Pinterest",
      handle: "@ourtala",
      followers: "12.2K",
      color: "#BD081C",
      icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 0z",
      emoji: "📌",
    },
  ]

  const contactInfo = [
    {
      id: 1,
      title: "Address",
      content: "123 Garden Street, Green City, GC 12345",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "#22c55e",
    },
    {
      id: 2,
      title: "Phone",
      content: "+1 (555) 123-4567",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      color: "#fbbf24",
    },
    {
      id: 3,
      title: "Email",
      content: "hello@ourtala.com",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "#22c55e",
    },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const animationFrame = () => {
      setTime(Date.now() * 0.001)
      requestAnimationFrame(animationFrame)
    }

    const section = sectionRef.current
    section?.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    requestAnimationFrame(animationFrame)

    return () => {
      section?.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="social" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Enhanced animated background with multiple layers */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1), rgba(251, 191, 36, 0.1)), 
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
            linear-gradient(${time * 15}deg, rgba(34, 197, 94, 0.05) 0%, rgba(251, 191, 36, 0.05) 50%, rgba(34, 197, 94, 0.05) 100%),
            linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)
          `,
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }}
      ></div>

      {/* Rich garden ornaments - Similar to hero */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large decorative leaves */}
        <div
          className="absolute w-20 h-20 opacity-30"
          style={{
            top: "8%",
            left: "5%",
            transform: `rotate(${time * 25 + 45}deg) scale(${1 + Math.sin(time * 2) * 0.2})`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-400">
            <path d="M50 10 C30 20, 20 40, 30 60 C40 80, 60 80, 70 60 C80 40, 70 20, 50 10 Z" />
          </svg>
        </div>

        <div
          className="absolute w-24 h-24 opacity-25"
          style={{
            top: "12%",
            right: "8%",
            transform: `rotate(${-time * 20 + 120}deg) scale(${1 + Math.cos(time * 1.8) * 0.3})`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-300">
            <path d="M50 5 C25 15, 15 35, 25 55 C35 75, 65 75, 75 55 C85 35, 75 15, 50 5 Z" />
          </svg>
        </div>

        {/* Decorative flowers around social cards */}
        <div
          className="absolute w-16 h-16 opacity-40"
          style={{
            top: "35%",
            left: "10%",
            transform: `rotate(${time * 30}deg) scale(${1 + Math.sin(time * 3) * 0.15})`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="25" r="12" fill="#fbbf24" />
            <circle cx="75" cy="50" r="12" fill="#fbbf24" />
            <circle cx="50" cy="75" r="12" fill="#fbbf24" />
            <circle cx="25" cy="50" r="12" fill="#fbbf24" />
            <circle cx="50" cy="50" r="10" fill="#f59e0b" />
          </svg>
        </div>

        <div
          className="absolute w-18 h-18 opacity-35"
          style={{
            top: "40%",
            right: "12%",
            transform: `rotate(${-time * 25}deg) scale(${1 + Math.cos(time * 2.5) * 0.2})`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="20" r="15" fill="#22c55e" />
            <circle cx="80" cy="50" r="15" fill="#22c55e" />
            <circle cx="50" cy="80" r="15" fill="#22c55e" />
            <circle cx="20" cy="50" r="15" fill="#22c55e" />
            <circle cx="50" cy="50" r="12" fill="#16a34a" />
          </svg>
        </div>

        {/* Vine decorations */}
        <div
          className="absolute w-40 h-10 opacity-25"
          style={{
            top: "25%",
            left: "2%",
            transform: `rotate(${time * 12}deg) scaleX(${1 + Math.sin(time * 2) * 0.3})`,
          }}
        >
          <svg viewBox="0 0 200 50" className="w-full h-full fill-green-300">
            <path
              d="M10 25 Q50 10, 90 25 Q130 40, 170 25 Q190 15, 190 25"
              stroke="#22c55e"
              strokeWidth="4"
              fill="none"
            />
            <circle cx="30" cy="18" r="4" fill="#22c55e" />
            <circle cx="70" cy="32" r="4" fill="#22c55e" />
            <circle cx="110" cy="18" r="4" fill="#22c55e" />
            <circle cx="150" cy="32" r="4" fill="#22c55e" />
          </svg>
        </div>

        <div
          className="absolute w-36 h-10 opacity-30"
          style={{
            bottom: "25%",
            right: "5%",
            transform: `rotate(${-time * 15}deg) scaleX(${1 + Math.cos(time * 1.5) * 0.25})`,
          }}
        >
          <svg viewBox="0 0 200 50" className="w-full h-full fill-green-400">
            <path
              d="M10 25 Q50 40, 90 25 Q130 10, 170 25 Q190 35, 190 25"
              stroke="#16a34a"
              strokeWidth="4"
              fill="none"
            />
            <circle cx="40" cy="38" r="4" fill="#16a34a" />
            <circle cx="80" cy="12" r="4" fill="#16a34a" />
            <circle cx="120" cy="38" r="4" fill="#16a34a" />
            <circle cx="160" cy="12" r="4" fill="#16a34a" />
          </svg>
        </div>

        {/* Enhanced floating particles */}
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${6 + (i % 4) * 3}px`,
              height: `${6 + (i % 4) * 3}px`,
              top: `${10 + ((i * 7) % 80)}%`,
              left: `${5 + ((i * 11) % 90)}%`,
              background: i % 4 === 0 ? "#22c55e" : i % 4 === 1 ? "#fbbf24" : i % 4 === 2 ? "#16a34a" : "#f59e0b",
              opacity: 0.3 + (i % 4) * 0.1,
              transform: `
                translate(${Math.sin(time * (1 + i * 0.1)) * 25}px, ${Math.cos(time * (1.2 + i * 0.1)) * 20}px) 
                scale(${1 + Math.sin(time * (2 + i * 0.2)) * 0.4})
              `,
              boxShadow: `0 0 ${8 + (i % 4) * 4}px rgba(34, 197, 94, 0.3)`,
            }}
          />
        ))}

        {/* Butterfly ornaments */}
        <div
          className="absolute w-10 h-8 opacity-50"
          style={{
            top: "45%",
            left: "20%",
            transform: `
              translate(${Math.sin(time * 2) * 40}px, ${Math.cos(time * 1.5) * 25}px) 
              rotate(${Math.sin(time * 3) * 20}deg)
            `,
          }}
        >
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <ellipse cx="25" cy="20" rx="18" ry="12" fill="#fbbf24" opacity="0.8" />
            <ellipse cx="75" cy="20" rx="18" ry="12" fill="#fbbf24" opacity="0.8" />
            <ellipse cx="25" cy="40" rx="15" ry="10" fill="#f59e0b" opacity="0.8" />
            <ellipse cx="75" cy="40" rx="15" ry="10" fill="#f59e0b" opacity="0.8" />
            <line x1="50" y1="10" x2="50" y2="50" stroke="#92400e" strokeWidth="3" />
          </svg>
        </div>

        <div
          className="absolute w-8 h-6 opacity-45"
          style={{
            top: "65%",
            right: "25%",
            transform: `
              translate(${Math.cos(time * 1.8) * 35}px, ${Math.sin(time * 2.2) * 25}px) 
              rotate(${Math.cos(time * 2.5) * 25}deg)
            `,
          }}
        >
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <ellipse cx="25" cy="20" rx="15" ry="10" fill="#22c55e" opacity="0.8" />
            <ellipse cx="75" cy="20" rx="15" ry="10" fill="#22c55e" opacity="0.8" />
            <ellipse cx="25" cy="40" rx="12" ry="8" fill="#16a34a" opacity="0.8" />
            <ellipse cx="75" cy="40" rx="12" ry="8" fill="#16a34a" opacity="0.8" />
            <line x1="50" y1="10" x2="50" y2="50" stroke="#166534" strokeWidth="3" />
          </svg>
        </div>

        {/* Floating petals */}
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute opacity-35"
            style={{
              top: `${15 + ((i * 8) % 70)}%`,
              left: `${8 + ((i * 9) % 84)}%`,
              transform: `
                translate(${Math.sin(time * (1.5 + i * 0.2)) * 60}px, ${Math.cos(time * (1.2 + i * 0.15)) * 40}px) 
                rotate(${time * (25 + i * 8)}deg)
              `,
            }}
          >
            <svg width="14" height="10" viewBox="0 0 14 10">
              <ellipse
                cx="7"
                cy="5"
                rx="7"
                ry="5"
                fill={i % 4 === 0 ? "#fbbf24" : i % 4 === 1 ? "#f472b6" : i % 4 === 2 ? "#22c55e" : "#a855f7"}
              />
            </svg>
          </div>
        ))}

        {/* Seed/pollen particles */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={`seed-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              top: `${15 + ((i * 3) % 70)}%`,
              left: `${10 + ((i * 7) % 80)}%`,
              background: i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#22c55e" : "#f59e0b",
              opacity: 0.5,
              transform: `
                translate(${Math.sin(time * (2 + i * 0.3)) * 50}px, ${Math.cos(time * (1.8 + i * 0.2)) * 35}px) 
                scale(${1 + Math.sin(time * (3 + i * 0.4)) * 0.6})
              `,
              boxShadow: `0 0 3px ${i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#22c55e" : "#f59e0b"}`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced ornamental header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            {/* Decorative frame around title */}
            <div
              className="absolute -top-12 -left-12 w-8 h-8 opacity-50"
              style={{
                transform: `rotate(${time * 45}deg) scale(${1 + Math.sin(time * 4) * 0.2})`,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full fill-yellow-400">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>

            <div
              className="absolute -top-8 -right-8 w-6 h-6 opacity-40"
              style={{
                transform: `rotate(${-time * 60}deg) scale(${1 + Math.cos(time * 3) * 0.3})`,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-full h-full fill-green-400">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>

            <div
              className="absolute -bottom-8 -left-8 w-5 h-5 opacity-45"
              style={{
                transform: `rotate(${time * 50}deg) scale(${1 + Math.sin(time * 2.5) * 0.25})`,
              }}
            >
              <svg viewBox="0 0 12 12" className="w-full h-full fill-pink-400">
                <polygon points="6,0 8,4 12,4 9,7 10,12 6,9 2,12 3,7 0,4 4,4" />
              </svg>
            </div>

            <div
              className="absolute -bottom-6 -right-10 w-4 h-4 opacity-35"
              style={{
                transform: `rotate(${-time * 40}deg) scale(${1 + Math.cos(time * 2) * 0.2})`,
              }}
            >
              <svg viewBox="0 0 12 12" className="w-full h-full fill-purple-400">
                <polygon points="6,0 8,4 12,4 9,7 10,12 6,9 2,12 3,7 0,4 4,4" />
              </svg>
            </div>

            {/* Enhanced title with dancing letters */}
            <h2 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6 relative">
              {"Connect With Us".split("").map((letter, i) => (
                <span
                  key={i}
                  className="inline-block transition-all duration-300"
                  style={{
                    transform: `
                      translateY(${Math.sin(time * 3 + i * 0.3) * 4}px) 
                      scale(${1 + Math.sin(time * 4 + i * 0.2) * 0.05})
                    `,
                    color: letter === " " ? "transparent" : "#1f2937",
                    textShadow: `0 0 15px rgba(34, 197, 94, ${0.1 + Math.sin(time * 2 + i) * 0.1})`,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}

              {/* Animated decorative asterisk */}
              <span
                className="text-4xl md:text-6xl align-top inline-block ml-2"
                style={{
                  transform: `rotate(${time * 80}deg) scale(${1 + Math.sin(time * 5) * 0.3})`,
                  color: "#fbbf24",
                  textShadow: `0 0 25px rgba(251, 191, 36, 0.8)`,
                }}
              >
                *
              </span>
            </h2>

            {/* Enhanced decorative underline */}
            <div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 opacity-60 rounded-full"
              style={{
                width: `${120 + Math.sin(time * 3) * 30}px`,
                background: `linear-gradient(${time * 90}deg, #22c55e, #fbbf24, #22c55e)`,
                boxShadow: `0 0 15px rgba(34, 197, 94, 0.5)`,
              }}
            />
          </div>

          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-8"
            style={{
              textShadow: `0 0 10px rgba(34, 197, 94, 0.1)`,
            }}
          >
            Follow our social media for gardening tips, inspiration, and community updates
          </p>
        </div>

        {/* Enhanced social cards with ornamental frames */}
        <div className="grid md:grid-cols-3 gap-12 mb-24 max-w-5xl mx-auto">
          {socialPlatforms.map((platform, index) => (
            <div
              key={platform.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredCard(platform.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: `translateY(${Math.sin(time * 1.5 + index) * 5}px)`,
              }}
            >
              {/* Ornamental frame around card */}
              <div
                className="absolute -inset-4 opacity-30 pointer-events-none"
                style={{
                  transform: `rotate(${time * 20 + index * 45}deg) scale(${hoveredCard === platform.id ? 1.1 : 1})`,
                }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="95"
                    fill="none"
                    stroke={platform.color}
                    strokeWidth="2"
                    strokeDasharray="10,5"
                    opacity="0.4"
                  />
                  <circle cx="100" cy="20" r="4" fill={platform.color} opacity="0.6" />
                  <circle cx="180" cy="100" r="4" fill={platform.color} opacity="0.6" />
                  <circle cx="100" cy="180" r="4" fill={platform.color} opacity="0.6" />
                  <circle cx="20" cy="100" r="4" fill={platform.color} opacity="0.6" />
                </svg>
              </div>

              {/* Enhanced card with multiple layers */}
              <div
                className="relative bg-white rounded-3xl p-8 transition-all duration-700 border border-gray-100 overflow-hidden"
                style={{
                  transform: `
                    scale(${hoveredCard === platform.id ? 1.05 : 1}) 
                    rotateY(${hoveredCard === platform.id ? 8 : 0}deg)
                    rotateX(${hoveredCard === platform.id ? 3 : 0}deg)
                  `,
                  boxShadow:
                    hoveredCard === platform.id
                      ? `0 25px 80px rgba(0, 0, 0, 0.15), 0 0 40px ${platform.color}30`
                      : "0 15px 40px rgba(0, 0, 0, 0.08)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Animated background pattern */}
                <div
                  className="absolute inset-0 opacity-5 transition-opacity duration-500"
                  style={{
                    background: `
                      radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                        ${platform.color} 0%, 
                        transparent 50%
                      ),
                      linear-gradient(${time * 45 + index * 60}deg, 
                        ${platform.color} 0%, 
                        transparent 50%, 
                        ${platform.color} 100%
                      )
                    `,
                    opacity: hoveredCard === platform.id ? 0.1 : 0.05,
                  }}
                />

                {/* Floating ornamental particles on hover */}
                {hoveredCard === platform.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full animate-float-up-ornament"
                        style={{
                          width: `${3 + (i % 3)}px`,
                          height: `${3 + (i % 3)}px`,
                          top: `${20 + ((i * 8) % 60)}%`,
                          left: `${15 + ((i * 12) % 70)}%`,
                          background: i % 3 === 0 ? platform.color : i % 3 === 1 ? "#22c55e" : "#fbbf24",
                          opacity: 0.6,
                          animationDelay: `${i * 0.15}s`,
                          animationDuration: `${2.5 + i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Enhanced icon with multiple effects */}
                <div className="text-center">
                  <div
                    className="relative w-20 h-20 mx-auto mb-6 transition-all duration-500"
                    style={{
                      transform: `
                        scale(${hoveredCard === platform.id ? 1.3 : 1}) 
                        rotateZ(${hoveredCard === platform.id ? 15 : 0}deg)
                      `,
                    }}
                  >
                    {/* Multiple glow layers */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 blur-xl transition-all duration-500"
                      style={{
                        background: platform.color,
                        opacity: hoveredCard === platform.id ? 0.4 : 0,
                        transform: `scale(${hoveredCard === platform.id ? 1.8 : 1})`,
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full opacity-0 blur-lg transition-all duration-500"
                      style={{
                        background: platform.color,
                        opacity: hoveredCard === platform.id ? 0.3 : 0,
                        transform: `scale(${hoveredCard === platform.id ? 1.4 : 1})`,
                      }}
                    />

                    {/* Emoji decoration */}
                    <div
                      className="absolute -top-2 -right-2 text-2xl transition-all duration-500"
                      style={{
                        transform: `
                          scale(${hoveredCard === platform.id ? 1.2 : 0.8}) 
                          rotate(${hoveredCard === platform.id ? 20 : 0}deg)
                        `,
                        opacity: hoveredCard === platform.id ? 1 : 0.7,
                      }}
                    >
                      {platform.emoji}
                    </div>

                    <svg
                      className="w-full h-full relative z-10 transition-all duration-500"
                      fill={hoveredCard === platform.id ? platform.color : "#6b7280"}
                      viewBox="0 0 24 24"
                      style={{
                        filter: hoveredCard === platform.id ? `drop-shadow(0 0 10px ${platform.color}50)` : "none",
                      }}
                    >
                      <path d={platform.icon} />
                    </svg>
                  </div>

                  {/* Enhanced platform info */}
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-2 transition-all duration-500"
                    style={{
                      color: hoveredCard === platform.id ? platform.color : "#1f2937",
                      textShadow: hoveredCard === platform.id ? `0 0 15px ${platform.color}40` : "none",
                    }}
                  >
                    {platform.name}
                  </h3>
                  <p className="text-gray-500 mb-4">{platform.handle}</p>

                  {/* Enhanced followers count */}
                  <div
                    className="transition-all duration-500"
                    style={{
                      transform: `scale(${hoveredCard === platform.id ? 1.15 : 1})`,
                    }}
                  >
                    <p
                      className="text-4xl font-bold transition-all duration-500"
                      style={{
                        color: hoveredCard === platform.id ? platform.color : "#1f2937",
                        textShadow: hoveredCard === platform.id ? `0 0 25px ${platform.color}60` : "none",
                      }}
                    >
                      {platform.followers}
                    </p>
                    <p className="text-sm text-gray-400">followers</p>
                  </div>
                </div>

                {/* Ornamental border animation */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(${time * 60 + index * 90}deg, transparent, ${platform.color}20, transparent)`,
                    opacity: hoveredCard === platform.id ? 1 : 0,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced newsletter section with ornamental frame */}
        <div className="text-center max-w-3xl mx-auto relative mb-32">
          {/* Ornamental decorations around newsletter */}
          <div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-6 h-6 opacity-40"
            style={{
              transform: `translateX(-50%) translateY(${Math.sin(time * 3) * 8}px) rotate(${time * 60}deg) scale(${1 + Math.sin(time * 4) * 0.3})`,
            }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full fill-green-400">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <div
            className="absolute -top-12 -left-16 w-4 h-4 opacity-35"
            style={{
              transform: `rotate(${-time * 45}deg) scale(${1 + Math.cos(time * 3) * 0.2})`,
            }}
          >
            <svg viewBox="0 0 12 12" className="w-full h-full fill-yellow-400">
              <polygon points="6,0 8,4 12,4 9,7 10,12 6,9 2,12 3,7 0,4 4,4" />
            </svg>
          </div>

          <div
            className="absolute -top-12 -right-16 w-4 h-4 opacity-35"
            style={{
              transform: `rotate(${time * 50}deg) scale(${1 + Math.sin(time * 2.5) * 0.25})`,
            }}
          >
            <svg viewBox="0 0 12 12" className="w-full h-full fill-pink-400">
              <polygon points="6,0 8,4 12,4 9,7 10,12 6,9 2,12 3,7 0,4 4,4" />
            </svg>
          </div>

          <h3
            className="text-4xl font-bold text-gray-900 mb-8 relative"
            style={{
              textShadow: `0 0 20px rgba(34, 197, 94, 0.1)`,
            }}
          >
            Join Our Garden Community
            <span
              className="text-2xl align-top inline-block ml-2"
              style={{
                transform: `rotate(${time * 70}deg) scale(${1 + Math.sin(time * 4) * 0.2})`,
                color: "#fbbf24",
                textShadow: `0 0 15px rgba(251, 191, 36, 0.6)`,
              }}
            >
              🌱
            </span>
          </h3>

          {/* Enhanced newsletter form */}
          <div className="relative">
            <div
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto transition-all duration-700 relative"
              style={{
                transform: `scale(${isSubscribed ? 1.05 : 1})`,
              }}
            >
              {/* Ornamental frame around form */}
              <div
                className="absolute -inset-4 opacity-20 pointer-events-none"
                style={{
                  transform: `rotate(${time * 15}deg)`,
                }}
              >
                <svg viewBox="0 0 300 100" className="w-full h-full">
                  <rect
                    x="10"
                    y="10"
                    width="280"
                    height="80"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeDasharray="8,4"
                    rx="45"
                  />
                  <circle cx="50" cy="50" r="3" fill="#fbbf24" />
                  <circle cx="250" cy="50" r="3" fill="#fbbf24" />
                </svg>
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 text-gray-900 bg-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                style={{
                  boxShadow: email ? "0 15px 40px rgba(34, 197, 94, 0.15)" : "0 8px 25px rgba(0, 0, 0, 0.08)",
                }}
              />

              <button
                onClick={handleSubscribe}
                disabled={!email || isSubscribed}
                className="relative bg-gray-900 text-white px-8 py-4 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 disabled:opacity-50 overflow-hidden group"
                style={{
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Enhanced button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="relative z-10">{isSubscribed ? "✓ Welcome!" : "Subscribe"}</span>

                {/* Enhanced success particles */}
                {isSubscribed && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 15 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full animate-success-particle-ornament"
                        style={{
                          width: `${2 + (i % 3)}px`,
                          height: `${2 + (i % 3)}px`,
                          top: "50%",
                          left: "50%",
                          background: i % 3 === 0 ? "#22c55e" : i % 3 === 1 ? "#fbbf24" : "#f59e0b",
                          animationDelay: `${i * 0.08}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            </div>

            {/* Enhanced success message */}
            {isSubscribed && (
              <p
                className="mt-6 text-green-600 font-semibold animate-fade-in-ornament text-lg"
                style={{
                  textShadow: "0 0 15px rgba(34, 197, 94, 0.4)",
                }}
              >
                🌸 Welcome to our blooming community! 🌸
              </p>
            )}
          </div>

          {/* Contact us button */}
          <div className="mt-12">
            <button
              onClick={scrollToContact}
              className="relative bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 group overflow-hidden"
              style={{
                boxShadow: "0 15px 40px rgba(34, 197, 94, 0.25)",
              }}
            >
              {/* Enhanced button glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.4) 0%, transparent 50%)`,
                }}
              />

              <span className="relative z-10 flex items-center justify-center">
                <span>Get In Touch</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>

              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-30 group-active:animate-ping"></div>
            </button>
          </div>
        </div>

        {/* Contact Section with enhanced ornamental design */}
        <div
          ref={contactRef}
          id="contact"
          className="relative max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden mb-20"
        >
          {/* Ornamental background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                  rgba(34, 197, 94, 0.4) 0%, 
                  transparent 60%
                ),
                linear-gradient(${time * 30}deg, 
                  rgba(34, 197, 94, 0.1) 0%, 
                  rgba(251, 191, 36, 0.1) 50%, 
                  rgba(34, 197, 94, 0.1) 100%
                )
              `,
            }}
          />

          {/* Animated border */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: `linear-gradient(${time * 60}deg, transparent, rgba(34, 197, 94, 0.3), transparent)`,
              backgroundSize: "200% 200%",
              animation: "gradient-shift 3s ease-in-out infinite",
            }}
          />

          {/* Decorative elements */}
          <div
            className="absolute top-10 left-10 w-16 h-16 opacity-20"
            style={{
              transform: `rotate(${time * 30}deg) scale(${1 + Math.sin(time * 2) * 0.2})`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-green-400">
              <path d="M50 10 C30 20, 20 40, 30 60 C40 80, 60 80, 70 60 C80 40, 70 20, 50 10 Z" />
            </svg>
          </div>

          <div
            className="absolute bottom-10 right-10 w-20 h-20 opacity-15"
            style={{
              transform: `rotate(${-time * 25}deg) scale(${1 + Math.cos(time * 1.8) * 0.3})`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full fill-yellow-300">
              <path d="M50 5 C25 15, 15 35, 25 55 C35 75, 65 75, 75 55 C85 35, 75 15, 50 5 Z" />
            </svg>
          </div>

          {/* Header */}
          <div className="relative z-10 text-center pt-16 pb-8 px-4">
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
              style={{
                textShadow: `0 0 20px rgba(34, 197, 94, 0.1)`,
              }}
            >
              Get In Touch
              <span
                className="text-2xl align-top inline-block ml-2"
                style={{
                  transform: `rotate(${time * 60}deg) scale(${1 + Math.sin(time * 3) * 0.2})`,
                  color: "#22c55e",
                  textShadow: `0 0 15px rgba(34, 197, 94, 0.6)`,
                }}
              >
                ✉️
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our products or need gardening advice? We're here to help!
            </p>

            {/* Animated underline */}
            <div
              className="h-1 w-32 mx-auto mt-6 rounded-full"
              style={{
                background: `linear-gradient(${time * 90}deg, #22c55e, #fbbf24, #22c55e)`,
                boxShadow: `0 0 15px rgba(34, 197, 94, 0.5)`,
                width: `${80 + Math.sin(time * 3) * 20}px`,
              }}
            />
          </div>

          {/* Tab navigation */}
          <div className="flex justify-center mb-8 relative z-10">
            <div className="bg-gray-100 rounded-full p-1 flex">
              <button
                onClick={() => setActiveContactTab("form")}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeContactTab === "form" ? "bg-green-600 text-white shadow-lg" : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Contact Form
              </button>
              <button
                onClick={() => setActiveContactTab("info")}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeContactTab === "info" ? "bg-green-600 text-white shadow-lg" : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Contact Info
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 pb-16">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <div
                className={`transition-all duration-500 transform ${
                  activeContactTab === "form"
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10 md:block hidden"
                }`}
              >
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative group">
                      <input
                        type="text"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleFormChange}
                        placeholder="First Name"
                        className="w-full px-6 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                      />
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(${time * 60}deg, transparent, rgba(34, 197, 94, 0.1), transparent)`,
                        }}
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="text"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleFormChange}
                        placeholder="Last Name"
                        className="w-full px-6 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                      />
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(${time * 60}deg, transparent, rgba(34, 197, 94, 0.1), transparent)`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleFormChange}
                      placeholder="Email Address"
                      className="w-full px-6 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                    />
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(${time * 60}deg, transparent, rgba(34, 197, 94, 0.1), transparent)`,
                      }}
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleFormChange}
                      placeholder="Subject"
                      className="w-full px-6 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                    />
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(${time * 60}deg, transparent, rgba(34, 197, 94, 0.1), transparent)`,
                      }}
                    />
                  </div>
                  <div className="relative group">
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleFormChange}
                      rows={5}
                      placeholder="Your Message"
                      className="w-full px-6 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 resize-none"
                    ></textarea>
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(${time * 60}deg, transparent, rgba(34, 197, 94, 0.1), transparent)`,
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="relative w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-[1.02] group overflow-hidden"
                    style={{
                      boxShadow: "0 15px 40px rgba(34, 197, 94, 0.25)",
                    }}
                  >
                    {/* Enhanced button glow effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 70%)`,
                      }}
                    />

                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitted ? "Message Sent!" : "Send Message"}
                      {!isSubmitted && (
                        <svg
                          className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      )}
                      {isSubmitted && (
                        <svg
                          className="w-5 h-5 ml-2 animate-bounce"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>

                    {/* Success particles */}
                    {isSubmitted && (
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 20 }, (_, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full animate-success-particle"
                            style={{
                              width: `${2 + (i % 3)}px`,
                              height: `${2 + (i % 3)}px`,
                              top: "50%",
                              left: "50%",
                              background: i % 3 === 0 ? "#22c55e" : i % 3 === 1 ? "#fbbf24" : "#f59e0b",
                              animationDelay: `${i * 0.05}s`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div
                className={`transition-all duration-500 transform ${
                  activeContactTab === "info" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 md:block hidden"
                }`}
              >
                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <div
                      key={info.id}
                      className="relative group"
                      style={{
                        transform: `translateY(${Math.sin(time * 1.5 + index) * 3}px)`,
                      }}
                    >
                      {/* Ornamental frame */}
                      <div
                        className="absolute -inset-2 opacity-20 pointer-events-none"
                        style={{
                          transform: `rotate(${time * 20 + index * 60}deg) scale(${1 + Math.sin(time * 2 + index) * 0.1})`,
                        }}
                      >
                        <svg viewBox="0 0 150 100" className="w-full h-full">
                          <rect
                            x="5"
                            y="5"
                            width="140"
                            height="90"
                            fill="none"
                            stroke={info.color}
                            strokeWidth="1"
                            strokeDasharray="6,3"
                            rx="15"
                            opacity="0.5"
                          />
                        </svg>
                      </div>

                      <div
                        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-500 group-hover:bg-white"
                        style={{
                          boxShadow: `0 8px 25px rgba(0, 0, 0, 0.08)`,
                        }}
                      >
                        {/* Animated background */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(circle at 50% 50%, ${info.color} 0%, transparent 70%)`,
                          }}
                        />

                        <div className="flex items-start relative z-10">
                          <div
                            className="p-4 rounded-2xl mr-6 transition-all duration-500 group-hover:scale-110"
                            style={{
                              background: `linear-gradient(135deg, ${info.color}20, ${info.color}10)`,
                              color: info.color,
                              boxShadow: `0 4px 15px ${info.color}30`,
                            }}
                          >
                            {info.icon}
                          </div>
                          <div>
                            <h4
                              className="text-xl font-bold text-gray-800 mb-2 transition-all duration-300"
                              style={{
                                color: "#1f2937",
                                textShadow: `0 0 10px ${info.color}20`,
                              }}
                            >
                              {info.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">{info.content}</p>
                          </div>
                        </div>

                        {/* Floating particles on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          {Array.from({ length: 6 }, (_, i) => (
                            <div
                              key={i}
                              className="absolute rounded-full animate-float-up-ornament"
                              style={{
                                width: `${2 + (i % 2)}px`,
                                height: `${2 + (i % 2)}px`,
                                top: `${20 + ((i * 15) % 60)}%`,
                                left: `${20 + ((i * 20) % 60)}%`,
                                background: info.color,
                                opacity: 0.6,
                                animationDelay: `${i * 0.2}s`,
                                animationDuration: `${2 + i * 0.3}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Additional contact methods */}
                  <div className="mt-12 p-6 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl border border-green-100">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
                      Follow Us for Updates
                      <span
                        className="text-sm align-top inline-block ml-1"
                        style={{
                          transform: `rotate(${time * 50}deg) scale(${1 + Math.sin(time * 3) * 0.2})`,
                          color: "#22c55e",
                        }}
                      >
                        🌿
                      </span>
                    </h4>
                    <div className="flex justify-center space-x-4">
                      {socialPlatforms.map((platform, index) => (
                        <button
                          key={platform.id}
                          className="relative w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-500 transform hover:scale-110 group overflow-hidden"
                          style={{
                            background: platform.color,
                            boxShadow: `0 4px 15px ${platform.color}40`,
                          }}
                        >
                          {/* Glow effect */}
                          <div
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
                            }}
                          />

                          <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d={platform.icon} />
                          </svg>

                          {/* Ripple effect */}
                          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-30 group-active:animate-ping"></div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile tab content */}
              <div className="md:hidden">
                {activeContactTab === "form" ? (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleFormChange}
                        placeholder="First Name"
                        className="w-full px-6 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleFormChange}
                        placeholder="Last Name"
                        className="w-full px-6 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleFormChange}
                      placeholder="Email Address"
                      className="w-full px-6 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                    />
                    <input
                      type="text"
                      name="subject"
                      value={formState.subject}
                      onChange={handleFormChange}
                      placeholder="Subject"
                      className="w-full px-6 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
                    />
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleFormChange}
                      rows={5}
                      placeholder="Your Message"
                      className="w-full px-6 py-4 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 resize-none"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-[1.02]"
                    >
                      {isSubmitted ? "Message Sent!" : "Send Message"}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <div
                        key={info.id}
                        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100"
                      >
                        <div className="flex items-start">
                          <div
                            className="p-4 rounded-2xl mr-4"
                            style={{
                              background: `linear-gradient(135deg, ${info.color}20, ${info.color}10)`,
                              color: info.color,
                            }}
                          >
                            {info.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-800 mb-1">{info.title}</h4>
                            <p className="text-gray-600">{info.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up-ornament {
          0% { 
            transform: translateY(0px) scale(0) rotate(0deg); 
            opacity: 0; 
          }
          50% { 
            transform: translateY(-30px) scale(1) rotate(180deg); 
            opacity: 1; 
          }
          100% { 
            transform: translateY(-60px) scale(0) rotate(360deg); 
            opacity: 0; 
          }
        }

        @keyframes success-particle-ornament {
          0% { 
            transform: translate(-50%, -50%) scale(0) rotate(0deg); 
            opacity: 1; 
          }
          100% { 
            transform: translate(-50%, -50%) translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(1.5) rotate(360deg); 
            opacity: 0; 
          }
        }

        @keyframes success-particle {
          0% { 
            transform: translate(-50%, -50%) scale(0) rotate(0deg); 
            opacity: 1; 
          }
          100% { 
            transform: translate(-50%, -50%) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(2) rotate(360deg); 
            opacity: 0; 
          }
        }

        @keyframes fade-in-ornament {
          0% { 
            opacity: 0; 
            transform: translateY(15px) scale(0.9); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px) scale(1); 
          }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-float-up-ornament {
          animation: float-up-ornament infinite ease-out;
        }

        .animate-success-particle-ornament {
          animation: success-particle-ornament 1.5s ease-out forwards;
        }

        .animate-success-particle {
          animation: success-particle 2s ease-out forwards;
        }

        .animate-fade-in-ornament {
          animation: fade-in-ornament 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
