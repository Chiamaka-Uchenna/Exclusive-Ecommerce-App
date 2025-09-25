import type { FirebaseApp } from "firebase/app"
import type { Auth } from "firebase/auth"
import type { Firestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null
let isInitializing = false

// Check if we're in a browser environment
function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

// Initialize Firebase using dynamic imports
async function initializeFirebase() {
  if (!isBrowser() || isInitializing) {
    return { app: null, auth: null, db: null }
  }

  if (app && auth && db) {
    return { app, auth, db }
  }

  try {
    isInitializing = true
    console.log("Initializing Firebase...")

    // Dynamic imports to prevent server-side loading
    const { initializeApp, getApps, getApp } = await import("firebase/app")
    const { getAuth } = await import("firebase/auth")
    const { getFirestore } = await import("firebase/firestore")

    // Initialize app
    if (!app) {
      app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
      console.log("Firebase app initialized")
    }

    // Initialize auth
    if (!auth && app) {
      auth = getAuth(app)
      console.log("Firebase auth initialized")
    }

    // Initialize firestore
    if (!db && app) {
      db = getFirestore(app)
      console.log("Firebase firestore initialized")
    }

    isInitializing = false
    return { app, auth, db }
  } catch (error) {
    console.error("Firebase initialization failed:", error)
    isInitializing = false
    return { app: null, auth: null, db: null }
  }
}

// Async getter functions
export async function getFirebaseAuth(): Promise<Auth | null> {
  if (!isBrowser()) return null
  const { auth } = await initializeFirebase()
  return auth
}

export async function getFirebaseDb(): Promise<Firestore | null> {
  if (!isBrowser()) return null
  const { db } = await initializeFirebase()
  return db
}

export async function getFirebaseApp(): Promise<FirebaseApp | null> {
  if (!isBrowser()) return null
  const { app } = await initializeFirebase()
  return app
}

// Synchronous getters that return null if not initialized (for backward compatibility)
export function getFirebaseAuthSync(): Auth | null {
  return isBrowser() ? auth : null
}

export function getFirebaseDbSync(): Firestore | null {
  return isBrowser() ? db : null
}

export function getFirebaseAppSync(): FirebaseApp | null {
  return isBrowser() ? app : null
}

export { auth, db }
export default app
