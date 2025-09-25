"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { setUser, setLoading } from "@/lib/redux/slices/authSlice"
import { authService } from "@/services/auth"

interface AuthProviderProps {
  children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    console.log("[v0] AuthProvider initializing...")
    dispatch(setLoading(true))

    const initAuth = async () => {
      try {
        console.log("[v0] Setting up auth state listener...")
        const unsubscribe = await authService.onAuthStateChanged((user) => {
          console.log("[v0] Auth state changed:", user ? "User logged in" : "User logged out")
          if (user) {
            dispatch(
              setUser({
                uid: user.uid,
                email: user.email!,
                displayName: user.displayName,
                photoURL: user.photoURL,
              }),
            )
          } else {
            dispatch(setUser(null))
          }
          dispatch(setLoading(false))
          setIsInitialized(true)
        })

        return unsubscribe
      } catch (error) {
        console.error("[v0] Auth initialization failed:", error)
        dispatch(setUser(null))
        dispatch(setLoading(false))
        setIsInitialized(true)
        return () => {}
      }
    }

    // Add a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      initAuth().then((unsubscribe) => {
        // Store the unsubscribe function for cleanup
        return () => {
          if (unsubscribe) {
            unsubscribe()
          }
        }
      })
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [dispatch])

  return <>{children}</>
}
