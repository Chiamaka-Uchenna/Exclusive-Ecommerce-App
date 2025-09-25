"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { api } from "@/services/api"
import ProductCard from "@/components/ui/product-card"
import Breadcrumb from "@/components/layout/breadcrumb"
import { Icons } from "@/components/ui/icons"
import type { Product } from "@/types"

export default function SearchPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  useEffect(() => {
    const searchProducts = async () => {
      if (!query.trim()) {
        setProducts([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        // For demo purposes, we'll fetch all products and filter them
        // In a real app, you'd have a proper search API endpoint
        const allProducts = await api.getProducts(100, 0)
        const filtered = allProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.name.toLowerCase().includes(query.toLowerCase()),
        )
        setProducts(filtered)
      } catch (error) {
        console.error("Failed to search products:", error)
      } finally {
        setLoading(false)
      }
    }

    searchProducts()
  }, [query])

  const breadcrumbItems = [{ label: `Search results for "${query}"` }]

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Search Results for "{query}"</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {products.length} {products.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <Icons.search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No products found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find any products matching "{query}". Try adjusting your search terms.
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>Search suggestions:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Check your spelling</li>
              <li>Try more general keywords</li>
              <li>Try different keywords</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
