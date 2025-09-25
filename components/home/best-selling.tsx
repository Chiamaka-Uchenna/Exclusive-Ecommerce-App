"use client"

import { useState, useEffect } from "react"
import { api } from "@/services/api"
import ProductCard from "@/components/ui/product-card"
import SectionHeader from "@/components/ui/section-header"
import type { Product } from "@/types"

export default function BestSelling() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await api.getProducts(4, 8)
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch best selling products:", error)
        setError("Failed to load best selling products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader title="Best Selling Products" subtitle="This Month" showViewAll viewAllHref="/products" />
        <p className="text-center text-red-500">{error}</p>
      </section>
    )
  }

  if (!products.length) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader title="Best Selling Products" subtitle="This Month" showViewAll viewAllHref="/products" />
        <p className="text-center text-gray-600 dark:text-gray-300">No best selling products available.</p>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader title="Best Selling Products" subtitle="This Month" showViewAll viewAllHref="/products" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}