import type { User } from "firebase/auth"

export const authService = {
  async signUp(email: string, password: string, name?: string) {
    try {
      const { getFirebaseAuth } = await import("@/lib/firebase")
      const auth = await getFirebaseAuth()

      if (!auth) {
        return { user: null, error: "Authentication not available" }
      }

      const { createUserWithEmailAndPassword } = await import("firebase/auth")
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      return {
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email!,
          displayName: name || userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        },
        error: null,
      }
    } catch (error: any) {
      console.error("[v0] Sign up error:", error)
      return {
        user: null,
        error: error.message,
      }
    }
  },

  async signIn(email: string, password: string) {
    try {
      const { getFirebaseAuth } = await import("@/lib/firebase")
      const auth = await getFirebaseAuth()

      if (!auth) {
        return { user: null, error: "Authentication not available" }
      }

      const { signInWithEmailAndPassword } = await import("firebase/auth")
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      return {
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email!,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        },
        error: null,
      }
    } catch (error: any) {
      console.error("[v0] Sign in error:", error)
      return {
        user: null,
        error: error.message,
      }
    }
  },

  async signInWithGoogle() {
    try {
      const { getFirebaseAuth } = await import("@/lib/firebase")
      const auth = await getFirebaseAuth()

      if (!auth) {
        return { user: null, error: "Authentication not available" }
      }

      const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth")
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)

      return {
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email!,
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
        },
        error: null,
      }
    } catch (error: any) {
      console.error("[v0] Google sign in error:", error)
      return {
        user: null,
        error: error.message,
      }
    }
  },

  async resetPassword(email: string) {
    try {
      const { getFirebaseAuth } = await import("@/lib/firebase")
      const auth = await getFirebaseAuth()

      if (!auth) {
        return { error: "Authentication not available" }
      }

      const { sendPasswordResetEmail } = await import("firebase/auth")
      await sendPasswordResetEmail(auth, email)
      return { error: null }
    } catch (error: any) {
      console.error("[v0] Password reset error:", error)
      return { error: error.message }
    }
  },

  async signOut() {
    try {
      const { getFirebaseAuth } = await import("@/lib/firebase")
      const auth = await getFirebaseAuth()

      if (!auth) {
        return { error: "Authentication not available" }
      }

      const { signOut } = await import("firebase/auth")
      await signOut(auth)
      return { error: null }
    } catch (error: any) {
      console.error("[v0] Sign out error:", error)
      return { error: error.message }
    }
  },

  async onAuthStateChanged(callback: (user: User | null) => void) {
    try {
      const { getFirebaseAuth } = await import("@/lib/firebase")
      const auth = await getFirebaseAuth()

      if (!auth) {
        console.log("[v0] Auth not available, calling callback with null")
        callback(null)
        return () => {}
      }

      const { onAuthStateChanged } = await import("firebase/auth")
      console.log("[v0] Setting up auth state listener")
      return onAuthStateChanged(auth, callback)
    } catch (error) {
      console.error("[v0] Auth state change error:", error)
      callback(null)
      return () => {}
    }
  },
}
