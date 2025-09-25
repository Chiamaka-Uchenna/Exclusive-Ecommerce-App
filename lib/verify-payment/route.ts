import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { transaction_id, flw_ref } = await request.json()

    if (!transaction_id || !flw_ref) {
      return NextResponse.json({ error: "Transaction ID and Flutterwave reference are required" }, { status: 400 })
    }

    if (!process.env.FLUTTERWAVE_SECRET_KEY) {
      console.error("FLUTTERWAVE_SECRET_KEY is not configured")
      return NextResponse.json({ error: "Payment service not configured" }, { status: 500 })
    }

    // Verify payment with Flutterwave
    const verificationResponse = await fetch(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!verificationResponse.ok) {
      throw new Error("Failed to verify payment with Flutterwave")
    }

    const verificationData = await verificationResponse.json()

    if (verificationData.status === "success" && verificationData.data.status === "successful") {
      // Payment is successful
      return NextResponse.json({
        status: "success",
        message: "Payment verified successfully",
        data: verificationData.data,
      })
    } else {
      // Payment failed or pending
      return NextResponse.json({
        status: "failed",
        message: "Payment verification failed",
        data: verificationData.data,
      })
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
