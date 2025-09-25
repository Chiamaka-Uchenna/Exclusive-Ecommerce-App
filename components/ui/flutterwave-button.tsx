"use client"

import type React from "react"

import { useState } from "react"
import { initializeFlutterwavePayment, generateTransactionRef, verifyPayment } from "@/services/payment"
import type { FlutterwaveConfig, FlutterwaveResponse } from "@/services/payment"

interface FlutterwaveButtonProps {
  amount: number
  currency?: string
  customerEmail: string
  customerName: string
  customerPhone?: string
  onSuccess?: (response: FlutterwaveResponse) => void
  onError?: (error: any) => void
  onClose?: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

export default function FlutterwaveButton({
  amount,
  currency = "USD",
  customerEmail,
  customerName,
  customerPhone,
  onSuccess,
  onError,
  onClose,
  disabled = false,
  className = "",
  children,
}: FlutterwaveButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = () => {
    if (disabled || isLoading) return

    const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY
    if (!publicKey) {
      console.error("NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY is not configured")
      onError?.(new Error("Payment service not configured"))
      return
    }

    setIsLoading(true)

    const config: FlutterwaveConfig = {
      public_key: publicKey,
      tx_ref: generateTransactionRef(),
      amount: amount,
      currency: currency,
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: customerEmail,
        phone_number: customerPhone,
        name: customerName,
      },
      customizations: {
        title: "Exclusive Store",
        description: "Payment for items in cart",
        logo: "/logo.png",
      },
      callback: async (response: FlutterwaveResponse) => {
        setIsLoading(false)

        if (response.status === "successful") {
          try {
            // Verify payment on server
            const verificationResult = await verifyPayment(response.transaction_id, response.flw_ref)

            if (verificationResult.status === "success") {
              onSuccess?.(response)
            } else {
              onError?.(new Error("Payment verification failed"))
            }
          } catch (error) {
            onError?.(error)
          }
        } else {
          onError?.(new Error("Payment was not successful"))
        }
      },
      onclose: () => {
        setIsLoading(false)
        onClose?.()
      },
    }

    initializeFlutterwavePayment(config)
  }

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className={`${className} ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
    >
      {isLoading ? "Processing..." : children}
    </button>
  )
}
