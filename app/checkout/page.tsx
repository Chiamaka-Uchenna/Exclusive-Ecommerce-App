"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { clearCart } from "@/lib/redux/slices/cartSlice"
import Breadcrumb from "@/components/layout/breadcrumb"
import FlutterwaveButton from "@/components/ui/flutterwave-button"
import { formatPrice } from "@/utils"
import { useToast } from "@/hooks/use-toast"
import type { FlutterwaveResponse } from "@/services/payment"

interface BillingDetails {
  firstName: string
  lastName: string
  companyName: string
  streetAddress: string
  apartment: string
  townCity: string
  phoneNumber: string
  emailAddress: string
  saveInfo: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: false,
  })

  const [paymentMethod, setPaymentMethod] = useState<"bank" | "cash">("cash")
  const [couponCode, setCouponCode] = useState("")

  const handleInputChange = (field: keyof BillingDetails, value: string | boolean) => {
    setBillingDetails((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = async () => {
    // Validate required fields
    const requiredFields = ["firstName", "streetAddress", "townCity", "phoneNumber", "emailAddress"]
    const missingFields = requiredFields.filter((field) => !billingDetails[field as keyof BillingDetails])

    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (items.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty",
        variant: "destructive",
      })
      return
    }

    // Handle cash on delivery
    if (paymentMethod === "cash") {
      try {
        toast({
          title: "Success",
          description: "Order placed successfully! You will pay on delivery.",
        })
        dispatch(clearCart())
        router.push("/order-confirmation")
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to place order. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handlePaymentSuccess = (response: FlutterwaveResponse) => {
    toast({
      title: "Success",
      description: "Payment successful! Order placed.",
    })
    dispatch(clearCart())
    router.push("/order-confirmation")
  }

  const handlePaymentError = (error: any) => {
    toast({
      title: "Error",
      description: "Payment failed. Please try again.",
      variant: "destructive",
    })
    console.error("Payment error:", error)
  }

  const handleApplyCoupon = () => {
    // Placeholder for coupon application logic
    toast({
      title: "Info",
      description: "Coupon application is not implemented yet.",
    })
  }

  const breadcrumbItems = [
    { label: "Account", href: "/account" },
    { label: "My Account", href: "/account" },
    { label: "Product", href: "/products" },
    { label: "View Cart", href: "/cart" },
    { label: "CheckOut" },
  ]

  const subtotal = total
  const shipping = 0 // Free shipping
  const finalTotal = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add some products to proceed to checkout.</p>
          <a
            href="/products"
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition-colors duration-200 inline-block"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Billing Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Billing Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={billingDetails.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
              <input
                type="text"
                value={billingDetails.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
            <input
              type="text"
              value={billingDetails.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Street Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={billingDetails.streetAddress}
              onChange={(e) => handleInputChange("streetAddress", e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Apartment, floor, etc. (optional)
            </label>
            <input
              type="text"
              value={billingDetails.apartment}
              onChange={(e) => handleInputChange("apartment", e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Town/City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={billingDetails.townCity}
              onChange={(e) => handleInputChange("townCity", e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={billingDetails.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={billingDetails.emailAddress}
              onChange={(e) => handleInputChange("emailAddress", e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-none rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveInfo"
              checked={billingDetails.saveInfo}
              onChange={(e) => handleInputChange("saveInfo", e.target.checked)}
              className="w-4 h-4 text-red-500 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Save this information for faster check-out next time
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Order Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg?height=48&width=48&query=product"}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">{item.product.title}</span>
                </div>
                <span className="text-gray-900 dark:text-gray-100 font-semibold">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <hr className="border-gray-200 dark:border-gray-600" />

          {/* Order Total */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-4">
              <span className="text-gray-600 dark:text-gray-400">Total:</span>
              <span className="font-bold text-gray-900 dark:text-gray-100">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="bank"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={(e) => setPaymentMethod(e.target.value as "bank" | "cash")}
                className="w-4 h-4 text-red-500 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="bank"
                className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-2"
              >
                <span>Bank</span>
                <div className="flex space-x-1">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                    VISA
                  </div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                    MC
                  </div>
                  <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center">
                    MP
                  </div>
                </div>
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="cash"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value as "bank" | "cash")}
                className="w-4 h-4 text-red-500 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="cash" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Cash on delivery
              </label>
            </div>
          </div>

          {/* Coupon */}
          <div className="flex space-x-4">
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

          {/* Place Order Button */}
          {paymentMethod === "bank" ? (
            <FlutterwaveButton
              amount={finalTotal}
              currency="USD"
              customerEmail={billingDetails.emailAddress}
              customerName={`${billingDetails.firstName} ${billingDetails.lastName}`.trim()}
              customerPhone={billingDetails.phoneNumber}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              disabled={
                !billingDetails.firstName ||
                !billingDetails.emailAddress ||
                !billingDetails.streetAddress ||
                !billingDetails.townCity ||
                !billingDetails.phoneNumber
              }
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition-colors duration-200"
            >
              Pay Now
            </FlutterwaveButton>
          ) : (
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition-colors duration-200"
            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
