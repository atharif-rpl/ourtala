"use client"

import { useEffect, useState, useRef } from "react"
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

function CharityCard({ project }: { project: CharityProject }) {
  const progress = (project.currentAmount / project.targetAmount) * 100
  const formattedCurrentAmount = project.currentAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  const formattedTargetAmount = project.targetAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 border border-emerald-100">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
        {" "}
        {/* Adjust height based on image height */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{project.description}</p>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2 font-medium">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-emerald-100 rounded-full h-2.5">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">Raised</p>
            <p className="font-bold text-emerald-600 text-lg">{formattedCurrentAmount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 text-right">Goal</p>
            <p className="font-bold text-gray-800 text-lg">{formattedTargetAmount}</p>
          </div>
        </div>
        <button className="w-full bg-emerald-600 text-white py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md">
          Donate Now
        </button>
      </div>
    </div>
  )
}

export default function AnimatedCharitySection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="charity"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-50 relative overflow-hidden"
    >
      {/* Background decorations - Aligned with Hero, About, Team */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-teal-200/15 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-lime-300/15 rounded-full blur-lg animate-pulse delay-2000"></div>
        {/* Additional subtle shapes */}
        <div className="absolute top-1/4 right-1/3 w-28 h-28 bg-lime-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-teal-100/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Aligned with Hero, About, Team */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-block mb-4">
            <span className="bg-white/80 backdrop-blur-sm text-emerald-800 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase border border-emerald-200 shadow-sm">
              Our Projects
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Making a Difference
            <span className="bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in creating sustainable communities through innovative garden projects that transform lives and
            environments.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {charityProjects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CharityCard project={project} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-emerald-100 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to Make an Impact?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every contribution, no matter how small, helps us create greener communities and a more sustainable future
              for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                Start a Project
              </button>
              <button className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
