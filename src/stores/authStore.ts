import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Business, LoginCredentials, SignupCredentials } from '../types/auth'
import api from '../lib/api'

interface AuthState {
  user: User | null
  business: Business | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (credentials: SignupCredentials) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
  setUser: (user: User | null) => void
  setBusiness: (business: Business | null) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      business: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post('/auth/login', credentials)
          const { user, business, token } = response.data
          
          localStorage.setItem('token', token)
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          set({ 
            user, 
            business, 
            isAuthenticated: true, 
            isLoading: false 
          })
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Login failed', 
            isLoading: false 
          })
          throw error
        }
      },

      signup: async (credentials: SignupCredentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await api.post('/auth/signup', credentials)
          const { user, business, token } = response.data
          
          localStorage.setItem('token', token)
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          set({ 
            user, 
            business, 
            isAuthenticated: true, 
            isLoading: false 
          })
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Signup failed', 
            isLoading: false 
          })
          throw error
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        delete api.defaults.headers.common['Authorization']
        set({ 
          user: null, 
          business: null, 
          isAuthenticated: false,
          error: null 
        })
      },

      refreshUser: async () => {
        const token = localStorage.getItem('token')
        if (!token) return

        set({ isLoading: true })
        try {
          const response = await api.get('/user/me')
          const user = response.data
          set({ user, isLoading: false })
        } catch (error) {
          get().logout()
          set({ isLoading: false })
        }
      },

      setUser: (user: User | null) => set({ user }),
      setBusiness: (business: Business | null) => set({ business }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        business: state.business, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)
