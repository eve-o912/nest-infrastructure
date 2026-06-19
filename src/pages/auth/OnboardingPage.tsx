import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '../../components/shared/Button'
import { Input } from '../../components/shared/Input'
import { Select } from '../../components/shared/Select'
import { businessProfileSchema, type BusinessProfileFormData } from '../../lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Check, ChevronRight } from '@tabler/icons-react'

const steps = [
  { id: 1, title: 'Business Profile', description: 'Tell us about your business' },
  { id: 2, title: 'Connect M-Pesa', description: 'Link your M-Pesa Paybill' },
  { id: 3, title: 'Connect Bank', description: 'Link your bank account' },
  { id: 4, title: 'Invite Team', description: 'Add team members (optional)' },
]

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<any>({})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessProfileFormData>({
    resolver: zodResolver(businessProfileSchema),
  })

  const handleNext = (data: any) => {
    setOnboardingData({ ...onboardingData, ...data })
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      navigate({ to: '/dashboard' })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BusinessProfileStep register={register} errors={errors} />
      case 2:
        return <MpesaStep />
      case 3:
        return <BankStep />
      case 4:
        return <TeamStep />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Setup your account</h1>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length}
            </div>
          </div>

          {/* Progress steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-medium
                      ${currentStep >= step.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                      }
                    `}
                  >
                    {currentStep > step.id ? <Check size={20} /> : step.id}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                      flex-1 h-0.5 mx-4
                      ${currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'}
                    `}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit(handleNext)}>
          {renderStep()}

          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button type="button" variant="secondary" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button type="submit">
              {currentStep === steps.length ? 'Complete Setup' : 'Continue'}
              <ChevronRight size={20} className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const BusinessProfileStep: React.FC<any> = ({ register, errors }) => {
  const industries = [
    { value: 'retail', label: 'Retail' },
    { value: 'wholesale', label: 'Wholesale' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'services', label: 'Services' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Business Profile</h2>
        <p className="text-gray-600">Tell us about your business to personalize your experience.</p>
      </div>

      <Input
        label="Business name"
        placeholder="Your Business Ltd"
        error={errors.name?.message}
        {...register('name')}
      />

      <Select
        label="Industry"
        options={industries}
        error={errors.industry?.message}
        {...register('industry')}
      />

      <Input
        label="Phone number"
        placeholder="+254 700 000 000"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <Input
        label="Business email"
        type="email"
        placeholder="business@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Registration number (optional)"
        placeholder="Business registration number"
        {...register('registrationNumber')}
      />

      <Input
        label="KRA Tax PIN (optional)"
        placeholder="A00 000000 0000"
        {...register('taxId')}
      />
    </div>
  )
}

const MpesaStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect M-Pesa</h2>
        <p className="text-gray-600">Link your M-Pesa Paybill to track transactions automatically.</p>
      </div>

      <Input
        label="Paybill number"
        placeholder="Enter your M-Pesa Paybill number"
      />

      <Input
        label="Account number (optional)"
        placeholder="Enter account number if applicable"
      />

      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <p className="text-sm text-primary-800">
          <strong>Why connect M-Pesa?</strong> We'll automatically import your M-Pesa transactions
          so you don't have to manually enter them.
        </p>
      </div>
    </div>
  )
}

const BankStep: React.FC = () => {
  const banks = [
    { value: 'equity', label: 'Equity Bank' },
    { value: 'kcb', label: 'KCB Bank' },
    { value: 'cooperative', label: 'Cooperative Bank' },
    { value: 'absa', label: 'Absa Bank' },
    { value: 'standard', label: 'Standard Chartered' },
    { value: 'family', label: 'Family Bank' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect Bank Account</h2>
        <p className="text-gray-600">Link your bank account for complete cash visibility.</p>
      </div>

      <Select
        label="Bank"
        options={banks}
      />

      <Input
        label="Account number"
        placeholder="Enter your bank account number"
      />

      <Select
        label="Account type"
        options={[
          { value: 'current', label: 'Current Account' },
          { value: 'savings', label: 'Savings Account' },
        ]}
      />

      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <p className="text-sm text-primary-800">
          <strong>Secure connection:</strong> We use bank-level security to protect your data.
          Your credentials are never stored.
        </p>
      </div>
    </div>
  )
}

const TeamStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Invite Team Members</h2>
        <p className="text-gray-600">Add team members to collaborate on your finances (optional).</p>
      </div>

      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">You can invite team members later from Settings.</p>
        <Button variant="secondary" onClick={() => {}}>
          Skip for now
        </Button>
      </div>
    </div>
  )
}
