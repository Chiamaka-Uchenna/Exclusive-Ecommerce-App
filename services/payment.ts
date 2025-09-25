export interface FlutterwaveConfig {
  public_key: string
  tx_ref: string
  amount: number
  currency: string
  payment_options: string
  customer: {
    email: string
    phone_number?: string
    name: string
  }
  customizations: {
    title: string
    description: string
    logo?: string
  }
  callback?: (response: any) => void
  onclose?: () => void
}

export interface FlutterwaveResponse {
  status: string
  transaction_id: string
  tx_ref: string
  flw_ref: string
  device_fingerprint: string
  amount: number
  currency: string
  charged_amount: number
  app_fee: number
  merchant_fee: number
  processor_response: string
  auth_model: string
  ip: string
  narration: string
  status_message: string
  validation_required: boolean
  card: any
  account: any
  customer: {
    id: number
    phone_number: string
    name: string
    email: string
    created_at: string
  }
  created_at: string
}

declare global {
  interface Window {
    FlutterwaveCheckout: (config: FlutterwaveConfig) => void
  }
}

export const initializeFlutterwavePayment = (config: FlutterwaveConfig) => {
  if (typeof window !== "undefined" && window.FlutterwaveCheckout) {
    window.FlutterwaveCheckout(config)
  } else {
    console.error("Flutterwave checkout not loaded")
  }
}

export const generateTransactionRef = () => {
  return `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const verifyPayment = async (transactionId: string, flwRef: string) => {
  try {
    const response = await fetch("/api/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transaction_id: transactionId,
        flw_ref: flwRef,
      }),
    })

    if (!response.ok) {
      throw new Error("Payment verification failed")
    }

    return await response.json()
  } catch (error) {
    console.error("Payment verification error:", error)
    throw error
  }
}
