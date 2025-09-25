import type { Product, Category } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const api = {
  // Products
  async getProducts(limit?: number, offset?: number): Promise<Product[]> {
    const params = new URLSearchParams()
    if (limit) params.append("limit", limit.toString())
    if (offset) params.append("offset", offset.toString())

    const response = await fetch(`${API_BASE_URL}/products?${params}`)
    if (!response.ok) throw new Error("Failed to fetch products")
    return response.json()
  },

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) throw new Error("Failed to fetch product")
    return response.json()
  },

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/products`)
    if (!response.ok) throw new Error("Failed to fetch products by category")
    return response.json()
  },

  async searchProducts(query: string): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products/?title=${encodeURIComponent(query)}`)
    if (!response.ok) throw new Error("Failed to search products")
    return response.json()
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/products`) // Fetch products instead
    if (!response.ok) throw new Error("Failed to fetch products for categories")
    const products: Product[] = await response.json()
    // Extract unique categories by id
    const uniqueCategories = Array.from(
      new Map(products.map((product) => [product.category.id, product.category])).values()
    )
    return uniqueCategories
  },
}