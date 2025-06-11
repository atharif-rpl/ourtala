"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Interface dan data tim
interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
  specialty: string
  experience: string
  social: { // Pastikan interface ini ada
    linkedin?: string
    twitter?: string
    instagram?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Green",
    role: "Founder & Plant Expert",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Plant enthusiast with 10+ years of experience in urban gardening.",
    specialty: "Urban Gardening",
    experience: "10+ Years",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Jamie Flowers",
    role: "Garden Designer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Specializes in small space garden design and vertical gardens.",
    specialty: "Vertical Gardens",
    experience: "8+ Years",
    social: {
      twitter: "#",
      instagram: "#",
    },
  },
  {
    id: 3,
    name: "Sam Roots",
    role: "Sustainability Lead",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Passionate about eco-friendly gardening practices and education.",
    specialty: "Eco-Friendly Practices",
    experience: "12+ Years",
    social: {
      linkedin: "#",
    },
  },
  {
    id: 4,
    name: "Taylor Bloom",
    role: "Customer Experience",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Ensures every customer finds their perfect plant companions.",
    specialty: "Customer Relations",
    experience: "6+ Years",
    social: {
      linkedin: "#",
      instagram: "#",
      twitter: "#",
    },
  },
]

// Komponen Kartu Tim yang Disederhanakan
function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animationFrame = () => {
      setTime(Date.now() * 0.001)
      requestAnimationFrame(animationFrame)
    }
    requestAnimationFrame(animationFrame)

    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    const card = cardRef.current
    card?.addEventListener("mousemove", handleMouseMove)
    return () => card?.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `translateY(${Math.sin(time * 2 + index) * 4}px)`,
      }}
    >
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-60 blur transition-all duration-500"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(34, 197, 94, 0.5) 0%, 
              rgba(251, 191, 36, 0.3) 40%, 
              transparent 70%
            )
          `,
        }}
      ></div>
      <div
        className="relative bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 z-10"
        style={{
          transform: `
            scale(${isHovered ? 1.05 : 1}) 
            rotateX(${isHovered ? (mousePosition.y - 50) * 0.15 : 0}deg) 
            rotateY(${isHovered ? (mousePosition.x - 50) * -0.15 : 0}deg)
          `,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            width={300}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: `scale(${isHovered ? 1.2 : 1.1})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div
            className="absolute top-4 right-4 z-20 transition-all duration-300"
            style={{
              transform: `scale(${isHovered ? 1.1 : 1})`,
            }}
          >
            <span className="bg-white/90 backdrop-blur-sm text-green-700 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {member.specialty}
            </span>
          </div>
          <div
            className="absolute bottom-4 left-4 z-20 transition-all duration-300"
            style={{
              transform: `translateY(${isHovered ? 0 : 20}px)`,
              opacity: isHovered ? 1 : 0,
            }}
          >
            <span className="bg-yellow-400/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {member.experience}
            </span>
          </div>
        </div>
        <div className="p-6 relative">
          <h3 className="text-xl font-bold text-gray-800 mb-1 transition-colors duration-300 group-hover:text-green-600">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-green-700 mb-3">{member.role}</p>
          <p className="text-gray-600 text-sm mb-4 h-12">{member.bio}</p>

          {/* ===== BAGIAN IKON SOSIAL YANG DIPERBAIKI ===== */}
          <div
            className="flex space-x-2 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
            }}
          >
            {member.social.linkedin && (
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"></path></svg>
              </a>
            )}
            {member.social.twitter && (
              <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path></svg>
              </a>
            )}
            {member.social.instagram && (
              <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-700 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2.163c2.67 0 2.987.01 4.042.059 2.71.123 3.976 1.409 4.099 4.099.048 1.054.057 1.37.057 4.042 0 2.672-.01 2.988-.057 4.042-.123 2.69-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.061 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"></path></svg>
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

// Komponen Section Wrapper
export default function SimplifiedTeamSection() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setIsInView(rect.top < window.innerHeight && rect.bottom > 0)
      }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="team" ref={sectionRef} className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Meet Our Green Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate plant lovers dedicated to bringing nature into your home.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="transition-all duration-1000"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(50px)",
                transitionDelay: `${index * 0.15}s`,
              }}
            >
              <TeamCard member={member} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}