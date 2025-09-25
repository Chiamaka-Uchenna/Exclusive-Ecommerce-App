import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import cartSlice from "./slices/cartSlice"
import wishlistSlice from "./slices/wishlistSlice"
import themeSlice from "./slices/themeSlice"

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  wishlist: wishlistSlice,
  theme: themeSlice,
})

const createAsyncStorage = () => {
  if (typeof window === "undefined") {
    // Server-side: return noop storage that returns resolved promises
    return {
      getItem: (key: string) => Promise.resolve(null),
      setItem: (key: string, value: string) => Promise.resolve(),
      removeItem: (key: string) => Promise.resolve(),
    }
  }

  try {
    // Client-side: wrap localStorage methods to return promises
    const storage = window.localStorage
    return {
      getItem: (key: string) => Promise.resolve(storage.getItem(key)),
      setItem: (key: string, value: string) => Promise.resolve(storage.setItem(key, value)),
      removeItem: (key: string) => Promise.resolve(storage.removeItem(key)),
    }
  } catch {
    // Fallback: return noop storage if localStorage is not available
    return {
      getItem: (key: string) => Promise.resolve(null),
      setItem: (key: string, value: string) => Promise.resolve(),
      removeItem: (key: string) => Promise.resolve(),
    }
  }
}

export const createStore = async (withPersist = false) => {
  if (withPersist && typeof window !== "undefined") {
    try {
      // Dynamic import for redux-persist on client side only
      const { persistReducer } = await import("redux-persist")

      const persistConfig = {
        key: "root",
        storage: createAsyncStorage(), // Use async storage wrapper
        whitelist: ["cart", "wishlist", "theme"],
      }

      const persistedReducer = persistReducer(persistConfig, rootReducer)

      return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
          }),
      })
    } catch (error) {
      console.warn("Redux persist failed, falling back to non-persisted store:", error)
      // Fall back to non-persisted store if persistence fails
    }
  }

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  })
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
