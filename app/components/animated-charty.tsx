"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface CharityProject {
    id: number
    title: string
    description: string
    targetAmount: number
    currentAmount: number
    image: string
    category: string
    impact: string
    location: string
    supporters: number
    daysLeft: number
    featured?: boolean
}

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
        impact: "500+ families fed",
        location: "Downtown District",
        supporters: 234,
        daysLeft: 15,
        featured: true,
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
        impact: "12 schools transformed",
        location: "Metro Schools",
        supporters: 156,
        daysLeft: 22,
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
        impact: "50+ rooftops greened",
        location: "City Center",
        supporters: 312,
        daysLeft: 8,
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
        impact: "1000+ patients helped",
        location: "Medical District",
        supporters: 189,
        daysLeft: 30,
    },
]

function EnhancedCharityCard({
    project,
    index,
    time,
    mousePosition,
}: {
    project: CharityProject
    index: number
    time: number
    mousePosition: { x: number; y: number }
}) {
    const [isHovered, setIsHovered] = useState(false)
    const [isDonating, setIsDonating] = useState(false)
    const [donationAmount, setDonationAmount] = useState(25)
    const [showDonationForm, setShowDonationForm] = useState(false)
    const [isSupported, setIsSupported] = useState(false)
    const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 })
    const cardRef = useRef<HTMLDivElement>(null)

    const progress = (project.currentAmount / project.targetAmount) * 100
    const categoryColors = {
        Community: "#22c55e",
        Education: "#3b82f6",
        Environment: "#10b981",
        Healthcare: "#f59e0b",
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect()
                setLocalMousePos({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                })
            }
        }

        const card = cardRef.current
        card?.addEventListener("mousemove", handleMouseMove)
        return () => card?.removeEventListener("mousemove", handleMouseMove)
    }, [])

    const handleDonate = () => {
        setIsDonating(true)
        setTimeout(() => {
            setIsDonating(false)
            setIsSupported(true)
            setShowDonationForm(false)
            setTimeout(() => setIsSupported(false), 3000)
        }, 2000)
    }

    const quickDonationAmounts = [10, 25, 50, 100]

    return (
        <div
            ref={cardRef}
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transform: `
          translateY(${Math.sin(time * 1.5 + index) * 8}px) 
          rotateZ(${Math.sin(time * 0.8 + index) * 2}deg)
          scale(${isHovered ? 1.02 : 1})
        `,
            }}
        >
            {/* Enhanced ornamental frame */}
            <div
                className="absolute -inset-6 opacity-40 pointer-events-none"
                style={{
                    transform: `rotate(${time * 15 + index * 45}deg) scale(${isHovered ? 1.1 : 1})`,
                }}
            >
                <svg viewBox="0 0 300 400" className="w-full h-full">
                    <rect
                        x="10"
                        y="10"
                        width="280"
                        height="380"
                        fill="none"
                        stroke={categoryColors[project.category as keyof typeof categoryColors]}
                        strokeWidth="3"
                        strokeDasharray="15,8"
                        rx="25"
                        opacity="0.6"
                    />
                    {/* Ornamental corners */}
                    <circle
                        cx="30"
                        cy="30"
                        r="6"
                        fill={categoryColors[project.category as keyof typeof categoryColors]}
                        opacity="0.8"
                    />
                    <circle
                        cx="270"
                        cy="30"
                        r="6"
                        fill={categoryColors[project.category as keyof typeof categoryColors]}
                        opacity="0.8"
                    />
                    <circle
                        cx="30"
                        cy="370"
                        r="6"
                        fill={categoryColors[project.category as keyof typeof categoryColors]}
                        opacity="0.8"
                    />
                    <circle
                        cx="270"
                        cy="370"
                        r="6"
                        fill={categoryColors[project.category as keyof typeof categoryColors]}
                        opacity="0.8"
                    />

                    {/* Decorative elements */}
                    <path d="M150 15 L160 25 L150 35 L140 25 Z" fill="#fbbf24" opacity="0.7" />
                    <path d="M150 365 L160 375 L150 385 L140 375 Z" fill="#fbbf24" opacity="0.7" />
                </svg>
            </div>

            {/* Featured badge */}
            {project.featured && (
                <div
                    className="absolute -top-4 -right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    style={{
                        transform: `rotate(${Math.sin(time * 3) * 10}deg) scale(${1 + Math.sin(time * 4) * 0.1})`,
                        boxShadow: `0 0 20px rgba(251, 191, 36, 0.6)`,
                    }}
                >
                    ⭐ Featured
                </div>
            )}

            {/* Main card */}
            <div
                className="relative bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 border border-gray-100"
                style={{
                    transform: `
            rotateX(${isHovered ? (localMousePos.y - 50) * 0.1 : 0}deg) 
            rotateY(${isHovered ? (localMousePos.x - 50) * 0.1 : 0}deg)
          `,
                    transformStyle: "preserve-3d",
                    boxShadow: isHovered
                        ? `0 30px 80px rgba(0, 0, 0, 0.2), 0 0 50px ${categoryColors[project.category as keyof typeof categoryColors]}40`
                        : "0 20px 50px rgba(0, 0, 0, 0.1)",
                }}
            >
                {/* Animated background pattern */}
                <div
                    className="absolute inset-0 opacity-5 transition-opacity duration-500"
                    style={{
                        background: `
              radial-gradient(circle at ${localMousePos.x}% ${localMousePos.y}%, 
                ${categoryColors[project.category as keyof typeof categoryColors]} 0%, 
                transparent 60%
              ),
              linear-gradient(${time * 30 + index * 60}deg, 
                ${categoryColors[project.category as keyof typeof categoryColors]} 0%, 
                transparent 50%, 
                ${categoryColors[project.category as keyof typeof categoryColors]} 100%
              )
            `,
                        opacity: isHovered ? 0.15 : 0.05,
                    }}
                />

                {/* Floating particles on hover */}
                {isHovered && (
                    <div className="absolute inset-0 pointer-events-none z-10">
                        {Array.from({ length: 15 }, (_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full animate-float-charity-particle"
                                style={{
                                    width: `${3 + (i % 3)}px`,
                                    height: `${3 + (i % 3)}px`,
                                    top: `${20 + ((i * 8) % 60)}%`,
                                    left: `${15 + ((i * 12) % 70)}%`,
                                    background:
                                        i % 3 === 0
                                            ? categoryColors[project.category as keyof typeof categoryColors]
                                            : i % 3 === 1
                                                ? "#22c55e"
                                                : "#fbbf24",
                                    opacity: 0.7,
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: `${2 + i * 0.2}s`,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Image section with enhanced effects */}
                <div className="relative h-56 overflow-hidden">
                    {/* Dynamic gradient overlay */}
                    <div
                        className="absolute inset-0 z-10 transition-all duration-500"
                        style={{
                            background: `
                linear-gradient(${time * 20 + index * 45}deg, 
                  rgba(0,0,0,0.1) 0%, 
                  transparent 30%, 
                  ${categoryColors[project.category as keyof typeof categoryColors]}40 60%, 
                  rgba(0,0,0,0.3) 100%
                )
              `,
                        }}
                    />

                    {/* Animated light rays */}
                    <div
                        className="absolute inset-0 opacity-40 z-10"
                        style={{
                            background: `
                linear-gradient(${time * 80 + index * 60}deg, 
                  transparent 0%, 
                  rgba(251, 191, 36, 0.4) 45%, 
                  rgba(251, 191, 36, 0.6) 50%, 
                  rgba(251, 191, 36, 0.4) 55%, 
                  transparent 100%
                )
              `,
                        }}
                    />

                    <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-all duration-700"
                        style={{
                            transform: `scale(${isHovered ? 1.1 : 1.05}) rotate(${isHovered ? 1 : 0}deg)`,
                            filter: `
                brightness(${isHovered ? 1.1 : 1}) 
                contrast(${isHovered ? 1.2 : 1}) 
                saturate(${isHovered ? 1.3 : 1})
                hue-rotate(${time * 5}deg)
              `,
                        }}
                    />

                    {/* Category badge */}
                    <div
                        className="absolute top-4 left-4 z-20 transition-all duration-500"
                        style={{
                            transform: `scale(${isHovered ? 1.1 : 1}) rotate(${Math.sin(time * 2 + index) * 3}deg)`,
                        }}
                    >
                        <span
                            className="text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm"
                            style={{
                                background: `linear-gradient(135deg, ${categoryColors[project.category as keyof typeof categoryColors]}, ${categoryColors[project.category as keyof typeof categoryColors]}dd)`,
                                boxShadow: `0 4px 15px ${categoryColors[project.category as keyof typeof categoryColors]}50`,
                            }}
                        >
                            {project.category}
                        </span>
                    </div>

                    {/* Days left indicator */}
                    <div
                        className="absolute top-4 right-4 z-20 transition-all duration-500"
                        style={{
                            transform: `translateY(${isHovered ? 0 : 10}px) scale(${isHovered ? 1.1 : 0.9})`,
                            opacity: isHovered ? 1 : 0.8,
                        }}
                    >
                        <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {project.daysLeft} days left
                        </div>
                    </div>

                    {/* Impact indicator */}
                    <div
                        className="absolute bottom-4 left-4 z-20 transition-all duration-500"
                        style={{
                            transform: `translateY(${isHovered ? 0 : 20}px)`,
                            opacity: isHovered ? 1 : 0,
                        }}
                    >
                        <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {project.impact}
                        </div>
                    </div>

                    {/* Location indicator */}
                    <div
                        className="absolute bottom-4 right-4 z-20 transition-all duration-500"
                        style={{
                            transform: `translateY(${isHovered ? 0 : 20}px)`,
                            opacity: isHovered ? 1 : 0,
                        }}
                    >
                        <div className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {project.location}
                        </div>
                    </div>
                </div>

                {/* Content section with enhanced animations */}
                <div className="p-6 relative">
                    {/* Animated background pattern */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            background: `
                radial-gradient(circle at ${localMousePos.x}% ${localMousePos.y}%, 
                  ${categoryColors[project.category as keyof typeof categoryColors]} 0%, 
                  transparent 50%
                ),
                linear-gradient(${time * 45}deg, 
                  #fbbf24 0%, 
                  transparent 50%, 
                  ${categoryColors[project.category as keyof typeof categoryColors]} 100%
                )
              `,
                        }}
                    />

                    {/* Title with dancing letters */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">
                        {project.title.split("").map((letter, i) => (
                            <span
                                key={i}
                                className="inline-block transition-all duration-300"
                                style={{
                                    transform: `
                    translateY(${isHovered ? Math.sin(time * 4 + i * 0.3) * 2 : 0}px) 
                    scale(${isHovered ? 1.05 : 1})
                  `,
                                    color: isHovered ? categoryColors[project.category as keyof typeof categoryColors] : "#1f2937",
                                    textShadow: isHovered
                                        ? `0 0 10px ${categoryColors[project.category as keyof typeof categoryColors]}50`
                                        : "none",
                                }}
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </span>
                        ))}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 relative z-10">{project.description}</p>

                    {/* Enhanced progress section */}
                    <div className="mb-6 relative z-10">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span className="font-bold">{Math.round(progress)}%</span>
                        </div>

                        {/* Animated progress bar */}
                        <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            {/* Background glow */}
                            <div
                                className="absolute inset-0 rounded-full opacity-30"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${categoryColors[project.category as keyof typeof categoryColors]}50, transparent)`,
                                    transform: `translateX(${Math.sin(time * 2) * 100}%)`,
                                }}
                            />

                            {/* Main progress */}
                            <div
                                className="h-3 rounded-full transition-all duration-1000 relative overflow-hidden"
                                style={{
                                    width: `${Math.min(progress, 100)}%`,
                                    background: `linear-gradient(90deg, ${categoryColors[project.category as keyof typeof categoryColors]}, ${categoryColors[project.category as keyof typeof categoryColors]}dd)`,
                                    boxShadow: `0 0 15px ${categoryColors[project.category as keyof typeof categoryColors]}60`,
                                }}
                            >
                                {/* Shimmer effect */}
                                <div
                                    className="absolute inset-0 opacity-50"
                                    style={{
                                        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)`,
                                        transform: `translateX(${Math.sin(time * 3) * 200 - 100}%)`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Enhanced stats grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                        <div
                            className="text-center p-3 rounded-xl border border-gray-100 transition-all duration-500"
                            style={{
                                background: `linear-gradient(135deg, ${categoryColors[project.category as keyof typeof categoryColors]}10, transparent)`,
                                transform: `scale(${isHovered ? 1.05 : 1})`,
                            }}
                        >
                            <div
                                className="text-2xl font-bold mb-1 transition-all duration-300"
                                style={{
                                    color: categoryColors[project.category as keyof typeof categoryColors],
                                    textShadow: `0 0 10px ${categoryColors[project.category as keyof typeof categoryColors]}30`,
                                }}
                            >
                                ${project.currentAmount.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Raised</div>
                        </div>

                        <div
                            className="text-center p-3 rounded-xl border border-gray-100 transition-all duration-500"
                            style={{
                                background: `linear-gradient(135deg, ${categoryColors[project.category as keyof typeof categoryColors]}10, transparent)`,
                                transform: `scale(${isHovered ? 1.05 : 1})`,
                            }}
                        >
                            <div className="text-2xl font-bold text-gray-800 mb-1">${project.targetAmount.toLocaleString()}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Goal</div>
                        </div>
                    </div>

                    {/* Supporters info */}
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div className="flex items-center">
                            <div className="flex -space-x-2">
                                {Array.from({ length: 4 }, (_, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                                        style={{
                                            background: `linear-gradient(135deg, ${categoryColors[project.category as keyof typeof categoryColors]}, ${categoryColors[project.category as keyof typeof categoryColors]}dd)`,
                                            transform: `scale(${isHovered ? 1.1 : 1}) translateY(${Math.sin(time * 2 + i) * 2}px)`,
                                        }}
                                    />
                                ))}
                            </div>
                            <span className="ml-3 text-sm text-gray-600">
                                <span className="font-bold">{project.supporters}</span> supporters
                            </span>
                        </div>
                    </div>

                    {/* Enhanced action buttons */}
                    <div className="space-y-3 relative z-10">
                        {!showDonationForm ? (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDonationForm(true)}
                                    className="flex-1 relative overflow-hidden rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 group"
                                    style={{
                                        background: `linear-gradient(135deg, ${categoryColors[project.category as keyof typeof categoryColors]}, ${categoryColors[project.category as keyof typeof categoryColors]}dd)`,
                                        color: "white",
                                        padding: "12px 24px",
                                        boxShadow: `0 8px 25px ${categoryColors[project.category as keyof typeof categoryColors]}40`,
                                    }}
                                >
                                    {/* Enhanced button glow effect */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)`,
                                        }}
                                    />

                                    <span className="relative z-10 flex items-center justify-center">
                                        Donate Now
                                        <svg
                                            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                    </span>

                                    {/* Ripple effect */}
                                    <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-active:opacity-30 group-active:animate-ping"></div>
                                </button>

                                <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                                    Share
                                </button>
                            </div>
                        ) : (
                            <div
                                className="p-4 rounded-xl border-2 transition-all duration-500"
                                style={{
                                    borderColor: categoryColors[project.category as keyof typeof categoryColors],
                                    background: `linear-gradient(135deg, ${categoryColors[project.category as keyof typeof categoryColors]}05, transparent)`,
                                }}
                            >
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount</label>
                                    <div className="grid grid-cols-4 gap-2 mb-3">
                                        {quickDonationAmounts.map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => setDonationAmount(amount)}
                                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${donationAmount === amount
                                                    ? "text-white shadow-lg"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                                style={{
                                                    background:
                                                        donationAmount === amount
                                                            ? `linear-gradient(135deg, ${categoryColors[project.category as keyof typeof categoryColors]}, ${categoryColors[project.category as keyof typeof categoryColors]}dd)`
                                                            : undefined,
                                                }}
                                            >
                                                ${amount}
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="number"
                                        value={donationAmount}
                                        onChange={(e) => setDonationAmount(Number(e.target.value))}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                                        style={{
                                            focusRingColor: categoryColors[project.category as keyof typeof categoryColors],
                                        }}
                                        placeholder="Custom amount"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleDonate}
                                        disabled={isDonating}
                                        className="flex-1 relative overflow-hidden rounded-lg font-semibold transition-all duration-500 transform hover:scale-105 group disabled:opacity-50"
                                        style={{
                                            background: `linear-gradient(135deg, ${categoryColors[project.category as keyof typeof categoryColors]}, ${categoryColors[project.category as keyof typeof categoryColors]}dd)`,
                                            color: "white",
                                            padding: "10px 20px",
                                        }}
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            {isDonating ? (
                                                <>
                                                    <svg
                                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                `Donate $${donationAmount}`
                                            )}
                                        </span>

                                        {/* Success particles */}
                                        {isSupported && (
                                            <div className="absolute inset-0 pointer-events-none">
                                                {Array.from({ length: 20 }, (_, i) => (
                                                    <div
                                                        key={i}
                                                        className="absolute rounded-full animate-success-particle-charity"
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

                                    <button
                                        onClick={() => setShowDonationForm(false)}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Success message */}
                    {isSupported && (
                        <div
                            className="mt-4 p-3 rounded-xl text-center font-semibold animate-fade-in-charity"
                            style={{
                                background: `linear-gradient(135deg, #22c55e20, #22c55e10)`,
                                color: "#22c55e",
                                textShadow: "0 0 10px rgba(34, 197, 94, 0.3)",
                            }}
                        >
                            🎉 Thank you for your support! 🌱
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function AnimatedCharitySection() {
    const [time, setTime] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [activeFilter, setActiveFilter] = useState("All")
    const [sortBy, setSortBy] = useState("featured")
    const [isInView, setIsInView] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    const filters = ["All", "Community", "Education", "Environment", "Healthcare"]
    const sortOptions = [
        { value: "featured", label: "Featured" },
        { value: "progress", label: "Progress" },
        { value: "amount", label: "Amount Raised" },
        { value: "deadline", label: "Deadline" },
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
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect()
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0
                setIsInView(isVisible)
            }
        }

        const animationFrame = () => {
            setTime(Date.now() * 0.001)
            requestAnimationFrame(animationFrame)
        }

        const section = sectionRef.current
        section?.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("scroll", handleScroll)
        requestAnimationFrame(animationFrame)
        handleScroll()

        return () => {
            section?.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const filteredProjects = charityProjects
        .filter((project) => activeFilter === "All" || project.category === activeFilter)
        .sort((a, b) => {
            switch (sortBy) {
                case "progress":
                    return b.currentAmount / b.targetAmount - a.currentAmount / a.targetAmount
                case "amount":
                    return b.currentAmount - a.currentAmount
                case "deadline":
                    return a.daysLeft - b.daysLeft
                case "featured":
                default:
                    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
            }
        })

    const totalRaised = charityProjects.reduce((sum, project) => sum + project.currentAmount, 0)
    const totalGoal = charityProjects.reduce((sum, project) => sum + project.targetAmount, 0)
    const totalSupporters = charityProjects.reduce((sum, project) => sum + project.supporters, 0)

    return (
        <section id="charity" ref={sectionRef} className="py-32 bg-amber-50 relative overflow-hidden">
            {/* Enhanced animated background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.08), rgba(251, 191, 36, 0.08)), 
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
            linear-gradient(${time * 10}deg, rgba(34, 197, 94, 0.03) 0%, rgba(251, 191, 36, 0.03) 50%, rgba(34, 197, 94, 0.03) 100%)
          `,
                    transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                }}
            />

            {/* Rich garden ornaments */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Large decorative leaves */}
                <div
                    className="absolute w-24 h-24 opacity-20"
                    style={{
                        top: "10%",
                        left: "8%",
                        transform: `rotate(${time * 20 + 45}deg) scale(${1 + Math.sin(time * 2) * 0.2})`,
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-green-400">
                        <path d="M50 10 C30 20, 20 40, 30 60 C40 80, 60 80, 70 60 C80 40, 70 20, 50 10 Z" />
                    </svg>
                </div>

                <div
                    className="absolute w-28 h-28 opacity-15"
                    style={{
                        top: "15%",
                        right: "10%",
                        transform: `rotate(${-time * 15 + 120}deg) scale(${1 + Math.cos(time * 1.8) * 0.3})`,
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-green-300">
                        <path d="M50 5 C25 15, 15 35, 25 55 C35 75, 65 75, 75 55 C85 35, 75 15, 50 5 Z" />
                    </svg>
                </div>

                {/* Decorative flowers */}
                <div
                    className="absolute w-20 h-20 opacity-30"
                    style={{
                        top: "40%",
                        left: "12%",
                        transform: `rotate(${time * 25}deg) scale(${1 + Math.sin(time * 3) * 0.15})`,
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="20" r="15" fill="#fbbf24" />
                        <circle cx="80" cy="50" r="15" fill="#fbbf24" />
                        <circle cx="50" cy="80" r="15" fill="#fbbf24" />
                        <circle cx="20" cy="50" r="15" fill="#fbbf24" />
                        <circle cx="50" cy="50" r="12" fill="#f59e0b" />
                    </svg>
                </div>

                <div
                    className="absolute w-22 h-22 opacity-25"
                    style={{
                        top: "45%",
                        right: "15%",
                        transform: `rotate(${-time * 20}deg) scale(${1 + Math.cos(time * 2.5) * 0.2})`,
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="15" r="18" fill="#22c55e" />
                        <circle cx="85" cy="50" r="18" fill="#22c55e" />
                        <circle cx="50" cy="85" r="18" fill="#22c55e" />
                        <circle cx="15" cy="50" r="18" fill="#22c55e" />
                        <circle cx="50" cy="50" r="15" fill="#16a34a" />
                    </svg>
                </div>

                {/* Enhanced floating particles */}
                {Array.from({ length: 35 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: `${4 + (i % 5) * 2}px`,
                            height: `${4 + (i % 5) * 2}px`,
                            top: `${8 + ((i * 7) % 84)}%`,
                            left: `${6 + ((i * 11) % 88)}%`,
                            background:
                                i % 5 === 0
                                    ? "#22c55e"
                                    : i % 5 === 1
                                        ? "#fbbf24"
                                        : i % 5 === 2
                                            ? "#16a34a"
                                            : i % 5 === 3
                                                ? "#f59e0b"
                                                : "#10b981",
                            opacity: 0.25 + (i % 5) * 0.1,
                            transform: `
                translate(${Math.sin(time * (1 + i * 0.1)) * 30}px, ${Math.cos(time * (1.2 + i * 0.1)) * 25}px) 
                scale(${1 + Math.sin(time * (2 + i * 0.2)) * 0.5})
              `,
                            boxShadow: `0 0 ${6 + (i % 5) * 3}px rgba(34, 197, 94, 0.3)`,
                        }}
                    />
                ))}

                {/* Butterfly ornaments */}
                <div
                    className="absolute w-12 h-10 opacity-40"
                    style={{
                        top: "55%",
                        left: "25%",
                        transform: `
              translate(${Math.sin(time * 2) * 50}px, ${Math.cos(time * 1.5) * 30}px) 
              rotate(${Math.sin(time * 3) * 25}deg)
            `,
                    }}
                >
                    <svg viewBox="0 0 100 60" className="w-full h-full">
                        <ellipse cx="25" cy="20" rx="20" ry="14" fill="#fbbf24" opacity="0.8" />
                        <ellipse cx="75" cy="20" rx="20" ry="14" fill="#fbbf24" opacity="0.8" />
                        <ellipse cx="25" cy="40" rx="17" ry="12" fill="#f59e0b" opacity="0.8" />
                        <ellipse cx="75" cy="40" rx="17" ry="12" fill="#f59e0b" opacity="0.8" />
                        <line x1="50" y1="10" x2="50" y2="50" stroke="#92400e" strokeWidth="4" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Enhanced ornamental header */}
                <div className="text-center mb-20">
                    <div className="relative inline-block">
                        {/* Decorative frame around title */}
                        <div
                            className="absolute -top-16 -left-16 w-10 h-10 opacity-40"
                            style={{
                                transform: `rotate(${time * 40}deg) scale(${1 + Math.sin(time * 4) * 0.2})`,
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="w-full h-full fill-yellow-400">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>

                        <div
                            className="absolute -top-12 -right-12 w-8 h-8 opacity-35"
                            style={{
                                transform: `rotate(${-time * 50}deg) scale(${1 + Math.cos(time * 3) * 0.3})`,
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="w-full h-full fill-green-400">
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                        </div>

                        <div
                            className="absolute -bottom-12 -left-12 w-6 h-6 opacity-45"
                            style={{
                                transform: `rotate(${time * 45}deg) scale(${1 + Math.sin(time * 2.5) * 0.25})`,
                            }}
                        >
                            <svg viewBox="0 0 12 12" className="w-full h-full fill-pink-400">
                                <polygon points="6,0 8,4 12,4 9,7 10,12 6,9 2,12 3,7 0,4 4,4" />
                            </svg>
                        </div>

                        <div
                            className="absolute -bottom-8 -right-16 w-5 h-5 opacity-30"
                            style={{
                                transform: `rotate(${-time * 35}deg) scale(${1 + Math.cos(time * 2) * 0.2})`,
                            }}
                        >
                            <svg viewBox="0 0 12 12" className="w-full h-full fill-purple-400">
                                <polygon points="6,0 8,4 12,4 9,7 10,12 6,9 2,12 3,7 0,4 4,4" />
                            </svg>
                        </div>

                        {/* Enhanced title with dancing letters */}
                        <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 relative">
                            {"Our Garden Projects".split("").map((letter, i) => (
                                <span
                                    key={i}
                                    className="inline-block transition-all duration-300"
                                    style={{
                                        transform: `
                      translateY(${Math.sin(time * 3 + i * 0.2) * 6}px) 
                      scale(${1 + Math.sin(time * 4 + i * 0.15) * 0.05})
                    `,
                                        color: letter === " " ? "transparent" : "#1f2937",
                                        textShadow: `0 0 20px rgba(34, 197, 94, ${0.1 + Math.sin(time * 2 + i) * 0.1})`,
                                    }}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </span>
                            ))}

                            {/* Animated decorative elements */}
                            <span
                                className="text-3xl md:text-5xl align-top inline-block ml-3"
                                style={{
                                    transform: `rotate(${time * 70}deg) scale(${1 + Math.sin(time * 5) * 0.3})`,
                                    color: "#fbbf24",
                                    textShadow: `0 0 30px rgba(251, 191, 36, 0.8)`,
                                }}
                            >
                                🌱
                            </span>
                        </h2>

                        {/* Enhanced decorative underline */}
                        <div
                            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-1 opacity-60 rounded-full"
                            style={{
                                width: `${140 + Math.sin(time * 3) * 40}px`,
                                background: `linear-gradient(${time * 90}deg, #22c55e, #fbbf24, #22c55e)`,
                                boxShadow: `0 0 20px rgba(34, 197, 94, 0.5)`,
                            }}
                        />
                    </div>

                    <p
                        className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-8"
                        style={{
                            textShadow: `0 0 15px rgba(34, 197, 94, 0.1)`,
                        }}
                    >
                        Supporting community gardens and green initiatives to make our world a better place
                    </p>
                </div>

                {/* Enhanced stats section */}
                <div
                    className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
                    style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "translateY(0)" : "translateY(30px)",
                        transition: "all 0.8s ease-out",
                    }}
                >
                    {[
                        { label: "Total Raised", value: `$${totalRaised.toLocaleString()}`, color: "#22c55e" },
                        { label: "Total Goal", value: `$${totalGoal.toLocaleString()}`, color: "#fbbf24" },
                        { label: "Total Supporters", value: totalSupporters.toLocaleString(), color: "#3b82f6" },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="relative text-center p-8 rounded-3xl border border-gray-200 overflow-hidden group"
                            style={{
                                background: `linear-gradient(135deg, ${stat.color}10, transparent)`,
                                transform: `translateY(${Math.sin(time * 1.5 + index) * 5}px)`,
                                boxShadow: `0 10px 30px ${stat.color}20`,
                            }}
                        >
                            {/* Animated background */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, ${stat.color} 0%, transparent 70%)`,
                                }}
                            />

                            <div
                                className="text-4xl md:text-5xl font-bold mb-2 relative z-10 transition-all duration-500"
                                style={{
                                    color: stat.color,
                                    textShadow: `0 0 20px ${stat.color}40`,
                                    transform: `scale(${1 + Math.sin(time * 2 + index) * 0.05})`,
                                }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-gray-600 font-medium uppercase tracking-wide relative z-10">{stat.label}</div>

                            {/* Floating particles */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                {Array.from({ length: 8 }, (_, i) => (
                                    <div
                                        key={i}
                                        className="absolute rounded-full animate-float-charity-particle"
                                        style={{
                                            width: `${2 + (i % 2)}px`,
                                            height: `${2 + (i % 2)}px`,
                                            top: `${20 + ((i * 15) % 60)}%`,
                                            left: `${20 + ((i * 20) % 60)}%`,
                                            background: stat.color,
                                            opacity: 0.6,
                                            animationDelay: `${i * 0.2}s`,
                                            animationDuration: `${2 + i * 0.3}s`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced filter and sort controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    {/* Filter buttons */}
                    <div className="flex flex-wrap gap-3">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 ${activeFilter === filter ? "text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                                    }`}
                                style={{
                                    background: activeFilter === filter ? `linear-gradient(135deg, #22c55e, #16a34a)` : undefined,
                                    boxShadow:
                                        activeFilter === filter ? "0 8px 25px rgba(34, 197, 94, 0.4)" : "0 4px 15px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Sort dropdown */}
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-6 py-3 bg-white border border-gray-200 rounded-full font-semibold text-gray-700 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-300 appearance-none pr-12"
                            style={{
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    Sort by {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Enhanced projects grid */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="animate-fade-in-charity"
                            style={{
                                animationDelay: `${index * 0.2}s`,
                                animationFillMode: "forwards",
                                opacity: 1,
                            }}
                        >
                            <EnhancedCharityCard project={project} index={index} time={time} mousePosition={mousePosition} />
                        </div>
                    ))}
                </div>

                {/* Enhanced CTA section */}
                <div className="text-center">
                    <div
                        className="relative inline-block p-8 rounded-3xl border border-green-200 overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(251, 191, 36, 0.1))`,
                            boxShadow: "0 20px 50px rgba(34, 197, 94, 0.2)",
                        }}
                    >
                        {/* Animated background pattern */}
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                background: `
                  radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                    rgba(34, 197, 94, 0.3) 0%, 
                    transparent 50%
                  ),
                  linear-gradient(${time * 30}deg, 
                    rgba(34, 197, 94, 0.1) 0%, 
                    rgba(251, 191, 36, 0.1) 50%, 
                    rgba(34, 197, 94, 0.1) 100%
                  )
                `,
                            }}
                        />

                        <div className="relative z-10">
                            <h3
                                className="text-3xl font-bold text-gray-800 mb-4"
                                style={{
                                    textShadow: `0 0 20px rgba(34, 197, 94, 0.2)`,
                                }}
                            >
                                Want to start your own project?
                                <span
                                    className="text-xl align-top inline-block ml-2"
                                    style={{
                                        transform: `rotate(${time * 60}deg) scale(${1 + Math.sin(time * 3) * 0.2})`,
                                        color: "#fbbf24",
                                    }}
                                >
                                    💡
                                </span>
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                Join our community of changemakers and create positive impact in your neighborhood
                            </p>

                            <button
                                className="relative bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 group overflow-hidden"
                                style={{
                                    boxShadow: "0 15px 40px rgba(34, 197, 94, 0.3)",
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
                                    <span>View All Projects</span>
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
                </div>
            </div>

            <style jsx>{`
        @keyframes float-charity-particle {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotate(0deg); 
            opacity: 0.7; 
          }
          25% { 
            transform: translateY(-20px) scale(1.3) rotate(90deg); 
            opacity: 0.9; 
          }
          50% { 
            transform: translateY(-35px) scale(0.8) rotate(180deg); 
            opacity: 1; 
          }
          75% { 
            transform: translateY(-15px) scale(1.1) rotate(270deg); 
            opacity: 0.8; 
          }
        }

        @keyframes success-particle-charity {
          0% { 
            transform: translate(-50%, -50%) scale(0) rotate(0deg); 
            opacity: 1; 
          }
          100% { 
            transform: translate(-50%, -50%) translate(${Math.random() * 120 - 60}px, ${Math.random() * 120 - 60}px) scale(2) rotate(360deg); 
            opacity: 0; 
          }
        }

        @keyframes fade-in-charity {
          0% { 
            opacity: 0.8; 
            transform: translateY(20px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0px) scale(1); 
          }
        }

        .animate-float-charity-particle {
          animation: float-charity-particle infinite ease-in-out;
        }

        .animate-success-particle-charity {
          animation: success-particle-charity 2s ease-out forwards;
        }

        .animate-fade-in-charity {
          animation: fade-in-charity 0.8s ease-out forwards;
        }
      `}</style>
        </section>
    )
}
