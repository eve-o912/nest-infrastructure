export interface Account {
  id: string;
  name: string;
  type: 'mpesa' | 'bank' | 'cash';
  accountNumber?: string;
  bankName?: string;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CashPosition {
  totalCash: number;
  mpesaBalance: number;
  bankBalance: number;
  cashOnHand: number;
  pendingInflows: number;
  pendingOutflows: number;
  availableCash: number;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  accountName: string;
  type: 'inflow' | 'outflow';
  amount: number;
  currency: string;
  description: string;
  category: string;
  categoryId?: string;
  reference?: string;
  date: string;
  status: 'pending' | 'reconciled' | 'uncategorized';
  branchId?: string;
  branchName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  parentId?: string;
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  accountId?: string;
  categoryId?: string;
  branchId?: string;
  status?: string;
  search?: string;
}

export interface ReconciliationQueue {
  id: string;
  transactions: Transaction[];
  totalAmount: number;
  count: number;
}
