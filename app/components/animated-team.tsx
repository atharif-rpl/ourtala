"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Assuming this is the structure of your team members
interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
}

// Sample team members (replace with your actual data)
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Green",
    role: "Founder & Plant Expert",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Plant enthusiast with 10+ years of experience in urban gardening.",
  },
  {
    id: 2,
    name: "Jamie Flowers",
    role: "Garden Designer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Specializes in small space garden design and vertical gardens.",
  },
  {
    id: 3,
    name: "Sam Roots",
    role: "Sustainability Lead",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Passionate about eco-friendly gardening practices and education.",
  },
  {
    id: 4,
    name: "Taylor Bloom",
    role: "Customer Experience",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Ensures every customer finds their perfect plant companions.",
  },
]

function TeamCard({ member }: { member: TeamMember }) {
  const [isHovered, setIsHovered] = useState(false)
  const [randomDelay] = useState(() => Math.random() * 2)
  const [randomDuration] = useState(() => 3 + Math.random() * 2)

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Simplified background elements - reduced blur and animations */}
      <div
        className="absolute -inset-1 bg-gradient-to-r from-green-400 via-green-300 to-yellow-300 rounded-2xl opacity-70 blur-sm group-hover:opacity-100 transition duration-500"
        style={{ animationDelay: `${randomDelay}s` }}
      ></div>

      <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 z-10 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:-translate-y-1">
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            width={300}
            height={300}
            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
        </div>

        <div className="p-6 relative">
          {/* Name with animated underline */}
          <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-green-600 transition-colors duration-300">
            {member.name}
            <span className="block h-0.5 w-0 group-hover:w-full bg-green-500 transition-all duration-500 mt-0.5"></span>
          </h3>

          {/* Role with simplified animation */}
          <div className="inline-block relative mb-3">
            <span className="relative z-10 text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
              {member.role}
            </span>
          </div>

          {/* Bio with animated reveal */}
          <p className="text-gray-600 relative overflow-hidden">
            <span
              className={`transition-transform duration-300 block ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              {member.bio}
            </span>
          </p>

          {/* Social icons with simplified animation */}
          <div className="mt-4 flex space-x-3">
            {[1, 2, 3].map((_, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition-all duration-300 transform ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d={
                      i === 0
                        ? "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                        : i === 1
                          ? "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"
                          : "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    }
                  ></path>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AnimatedTeamSection() {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        setIsInView(isVisible)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section id="team" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Simplified background elements - reduced number and complexity */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-green-300/20 rounded-full blur-lg"></div>
      <div className="absolute top-20 left-1/3 w-12 h-12 bg-yellow-300/30 rounded-full blur-md"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 relative">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase relative z-10">
              Our Team
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-yellow-300 rounded-full opacity-30 blur"></div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Meet Our <span className="text-green-600">Green</span> Team
            <span className="text-3xl md:text-5xl align-top">*</span>
          </h2>

          {/* Simplified underline */}
          <span className="block h-1 w-24 mx-auto bg-gradient-to-r from-green-400 to-yellow-300 mt-2"></span>

          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-6">
            Passionate plant lovers dedicated to bringing nature into your home
            <span className="block mt-2 text-lg text-gray-500">
              United by our love for gardening and sustainable living
            </span>
          </p>
        </div>

        {/* Team grid with simplified animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div key={member.id} className="opacity-0 animate-fade-in">
              <TeamCard member={member} />
            </div>
          ))}
        </div>

        {/* Team stats section with simplified animations */}
        <div
          className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-10 shadow-lg border border-green-100 relative overflow-hidden transform transition-all duration-700"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(50px)",
          }}
        >
          {/* Simplified background decorative pattern */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-200/20 to-transparent rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-200/20 to-transparent rounded-full -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Why Our Team Rocks
                <span className="block h-0.5 w-24 mx-auto bg-green-400 mt-2"></span>
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Combined experience and passion that makes the difference in everything we do
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "15+", label: "Years Experience" },
                { value: "500+", label: "Gardens Created" },
                { value: "24/7", label: "Support Available" },
                { value: "100%", label: "Satisfaction Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 hover:border-green-200 relative overflow-hidden"
                    style={{
                      opacity: isInView ? 1 : 0,
                      transform: isInView ? "translateY(0)" : "translateY(20px)",
                      transition: `transform 0.5s ease-out ${0.2 + index * 0.1}s, opacity 0.5s ease-out ${0.2 + index * 0.1}s`,
                    }}
                  >
                    <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-600 uppercase tracking-wide group-hover:text-green-700 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to action with simplified animations */}
            <div className="text-center mt-12 pt-8 border-t border-green-100">
              <p className="text-lg text-gray-600 mb-6">Want to join our growing team of garden enthusiasts?</p>
              <button className="relative bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg group overflow-hidden">
                {/* Button background animation - simplified */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                {/* Button text */}
                <span className="relative z-10">Join Our Team</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          animation-delay: calc(var(--index, 0) * 0.1s);
        }
        
        .grid > div:nth-child(1) { --index: 1; }
        .grid > div:nth-child(2) { --index: 2; }
        .grid > div:nth-child(3) { --index: 3; }
        .grid > div:nth-child(4) { --index: 4; }
      `}</style>
    </section>
  )
}
