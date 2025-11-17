'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { formatCurrency } from '@/lib/utils'

const itemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  unitType: z.string().min(1, 'Unit type is required'),
  defaultRate: z.number().min(0, 'Rate must be positive'),
  description: z.string().optional()
})

type ItemFormData = z.infer<typeof itemSchema>

interface Item {
  id: string
  name: string
  unitType: string
  defaultRate: number
  description: string | null
}

const unitTypes = [
  { value: 'sqft', label: 'Square Feet (sqft)' },
  { value: 'unit', label: 'Unit' },
  { value: 'hour', label: 'Hour' },
  { value: 'day', label: 'Day' },
  { value: 'kg', label: 'Kilogram (kg)' },
  { value: 'meter', label: 'Meter' }
]

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema)
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/invoices/items')
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch (error) {
      toast.error('Failed to fetch items')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ItemFormData) => {
    try {
      const url = editingItem
        ? `/api/invoices/items/${editingItem.id}`
        : '/api/invoices/items'
      const method = editingItem ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        toast.success(editingItem ? 'Item updated' : 'Item created')
        setIsModalOpen(false)
        reset()
        setEditingItem(null)
        fetchItems()
      } else {
        toast.error('Failed to save item')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const handleEdit = (item: Item) => {
    setEditingItem(item)
    reset({
      name: item.name,
      unitType: item.unitType,
      defaultRate: item.defaultRate,
      description: item.description || ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const res = await fetch(`/api/invoices/items/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast.success('Item deleted')
        fetchItems()
      } else {
        toast.error('Failed to delete item')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const handleNew = () => {
    setEditingItem(null)
    reset()
    setIsModalOpen(true)
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.unitType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Items</h1>
        <Button onClick={handleNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Unit Type</TableHead>
              <TableHead>Default Rate</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No items found
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.unitType}</TableCell>
                  <TableCell>{formatCurrency(item.defaultRate)}</TableCell>
                  <TableCell>{item.description || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingItem(null)
          reset()
        }}
        title={editingItem ? 'Edit Item' : 'Add Item'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            {...register('name')}
            error={errors.name?.message}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register('unitType')}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              {unitTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.unitType && (
              <p className="mt-1 text-sm text-red-600">{errors.unitType.message}</p>
            )}
          </div>
          <Input
            label="Default Rate"
            type="number"
            step="0.01"
            {...register('defaultRate', { valueAsNumber: true })}
            error={errors.defaultRate?.message}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description')}
              className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setEditingItem(null)
                reset()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

