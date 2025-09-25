"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { api } from "@/services/api"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/lib/redux/slices/wishlistSlice"
import Breadcrumb from "@/components/layout/breadcrumb"
import ProductCard from "@/components/ui/product-card"
import { Icons } from "@/components/ui/icons"
import { formatPrice } from "@/utils"
import type { Product } from "@/types"
import toast from "react-hot-toast"

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const dispatch = useAppDispatch()
  const wishlistItems = useAppSelector((state) => state.wishlist.items)

  const isInWishlist = product ? wishlistItems.some((item) => item.id === product.id) : false

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await api.getProduct(productId)
        setProduct(data)

        // Fetch related products from the same category
        const related = await api.getProductsByCategory(data.category.id)
        setRelatedProducts(related.filter((p) => p.id !== productId).slice(0, 4))
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }))
      toast.success("Added to cart!")
    }
  }

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id))
        toast.success("Removed from wishlist")
      } else {
        dispatch(addToWishlist(product))
        toast.success("Added to wishlist!")
      }
    }
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Product Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: product.category.name, href: `/products?category=${product.category.name.toLowerCase()}` },
    { label: product.title },
  ]

  const colors = ["#000000", "#DB4444"] // Mock colors
  const sizes = ["XS", "S", "M", "L", "XL"] // Mock sizes

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg?height=500&width=500&query=product"}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-red-500" : "border-transparent"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{product.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icons.star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500 ml-2">(150 Reviews)</span>
              </div>
              <span className="text-green-500 text-sm">In Stock</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">{formatPrice(product.price)}</div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Colors */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Colours:</h3>
            <div className="flex items-center space-x-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-gray-400" : "border-gray-200 dark:border-gray-600"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Size:</h3>
            <div className="flex items-center space-x-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Icons.minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Icons.plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded transition-colors duration-200"
            >
              Buy Now
            </button>

            <button
              onClick={handleWishlistToggle}
              className={`p-3 border rounded transition-colors ${
                isInWishlist
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-500"
              }`}
            >
              <Icons.heart className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <Icons.truck className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Free Delivery</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-700" />
            <div className="flex items-center space-x-4">
              <Icons.refresh className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Return Delivery</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-5 h-10 bg-red-500 rounded" />
            <span className="text-red-500 font-semibold">Related Item</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
