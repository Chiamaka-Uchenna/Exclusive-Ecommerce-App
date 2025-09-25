"use client"

import { Icons } from "@/components/ui/icons"
import SectionHeader from "@/components/ui/section-header"
import { api } from "@/services/api"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Category {
  id: number
  name: string
  slug: string
  image: string
  creationAt: string
  updatedAt: string
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await api.getCategories()
        console.log("Fetched categories:", data) // Debug log to verify data
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        setError("Failed to load categories. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader title="Browse By Category" subtitle="Categories" />
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader title="Browse By Category" subtitle="Categories" />
        <p className="text-center text-red-500">{error}</p>
      </section>
    )
  }

  if (!categories.length) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader title="Browse By Category" subtitle="Categories" />
        <p className="text-center text-gray-600 dark:text-gray-300">No categories available.</p>
      </section>
    )
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader title="Browse By Category" subtitle="Categories" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => {
          const IconComponent = Icons[iconMap[category.name] || "package"]
          return (
            <div
              key={category.id}
              className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-500 dark:hover:bg-red-500 rounded-lg p-6 text-center cursor-pointer transition-all duration-300"
              onClick={() => router.push(`/category/${category.slug}`)}
            >
              <IconComponent className="w-12 h-12 mx-auto mb-4 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" />
              <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-white transition-colors">
                {category.name}
              </h3>
            </div>
          )
        })}
      </div>

      <hr className="border-gray-200 dark:border-gray-700 mt-16" />
    </section>
  )
}