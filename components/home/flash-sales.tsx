"use client"

import { useState, useEffect } from "react"
import { api } from "@/services/api"
import ProductCard from "@/components/ui/product-card"
import SectionHeader from "@/components/ui/section-header"
import CountdownTimer from "@/components/ui/countdown-timer"
import { Icons } from "@/components/ui/icons"
import type { Product } from "@/types"
import { useRouter } from "next/navigation"

export default function FlashSales() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  const flashSaleEndDate = new Date()
  flashSaleEndDate.setDate(flashSaleEndDate.getDate() + 3)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await api.getProducts(8, 0)
        // Optional: Filter for flash sale products if API supports it
        // Example: const flashSaleProducts = data.filter(product => product.onSale);
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch flash sale products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, Math.ceil(products.length / 4) - 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, Math.ceil(products.length / 4) - 1)) % Math.max(1, Math.ceil(products.length / 4) - 1))
  }

  const handleViewAll = () => {
    router.push("/products")
  }

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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeader title="Flash Sales" subtitle="Today's" />

      <div className="flex items-center justify-between mb-8">
        <CountdownTimer targetDate={flashSaleEndDate} />
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            disabled={products.length <= 4}
          >
            <Icons.chevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            disabled={products.length <= 4}
          >
            <Icons.chevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-3">
              <ProductCard product={product} showDiscount discountPercentage={Math.floor(Math.random() * 50) + 10} />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <button
          onClick={handleViewAll}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded transition-colors duration-200"
        >
          View All Products
        </button>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 mt-16" />
    </section>
  )
}