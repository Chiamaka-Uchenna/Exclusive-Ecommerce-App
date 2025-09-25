import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AuthState, User } from "@/types"

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    clearError: (state) => {
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.loading = false
      state.error = null
    },
  },
})

export const { setLoading, setUser, setError, clearError, logout } = authSlice.actions
export default authSlice.reducer
