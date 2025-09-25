"use client"

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { clearWishlist } from "@/lib/redux/slices/wishlistSlice"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import ProductCard from "@/components/ui/product-card"
import Breadcrumb from "@/components/layout/breadcrumb"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist)
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const handleMoveAllToBag = () => {
    wishlistItems.forEach((product) => {
      dispatch(addToCart({ product, quantity: 1 }))
    })
    dispatch(clearWishlist())
    toast({
      title: "Success",
      description: "All items moved to cart!",
    })
  }

  const breadcrumbItems = [{ label: "Wishlist" }]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Wishlist ({wishlistItems.length})</h1>
        {wishlistItems.length > 0 && (
          <button
            onClick={handleMoveAllToBag}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition-colors duration-200"
          >
            Move All To Bag
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <Icons.heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Save items you're interested in to your wishlist so you can easily find them later.
          </p>
          <a
            href="/products"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition-colors duration-200 inline-block"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
