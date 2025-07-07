"use client"

import { useEffect, useState } from "react"
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
          <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">{project.category}</span>
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
              className="bg-amber-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Raised</p>
            <p className="font-bold text-amber-600">${project.currentAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Goal</p>
            <p className="font-bold text-gray-800">${project.targetAmount.toLocaleString()}</p>
          </div>
        </div>
        <button className="w-full bg-amber-600 text-white py-2 rounded-full font-medium hover:bg-amber-700 transition-all duration-300">
          Donate Now
        </button>
      </div>
    </div>
  )
}

export default function AnimatedCharitySection() {
  const [time, setTime] = useState(0)

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
    const animationFrame = () => {
      setTime(Date.now() * 0.001)
      requestAnimationFrame(animationFrame)
    }
    requestAnimationFrame(animationFrame)
  }, [])

  return (
    <section id="charity" className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-amber-100/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-100/40 rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-amber-100 text-amber-800 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase">
              Our Projects
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Making a Difference
            <span className="text-amber-600"> Together</span>
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
              className="opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: "forwards",
              }}
            >
              <CharityCard project={project} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12 border border-amber-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to Make an Impact?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every contribution, no matter how small, helps us create greener communities and a more sustainable future
              for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105">
                Start a Project
              </button>
              <button className="border border-amber-600 text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

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
