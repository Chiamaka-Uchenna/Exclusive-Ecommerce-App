"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { api } from "@/services/api"
import ProductCard from "@/components/ui/product-card"
import SectionHeader from "@/components/ui/section-header"
import type { Product } from "@/types"

export default function ExploreProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts(8, 12)
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch explore products:", error)
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
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader title="Explore Our Products" subtitle="Our Products" showViewAll viewAllHref="/products" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/products"
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded transition-colors duration-200 inline-block"
        >
          View All Products
        </Link>
      </div>
    </section>
  )
}
