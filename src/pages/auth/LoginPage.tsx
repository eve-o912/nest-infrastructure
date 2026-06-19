import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../../stores/authStore'
import { Button } from '../../components/shared/Button'
import { Input } from '../../components/shared/Input'
import { loginSchema, type LoginFormData } from '../../lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
      navigate({ to: '/dashboard' })
    } catch (err) {
      // Error is handled by the store
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">Welcome to Nest</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="mb-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
              <p className="text-sm text-danger-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              {...register('password')}
            />

            <div className="flex items-center justify-between">
              <a href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                Forgot password?
              </a>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate({ to: '/signup' })}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
