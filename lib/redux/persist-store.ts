"use client"

import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import cartSlice from "./slices/cartSlice"
import wishlistSlice from "./slices/wishlistSlice"
import themeSlice from "./slices/themeSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wishlist", "theme"],
}

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  wishlist: wishlistSlice,
  theme: themeSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const persistedStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export const persistor = persistStore(persistedStore)

export type RootState = ReturnType<typeof persistedStore.getState>
export type AppDispatch = typeof persistedStore.dispatch
