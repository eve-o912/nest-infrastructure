import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  sidebarOpen: boolean
  activeTab: string
  modalOpen: boolean
  modalContent: string | null
  theme: 'light' | 'dark'
  toggleSidebar: () => void
  setActiveTab: (tab: string) => void
  openModal: (content: string) => void
  closeModal: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      activeTab: 'dashboard',
      modalOpen: false,
      modalContent: null,
      theme: 'light',

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setActiveTab: (tab: string) => set({ activeTab: tab }),
      openModal: (content: string) => set({ modalOpen: true, modalContent: content }),
      closeModal: () => set({ modalOpen: false, modalContent: null }),
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ 
        sidebarOpen: state.sidebarOpen, 
        activeTab: state.activeTab,
        theme: state.theme
      }),
    }
  )
)
