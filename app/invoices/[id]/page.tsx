'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Download, Edit, Plus } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const paymentSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  paymentDate: z.string().min(1, 'Payment date is required'),
  paymentMode: z.enum(['CASH', 'BANK_TRANSFER', 'CHEQUE', 'CARD', 'UPI', 'OTHER']),
  referenceNumber: z.string().optional(),
  notes: z.string().optional()
})

type PaymentFormData = z.infer<typeof paymentSchema>

interface Invoice {
  id: string
  invoiceNumber: string
  projectName: string | null
  location: string | null
  invoiceDate: string
  dueDate: string | null
  paymentStatus: string
  subtotal: number
  taxRate: number
  taxAmount: number
  discountRate: number
  discountAmount: number
  totalAmount: number
  notes: string | null
  client: {
    id: string
    name: string
    email: string | null
    phone: string | null
    address: string | null
    gstNumber: string | null
  }
  items: Array<{
    id: string
    quantity: number
    rate: number
    total: number
    description: string | null
    item: {
      name: string
      unitType: string
    }
  }>
  payments: Array<{
    id: string
    amount: number
    paymentDate: string
    paymentMode: string
    referenceNumber: string | null
    notes: string | null
  }>
}

export default function InvoiceViewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMode: 'BANK_TRANSFER'
    }
  })

  useEffect(() => {
    fetchInvoice()
  }, [params.id])

  const fetchInvoice = async () => {
    try {
      const res = await fetch(`/api/invoices/invoices/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setInvoice(data)
      } else {
        toast.error('Failed to load invoice')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const res = await fetch(`/api/invoices/invoices/${params.id}/pdf`)
      if (res.ok) {
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `invoice-${invoice?.invoiceNumber}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        toast.success('PDF downloaded')
      } else {
        toast.error('Failed to generate PDF')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const onSubmitPayment = async (data: PaymentFormData) => {
    try {
      const res = await fetch('/api/invoices/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          invoiceId: params.id
        })
      })

      if (res.ok) {
        toast.success('Payment added successfully')
        setIsPaymentModalOpen(false)
        reset()
        fetchInvoice()
      } else {
        toast.error('Failed to add payment')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PARTIAL: 'bg-orange-100 text-orange-800',
      PAID: 'bg-green-100 text-green-800'
    }
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    )
  }

  const totalPaid = invoice?.payments.reduce((sum, p) => sum + p.amount, 0) || 0
  const balanceDue = (invoice?.totalAmount || 0) - totalPaid

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  if (!invoice) {
    return <div className="flex items-center justify-center h-64">Invoice not found</div>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice {invoice.invoiceNumber}</h1>
          <p className="text-sm text-gray-600 mt-1">{getStatusBadge(invoice.paymentStatus)}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsPaymentModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Payment
          </Button>
          <Button onClick={handleDownloadPDF} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Link href={`/invoices/${params.id}/edit`}>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h2>
          <div className="space-y-2">
            <p className="font-medium">{invoice.client.name}</p>
            {invoice.client.email && <p className="text-sm text-gray-600">{invoice.client.email}</p>}
            {invoice.client.phone && <p className="text-sm text-gray-600">{invoice.client.phone}</p>}
            {invoice.client.address && <p className="text-sm text-gray-600">{invoice.client.address}</p>}
            {invoice.client.gstNumber && <p className="text-sm text-gray-600">GST: {invoice.client.gstNumber}</p>}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Invoice Date:</span>
              <span className="font-medium">{formatDate(invoice.invoiceDate)}</span>
            </div>
            {invoice.dueDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-medium">{formatDate(invoice.dueDate)}</span>
              </div>
            )}
            {invoice.projectName && (
              <div className="flex justify-between">
                <span className="text-gray-600">Project:</span>
                <span className="font-medium">{invoice.projectName}</span>
              </div>
            )}
            {invoice.location && (
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{invoice.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoice.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.item.name}</div>
                      {item.description && (
                        <div className="text-sm text-gray-500">{item.description}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.quantity} {item.item.unitType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(item.rate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
            </div>
            {invoice.discountAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discount ({invoice.discountRate}%):</span>
                <span className="font-medium">-{formatCurrency(invoice.discountAmount)}</span>
              </div>
            )}
            {invoice.taxAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tax ({invoice.taxRate}%):</span>
                <span className="font-medium">+{formatCurrency(invoice.taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(invoice.totalAmount)}</span>
            </div>
            {totalPaid > 0 && (
              <>
                <div className="flex justify-between text-green-600">
                  <span>Paid:</span>
                  <span className="font-medium">{formatCurrency(totalPaid)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Balance Due:</span>
                  <span>{formatCurrency(balanceDue)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {invoice.payments.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payments</h2>
            <div className="space-y-3">
              {invoice.payments.map((payment) => (
                <div key={payment.id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{formatCurrency(payment.amount)}</p>
                      <p className="text-sm text-gray-600">{formatDate(payment.paymentDate)}</p>
                      <p className="text-sm text-gray-600">{payment.paymentMode}</p>
                      {payment.referenceNumber && (
                        <p className="text-sm text-gray-600">Ref: {payment.referenceNumber}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {invoice.notes && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Notes</h2>
          <p className="text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
        </div>
      )}

      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false)
          reset()
        }}
        title="Add Payment"
      >
        <form onSubmit={handleSubmit(onSubmitPayment)} className="space-y-4">
          <Input
            label="Amount"
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            error={errors.amount?.message}
            required
          />
          <Input
            label="Payment Date"
            type="date"
            {...register('paymentDate')}
            error={errors.paymentDate?.message}
            required
          />
          <Select
            label="Payment Mode"
            options={[
              { value: 'CASH', label: 'Cash' },
              { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
              { value: 'CHEQUE', label: 'Cheque' },
              { value: 'CARD', label: 'Card' },
              { value: 'UPI', label: 'UPI' },
              { value: 'OTHER', label: 'Other' }
            ]}
            {...register('paymentMode')}
            error={errors.paymentMode?.message}
            required
          />
          <Input
            label="Reference Number"
            {...register('referenceNumber')}
            error={errors.referenceNumber?.message}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              {...register('notes')}
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsPaymentModalOpen(false)
                reset()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add Payment</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

