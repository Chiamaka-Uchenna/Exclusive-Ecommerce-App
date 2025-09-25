export interface Product {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: {
    id: number
    name: string
    slug: string
    image: string
    creationAt: string
    updatedAt: string
  }
  images: string[]
  creationAt: string
  updatedAt: string
}

export interface CartItem {
  id: number
  product: Product
  quantity: number
}

export interface User {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

export interface WishlistState {
  items: Product[]
}

export interface AppState {
  auth: AuthState
  cart: CartState
  wishlist: WishlistState
  theme: "light" | "dark"
}

export interface Category {
  id: number
  name: string
  slug: string
  image: string
  creationAt: string
  updatedAt: string
}