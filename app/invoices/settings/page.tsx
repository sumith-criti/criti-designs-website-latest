'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

const settingsSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companyEmail: z.string().email().optional().or(z.literal('')),
  companyPhone: z.string().optional(),
  companyAddress: z.string().optional(),
  companyGst: z.string().optional(),
  companyWebsite: z.string().optional(),
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankIfsc: z.string().optional(),
  bankBranch: z.string().optional(),
  invoicePrefix: z.string().min(1, 'Invoice prefix is required'),
  invoiceSequence: z.number().min(1, 'Sequence must be at least 1'),
  taxRate: z.number().min(0).max(100, 'Tax rate must be between 0 and 100'),
  logoUrl: z.string().optional()
})

type SettingsFormData = z.infer<typeof settingsSchema>

export default function SettingsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema)
  })

  useEffect(() => {
    if (session?.user?.role !== 'ADMIN') {
      router.push('/invoices/dashboard')
      return
    }
    fetchSettings()
  }, [session])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/invoices/settings')
      if (res.ok) {
        const data = await res.json()
        reset({
          companyName: data.companyName || '',
          companyEmail: data.companyEmail || '',
          companyPhone: data.companyPhone || '',
          companyAddress: data.companyAddress || '',
          companyGst: data.companyGst || '',
          companyWebsite: data.companyWebsite || '',
          bankName: data.bankName || '',
          bankAccountNumber: data.bankAccountNumber || '',
          bankIfsc: data.bankIfsc || '',
          bankBranch: data.bankBranch || '',
          invoicePrefix: data.invoicePrefix || 'INV',
          invoiceSequence: data.invoiceSequence || 1,
          taxRate: data.taxRate || 18,
          logoUrl: data.logoUrl || ''
        })
      }
    } catch (error) {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: SettingsFormData) => {
    try {
      const res = await fetch('/api/invoices/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        toast.success('Settings updated successfully')
      } else {
        toast.error('Failed to update settings')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              {...register('companyName')}
              error={errors.companyName?.message}
              required
            />
            <Input
              label="Company Email"
              type="email"
              {...register('companyEmail')}
              error={errors.companyEmail?.message}
            />
            <Input
              label="Company Phone"
              {...register('companyPhone')}
              error={errors.companyPhone?.message}
            />
            <Input
              label="Company GST"
              {...register('companyGst')}
              error={errors.companyGst?.message}
            />
            <Input
              label="Company Website"
              {...register('companyWebsite')}
              error={errors.companyWebsite?.message}
            />
            <Input
              label="Logo URL"
              {...register('logoUrl')}
              error={errors.logoUrl?.message}
              placeholder="https://example.com/logo.png"
            />
          </div>
          <Input
            label="Company Address"
            {...register('companyAddress')}
            error={errors.companyAddress?.message}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Bank Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Bank Name"
              {...register('bankName')}
              error={errors.bankName?.message}
            />
            <Input
              label="Account Number"
              {...register('bankAccountNumber')}
              error={errors.bankAccountNumber?.message}
            />
            <Input
              label="IFSC Code"
              {...register('bankIfsc')}
              error={errors.bankIfsc?.message}
            />
            <Input
              label="Branch"
              {...register('bankBranch')}
              error={errors.bankBranch?.message}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Invoice Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Invoice Prefix"
              {...register('invoicePrefix')}
              error={errors.invoicePrefix?.message}
              required
            />
            <Input
              label="Invoice Sequence"
              type="number"
              {...register('invoiceSequence', { valueAsNumber: true })}
              error={errors.invoiceSequence?.message}
              required
            />
            <Input
              label="Default Tax Rate (%)"
              type="number"
              step="0.01"
              {...register('taxRate', { valueAsNumber: true })}
              error={errors.taxRate?.message}
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  )
}

