"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { createStore } from "@/lib/redux/store"

interface ReduxProviderProps {
  children: React.ReactNode
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  const [clientStore, setClientStore] = useState<Awaited<ReturnType<typeof createStore>> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeStore = async () => {
      try {
        console.log("[v0] Initializing Redux store...")
        const persistedStore = await createStore(true)
        console.log("[v0] Redux store created successfully")

        setClientStore(persistedStore)

        // Initialize persistor with dynamic import
        if (typeof window !== "undefined") {
          try {
            const { persistStore } = await import("redux-persist")
            const persistor = persistStore(persistedStore)
            console.log("[v0] Redux persistor initialized")

            // Store persistor globally for access if needed
            ;(window as any).__PERSISTOR__ = persistor
          } catch (error) {
            console.warn("[v0] Redux persistor failed to initialize:", error)
          }
        }
      } catch (error) {
        console.error("[v0] Failed to initialize Redux store:", error)
        // Create fallback store without persistence
        const fallbackStore = await createStore(false)
        setClientStore(fallbackStore)
      } finally {
        setIsLoading(false)
      }
    }

    initializeStore()
  }, [])

  if (isLoading || !clientStore) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return <Provider store={clientStore}>{children}</Provider>
}
