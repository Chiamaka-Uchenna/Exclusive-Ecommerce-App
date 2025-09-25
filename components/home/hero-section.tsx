"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Icons } from "@/components/ui/icons"
import { api } from "@/services/api"

interface Category {
  id: number
  name: string
  slug: string
  image: string
  creationAt: string
  updatedAt: string
}

const heroSlides = [
  {
    id: 1,
    title: "iPhone 14 Series",
    subtitle: "Up to 10% off Voucher",
    image: "/iphone-14-pink.jpg",
    cta: "Shop Now",
    href: "/category/electronics",
  },
  {
    id: 2,
    title: "Gaming Collection",
    subtitle: "Up to 30% off Gaming Gear",
    image: "/ultimate-gaming-setup.png",
    cta: "Shop Now",
    href: "/category/electronics", // Updated to match API slug; no "gaming" category in API
  },
  {
    id: 3,
    title: "Fashion Week",
    subtitle: "New Arrivals 50% off",
    image: "/fashion-clothes.jpg",
    cta: "Shop Now",
    href: "/category/clothes",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await api.getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        setError("Failed to load categories. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  // Map category names to valid Icons component keys
  const iconMap: Record<string, keyof typeof Icons> = {
    Clothes: "shirt",
    Electronics: "computer",
    Furniture: "home",
    Shoes: "footprints",
    Miscellaneous: "package"
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Categories</h3>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : !categories.length ? (
              <p className="text-center text-gray-600 dark:text-gray-300">No categories available.</p>
            ) : (
              <ul className="space-y-3">
                {categories.map((category) => {
                  const IconComponent = Icons[iconMap[category.name] || "package"]
                  return (
                    <li key={category.id}>
                      <Link
                        href={`/category/${category.slug}`}
                        className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {category.name}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Hero Carousel */}
        <div className="flex-1 relative">
          <div className="relative h-96 lg:h-[400px] bg-black rounded-lg overflow-hidden">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex items-center justify-between h-full px-8 lg:px-16">
                  <div className="text-white z-10 max-w-md">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">{slide.title}</h1>
                    <p className="text-lg mb-6 text-gray-200">{slide.subtitle}</p>
                    <Link
                      href={slide.href}
                      className="inline-flex items-center space-x-2 text-white border-b-2 border-white pb-1 hover:border-gray-300 transition-colors"
                    >
                      <span>{slide.cta}</span>
                      <Icons.chevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                    <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-contain" />
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <Icons.chevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
            >
              <Icons.chevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "bg-red-500" : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}