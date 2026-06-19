import { create } from 'zustand'
import { CashPosition, Account, Transaction, TransactionFilters } from '../types/cash'
import api from '../lib/api'

interface CashState {
  cashPosition: CashPosition | null
  accounts: Account[]
  transactions: Transaction[]
  isLoading: boolean
  error: Error | null
  fetchCashPosition: () => Promise<void>
  fetchAccounts: () => Promise<void>
  fetchTransactions: (filters?: TransactionFilters) => Promise<void>
  reconcileTransaction: (id: string) => Promise<void>
  addTransaction: (transaction: Partial<Transaction>) => Promise<void>
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
}

export const useCashStore = create<CashState>((set, get) => ({
  cashPosition: null,
  accounts: [],
  transactions: [],
  isLoading: false,
  error: null,

  fetchCashPosition: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/cash/position')
      set({ cashPosition: response.data, isLoading: false })
    } catch (error: any) {
      set({ error, isLoading: false })
    }
  },

  fetchAccounts: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/accounts')
      set({ accounts: response.data, isLoading: false })
    } catch (error: any) {
      set({ error, isLoading: false })
    }
  },

  fetchTransactions: async (filters?: TransactionFilters) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/transactions', { params: filters })
      set({ transactions: response.data, isLoading: false })
    } catch (error: any) {
      set({ error, isLoading: false })
    }
  },

  reconcileTransaction: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await api.post(`/transactions/reconcile`, { transactionId: id })
      const transactions = get().transactions.map(t =>
        t.id === id ? { ...t, status: 'reconciled' } : t
      )
      set({ transactions, isLoading: false })
    } catch (error: any) {
      set({ error, isLoading: false })
    }
  },

  addTransaction: async (transaction: Partial<Transaction>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post('/transactions', transaction)
      const transactions = [response.data, ...get().transactions]
      set({ transactions, isLoading: false })
    } catch (error: any) {
      set({ error, isLoading: false })
    }
  },

  updateTransaction: async (id: string, data: Partial<Transaction>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.put(`/transactions/${id}`, data)
      const transactions = get().transactions.map(t =>
        t.id === id ? response.data : t
      )
      set({ transactions, isLoading: false })
    } catch (error: any) {
      set({ error, isLoading: false })
    }
  },

  deleteTransaction: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/transactions/${id}`)
      const transactions = get().transactions.filter(t => t.id !== id)
      set({ transactions, isLoading: false })
    } catch (error: any) {
      set({ error, isLoading: false })
    }
  },
}))
