"use client"

import Link from "next/link"
import { Icons } from "@/components/ui/icons"

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icons.check className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
        </p>
        <div className="space-y-4">
          <Link
            href="/products"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition-colors duration-200 inline-block"
          >
            Continue Shopping
          </Link>
          <div>
            <Link href="/account" className="text-red-500 hover:text-red-600 transition-colors">
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
