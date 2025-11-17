'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, Save } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { formatCurrency, calculateInvoiceTotals } from '@/lib/utils'

const invoiceItemSchema = z.object({
  itemId: z.string().min(1, 'Item is required'),
  quantity: z.number().min(0.01, 'Quantity must be greater than 0'),
  rate: z.number().min(0, 'Rate must be positive'),
  description: z.string().optional()
})

const invoiceSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  projectName: z.string().optional(),
  location: z.string().optional(),
  invoiceDate: z.string().min(1, 'Invoice date is required'),
  dueDate: z.string().optional(),
  paymentStatus: z.enum(['PENDING', 'PARTIAL', 'PAID']),
  taxRate: z.number().min(0).max(100).default(0),
  discountRate: z.number().min(0).max(100).default(0),
  notes: z.string().optional(),
  templateId: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required')
})

type InvoiceFormData = z.infer<typeof invoiceSchema>

interface Client {
  id: string
  name: string
}

interface Item {
  id: string
  name: string
  unitType: string
  defaultRate: number
}

export default function NewInvoicePage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      paymentStatus: 'PENDING',
      taxRate: 18,
      discountRate: 0,
      invoiceDate: new Date().toISOString().split('T')[0],
      items: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  const watchedItems = watch('items')
  const taxRate = watch('taxRate') || 0
  const discountRate = watch('discountRate') || 0

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [clientsRes, itemsRes] = await Promise.all([
        fetch('/api/invoices/clients'),
        fetch('/api/invoices/items')
      ])

      if (clientsRes.ok) {
        const clientsData = await clientsRes.json()
        setClients(clientsData)
      }

      if (itemsRes.ok) {
        const itemsData = await itemsRes.json()
        setItems(itemsData)
      }
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const addItem = () => {
    append({
      itemId: '',
      quantity: 1,
      rate: 0,
      description: ''
    })
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    if (field === 'itemId') {
      const item = items.find(i => i.id === value)
      if (item) {
        setValue(`items.${index}.rate`, item.defaultRate)
        setValue(`items.${index}.itemId`, value)
      }
    } else {
      setValue(`items.${index}.${field}` as any, value)
    }
  }

  const totals = calculateInvoiceTotals(
    watchedItems.map(item => ({
      quantity: item?.quantity || 0,
      rate: item?.rate || 0
    })),
    taxRate,
    discountRate
  )

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      const res = await fetch('/api/invoices/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        const invoice = await res.json()
        toast.success('Invoice created successfully')
        router.push(`/invoices/${invoice.id}`)
      } else {
        const error = await res.json()
        toast.error(error.error || 'Failed to create invoice')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Create Invoice</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Invoice Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Client"
              options={clients.map(c => ({ value: c.id, label: c.name }))}
              {...register('clientId')}
              error={errors.clientId?.message}
              required
            />
            <Input
              label="Project Name"
              {...register('projectName')}
              error={errors.projectName?.message}
            />
            <Input
              label="Location"
              {...register('location')}
              error={errors.location?.message}
            />
            <Input
              label="Invoice Date"
              type="date"
              {...register('invoiceDate')}
              error={errors.invoiceDate?.message}
              required
            />
            <Input
              label="Due Date"
              type="date"
              {...register('dueDate')}
              error={errors.dueDate?.message}
            />
            <Select
              label="Payment Status"
              options={[
                { value: 'PENDING', label: 'Pending' },
                { value: 'PARTIAL', label: 'Partial' },
                { value: 'PAID', label: 'Paid' }
              ]}
              {...register('paymentStatus')}
              error={errors.paymentStatus?.message}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Items</h2>
            <Button type="button" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {fields.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items added. Click "Add Item" to add items.
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => {
                const selectedItem = items.find(i => i.id === watchedItems[index]?.itemId)
                return (
                  <div key={field.id} className="border rounded-lg p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Select
                        label="Item"
                        options={[
                          { value: '', label: 'Select item' },
                          ...items.map(i => ({ value: i.id, label: i.name }))
                        ]}
                        value={watchedItems[index]?.itemId || ''}
                        onChange={(e) => handleItemChange(index, 'itemId', e.target.value)}
                        error={errors.items?.[index]?.itemId?.message}
                      />
                      <Input
                        label="Quantity"
                        type="number"
                        step="0.01"
                        value={watchedItems[index]?.quantity || 0}
                        onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                        error={errors.items?.[index]?.quantity?.message}
                        required
                      />
                      <Input
                        label={`Rate (${selectedItem?.unitType || 'unit'})`}
                        type="number"
                        step="0.01"
                        value={watchedItems[index]?.rate || 0}
                        onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                        error={errors.items?.[index]?.rate?.message}
                        required
                      />
                      <div className="flex items-end">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Total
                          </label>
                          <div className="h-10 flex items-center text-sm font-medium text-gray-900">
                            {formatCurrency((watchedItems[index]?.quantity || 0) * (watchedItems[index]?.rate || 0))}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="ml-2"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    <Input
                      label="Description"
                      value={watchedItems[index]?.description || ''}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      error={errors.items?.[index]?.description?.message}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Totals</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tax Rate (%)"
              type="number"
              step="0.01"
              {...register('taxRate', { valueAsNumber: true })}
              error={errors.taxRate?.message}
            />
            <Input
              label="Discount Rate (%)"
              type="number"
              step="0.01"
              {...register('discountRate', { valueAsNumber: true })}
              error={errors.discountRate?.message}
            />
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount ({discountRate}%):</span>
              <span className="font-medium">-{formatCurrency(totals.discountAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax ({taxRate}%):</span>
              <span className="font-medium">+{formatCurrency(totals.taxAmount)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(totals.totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h2>
          <textarea
            {...register('notes')}
            className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            rows={4}
            placeholder="Add any additional notes or terms..."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </form>
    </div>
  )
}

