import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Custom keyframes for intro animation
        "drop-in-bounce": {
          "0%": { opacity: "0", transform: "translateY(-200%) rotate(-90deg) scale(0.5)" },
          "60%": { opacity: "1", transform: "translateY(10%) rotate(10deg) scale(1.05)" },
          "80%": { transform: "translateY(-5%) rotate(-5deg) scale(0.98)" },
          "100%": { transform: "translateY(0) rotate(0deg) scale(1)" },
        },
        "logo-pulse": {
          "0%, 100%": { transform: "scale(1)", filter: "brightness(1)" },
          "50%": { transform: "scale(1.1)", filter: "brightness(1.2)" },
        },
        "fall-out-spin": {
          "0%": { opacity: "1", transform: "translateY(0) rotate(0deg) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-150%) rotate(180deg) scale(0.5)" },
        },
        "bg-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "bg-float": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Custom animations for intro
        "intro-slam": "logo-slam-in 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
        "intro-vibrate": "logo-vibrate 0.5s ease-in-out infinite",
        "intro-burst": "logo-burst-out 0.8s ease-in forwards",
        "bg-burst-anim": "bg-element-burst 1s ease-out forwards",
        "bg-float-anim": "bg-element-float 6s ease-in-out infinite alternate",
        "bg-exit-anim": "bg-fade-out-slide 0.7s ease-in forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
