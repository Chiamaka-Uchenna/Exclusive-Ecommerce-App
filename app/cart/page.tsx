"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { updateQuantity, removeFromCart } from "@/lib/redux/slices/cartSlice"
import Breadcrumb from "@/components/layout/breadcrumb"
import { Icons } from "@/components/ui/icons"
import { formatPrice } from "@/utils"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, total } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const [couponCode, setCouponCode] = useState("")
  const { toast } = useToast()

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id))
      toast({
        title: "Success",
        description: "Item removed from cart",
      })
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id))
    toast({
      title: "Success",
      description: "Item removed from cart",
    })
  }

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      // Mock coupon application
      toast({
        title: "Success",
        description: "Coupon applied successfully!",
      })
      setCouponCode("")
    }
  }

  const breadcrumbItems = [{ label: "Cart" }]

  const subtotal = total
  const shipping = 0 // Free shipping
  const finalTotal = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="text-center py-16">
          <Icons.cart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add some products to your cart to get started.</p>
          <Link
            href="/products"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition-colors duration-200 inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-8">
        {/* Cart Header */}
        <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 font-semibold text-gray-900 dark:text-gray-100">
          <div>Product</div>
          <div className="text-center">Price</div>
          <div className="text-center">Quantity</div>
          <div className="text-center">Subtotal</div>
        </div>

        {/* Cart Items */}
        <div className="divide-y divide-gray-200 dark:divide-gray-600">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-4 gap-4 p-6 items-center">
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0] || "/placeholder.svg?height=64&width=64&query=product"}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{item.product.title}</h3>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-600 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="text-center text-gray-900 dark:text-gray-100 font-semibold">
                {formatPrice(item.product.price)}
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-center">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icons.minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 min-w-[60px] text-center">
                    {String(item.quantity).padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icons.plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-center text-gray-900 dark:text-gray-100 font-semibold">
                {formatPrice(item.product.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions and Summary */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Actions */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="flex-1 bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded text-center transition-colors duration-200"
            >
              Return To Shop
            </Link>
            <button className="flex-1 bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded transition-colors duration-200">
              Update Cart
            </button>
          </div>

          {/* Coupon */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition-colors duration-200"
            >
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Cart Total */}
        <div className="lg:w-96">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Cart Total</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-gray-400">Total:</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{formatPrice(finalTotal)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition-colors duration-200 mt-6 block text-center"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
