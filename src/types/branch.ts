export interface Branch {
  id: string;
  name: string;
  code: string;
  location: string;
  phone?: string;
  email?: string;
  managerId?: string;
  managerName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Staff {
  id: string;
  branchId: string;
  branchName: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'manager' | 'staff';
  isActive: boolean;
  hireDate: string;
  salesTarget?: number;
  currentSales?: number;
}

export interface BranchKPI {
  branchId: string;
  branchName: string;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  transactionCount: number;
  averageTransactionValue: number;
  cashPosition: number;
  period: string;
}

export interface BranchComparison {
  branches: BranchKPI[];
  period: string;
}
