"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/lib/redux/slices/wishlistSlice"
import { Icons } from "@/components/ui/icons"
import { formatPrice } from "@/utils"
import type { Product } from "@/types"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  showDiscount?: boolean
  discountPercentage?: number
}

export default function ProductCard({ product, showDiscount = false, discountPercentage }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useAppDispatch()
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const { toast } = useToast()

  const isInWishlist = wishlistItems.some((item) => item.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(addToCart({ product, quantity: 1 }))
    toast({
      title: "Success",
      description: "Added to cart!",
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
      toast({
        title: "Success",
        description: "Removed from wishlist",
      })
    } else {
      dispatch(addToWishlist(product))
      toast({
        title: "Success",
        description: "Added to wishlist!",
      })
    }
  }

  const discountedPrice = discountPercentage ? product.price * (1 - discountPercentage / 100) : product.price

  console.log("Product title:", product.title); // Debug log

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
          {showDiscount && discountPercentage && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
              -{discountPercentage}%
            </div>
          )}

          <Image
            src={product.images[0] || "/placeholder.svg?height=300&width=300&query=product"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full shadow-md transition-colors ${
                isInWishlist
                  ? "bg-red-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white"
              }`}
            >
              <Icons.heart className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} />
            </button>
            <button className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Icons.eye className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          {isHovered && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white p-3">
              <button
                onClick={handleAddToCart}
                className="w-full text-center font-medium hover:bg-opacity-100 transition-all"
              >
                Add To Cart
              </button>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{product.title}</h3>
          {/* Optional: Remove line-clamp-2 for full title */}
          {/* <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{product.title}</h3> */}
          <div className="flex items-center space-x-2 mb-2">
            {showDiscount && discountPercentage ? (
              <>
                <span className="text-red-500 font-semibold">{formatPrice(discountedPrice)}</span>
                <span className="text-gray-500 line-through text-sm">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-gray-900 dark:text-gray-100 font-semibold">{formatPrice(product.price)}</span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icons.star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-500 ml-2">(88)</span>
          </div>
        </div>
      </Link>
    </div>
  )
}