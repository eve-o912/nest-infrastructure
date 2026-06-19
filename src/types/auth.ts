export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'viewer' | 'staff';
  createdAt: string;
  updatedAt: string;
}

export interface Business {
  id: string;
  name: string;
  industry: string;
  registrationNumber?: string;
  taxId?: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  businessName: string;
}

export interface OnboardingData {
  step: number;
  businessProfile?: Partial<Business>;
  mpesaPaybill?: string;
  bankAccounts?: BankAccount[];
  teamInvites?: TeamInvite[];
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountType: 'current' | 'savings';
}

export interface TeamInvite {
  email: string;
  role: 'admin' | 'viewer' | 'staff';
}
