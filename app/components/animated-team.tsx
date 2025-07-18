"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
  social: { linkedin?: string; twitter?: string; instagram?: string }
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 shadow-lg flex flex-col items-center text-center transform hover:scale-[1.02] transition-all duration-300 group">
      <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-emerald-200 shadow-md">
        <Image
          src={member.image || "/placeholder.svg"}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-330 group-hover:scale-105"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
      <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{member.bio}</p>

      {/* Social Links - Always visible and styled for minimalism */}
      <div className="flex justify-center space-x-3 mt-auto">
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-50/50 text-emerald-700 p-2 rounded-full hover:bg-emerald-100 transition-colors duration-200"
            aria-label={`LinkedIn of ${member.name}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
        {member.social.twitter && (
          <a
            href={member.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-50/50 text-emerald-700 p-2 rounded-full hover:bg-emerald-100 transition-colors duration-200"
            aria-label={`Twitter of ${member.name}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
        )}
        {member.social.instagram && (
          <a
            href={member.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-50/50 text-emerald-700 p-2 rounded-full hover:bg-emerald-100 transition-colors duration-200"
            aria-label={`Instagram of ${member.name}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

export default function AnimatedTeamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Passionate environmentalist with 10+ years experience in sustainable agriculture and community development.",
      image: "/placeholder.svg?height=300&width=300",
      social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Operations",
      bio: "Expert in urban farming and hydroponic systems, dedicated to making gardening accessible to everyone.",
      image: "/placeholder.svg?height=300&width=300",
      social: { linkedin: "#", instagram: "#" },
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Community Manager",
      bio: "Building bridges between communities and sustainable practices through education and engagement.",
      image: "/placeholder.svg?height=300&width=300",
      social: { twitter: "#", instagram: "#" },
    },
    {
      id: 4,
      name: "David Kim",
      role: "Technology Lead",
      bio: "Developing innovative solutions to connect gardeners and optimize growing conditions through technology.",
      image: "/placeholder.svg?height=300&width=300",
      social: { linkedin: "#", twitter: "#" },
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
      id="team"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-50 relative overflow-hidden"
    >
      {/* Background decorations - Aligned with Hero & About */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-teal-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-lime-300/15 rounded-full blur-lg animate-pulse delay-2000"></div>
        {/* Additional subtle shapes */}
        <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-lime-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-teal-100/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Aligned with Hero & About */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-block mb-4">
            <span className="bg-white/80 backdrop-blur-sm text-emerald-800 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase border border-emerald-200 shadow-sm">
              Our Team
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Meet the
            <span className="bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600 bg-clip-text text-transparent">
              Changemakers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team of passionate individuals is dedicated to creating a more sustainable and green future for
            communities worldwide.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TeamCard member={member} />
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-emerald-100 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Want to Join Our Mission?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who share our vision of creating sustainable communities.
              Join us in making a difference!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105">
                View Open Positions
              </button>
              <button className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
