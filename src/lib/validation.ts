import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
})

export const businessProfileSchema = z.object({
  name: z.string().min(2, 'Business name is required'),
  industry: z.string().min(2, 'Industry is required'),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  phone: z.string().min(10, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
})

export const mpesaConnectionSchema = z.object({
  paybillNumber: z.string().min(5, 'Paybill number is required'),
  accountNumber: z.string().optional(),
})

export const bankAccountSchema = z.object({
  bankName: z.string().min(2, 'Bank name is required'),
  accountNumber: z.string().min(8, 'Account number is required'),
  accountType: z.enum(['current', 'savings']),
})

export const transactionSchema = z.object({
  accountId: z.string().min(1, 'Account is required'),
  type: z.enum(['inflow', 'outflow']),
  amount: z.number().positive('Amount must be positive'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  branchId: z.string().optional(),
})

export const branchSchema = z.object({
  name: z.string().min(2, 'Branch name is required'),
  code: z.string().min(2, 'Branch code is required'),
  location: z.string().min(2, 'Location is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
})

export const teamInviteSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'viewer', 'staff']),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>
export type BusinessProfileFormData = z.infer<typeof businessProfileSchema>
export type MpesaConnectionFormData = z.infer<typeof mpesaConnectionSchema>
export type BankAccountFormData = z.infer<typeof bankAccountSchema>
export type TransactionFormData = z.infer<typeof transactionSchema>
export type BranchFormData = z.infer<typeof branchSchema>
export type TeamInviteFormData = z.infer<typeof teamInviteSchema>
