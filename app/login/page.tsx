"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setUser, setError, setLoading } from "@/lib/redux/slices/authSlice"
import { authService } from "@/services/auth"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    dispatch(setLoading(true))

    const { user, error } = await authService.signIn(formData.email, formData.password)

    if (error) {
      dispatch(setError(error))
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else if (user) {
      dispatch(setUser(user))
      toast({
        title: "Success",
        description: "Logged in successfully!",
      })
      router.push("/")
    }

    setIsLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    dispatch(setLoading(true))

    const { user, error } = await authService.signInWithGoogle()

    if (error) {
      dispatch(setError(error))
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else if (user) {
      dispatch(setUser(user))
      toast({
        title: "Success",
        description: "Logged in successfully!",
      })
      router.push("/")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 items-center justify-center p-12">
        <div className="relative w-full max-w-md">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Log%20In.jpg-WR1wKYx3n6TiVhiaJlbO34DHBvcWg9.jpeg"
            alt="Shopping cart with phone and bags"
            width={500}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Log in to Exclusive</h1>
            <p className="text-gray-600 dark:text-gray-400">Enter your details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email or Phone Number"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-red-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-red-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-8 py-3 rounded transition-colors duration-200 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
              <Link href="/forgot-password" className="text-red-500 hover:text-red-600 transition-colors text-sm">
                Forget Password?
              </Link>
            </div>
          </form>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">or</p>
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded transition-colors duration-200 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Sign up with Google</span>
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-red-500 hover:text-red-600 transition-colors font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
