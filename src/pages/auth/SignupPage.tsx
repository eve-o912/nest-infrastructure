import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../../stores/authStore'
import { Button } from '../../components/shared/Button'
import { Input } from '../../components/shared/Input'
import { signupSchema, type SignupFormData } from '../../lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const { signup, isLoading, error } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data)
      navigate({ to: '/onboarding' })
    } catch (err) {
      // Error is handled by the store
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">Create your account</h1>
          <p className="text-gray-600">Start managing your business finances</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="mb-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
              <p className="text-sm text-danger-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First name"
                placeholder="John"
                error={errors.firstName?.message}
                {...register('firstName')}
              />
              <Input
                label="Last name"
                placeholder="Doe"
                error={errors.lastName?.message}
                {...register('lastName')}
              />
            </div>

            <Input
              label="Business name"
              placeholder="Your Business Ltd"
              error={errors.businessName?.message}
              {...register('businessName')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              helperText="Must be at least 8 characters with uppercase, lowercase, and number"
              {...register('password')}
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              Create account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate({ to: '/login' })}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
