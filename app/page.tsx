"use client"

import { useState } from "react"
import Image from "next/image"
import AnimatedHero from "./components/animated-hero"
import AnimatedGallery from "./components/animated-gallery"
import AnimatedTeamSection from "./components/animated-team"
import NavBar from "./components/navbar"
import AnimatedSocialSection from "./components/animated-social"
import AnimatedCharitySection from "./components/animated-charty"
import AnimatedAbout from "./components/animated-about"
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
}: {
  product: {
    id: number
    name: string
    price: number
    weight: string
    image: string
  }
}) {
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
      <AnimatedAbout />

      {/* Charity Section */}
      <AnimatedCharitySection />

      {/* Team Section */}
      <AnimatedTeamSection />

      {/* Gallery Section */}
      <AnimatedGallery />

      {/* Social Media Section */}
      <AnimatedSocialSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4">
              Ourtala
              <span className="text-2xl align-top">*</span>
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
