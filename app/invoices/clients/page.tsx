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

const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  gstNumber: z.string().optional(),
  notes: z.string().optional()
})

type ClientFormData = z.infer<typeof clientSchema>

interface Client {
  id: string
  name: string
  email: string | null
  phone: string | null
  address: string | null
  gstNumber: string | null
  notes: string | null
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema)
  })

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/invoices/clients')
      if (res.ok) {
        const data = await res.json()
        setClients(data)
      }
    } catch (error) {
      toast.error('Failed to fetch clients')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ClientFormData) => {
    try {
      const url = editingClient
        ? `/api/invoices/clients/${editingClient.id}`
        : '/api/invoices/clients'
      const method = editingClient ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        toast.success(editingClient ? 'Client updated' : 'Client created')
        setIsModalOpen(false)
        reset()
        setEditingClient(null)
        fetchClients()
      } else {
        toast.error('Failed to save client')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    reset({
      name: client.name,
      email: client.email || '',
      phone: client.phone || '',
      address: client.address || '',
      gstNumber: client.gstNumber || '',
      notes: client.notes || ''
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return

    try {
      const res = await fetch(`/api/invoices/clients/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast.success('Client deleted')
        fetchClients()
      } else {
        toast.error('Failed to delete client')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const handleNew = () => {
    setEditingClient(null)
    reset()
    setIsModalOpen(true)
  }

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone?.includes(searchTerm)
  )

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              window.open('/api/invoices/export/clients?format=excel', '_blank')
            }}
          >
            Export Excel
          </Button>
          <Button onClick={handleNew}>
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search clients..."
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
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>GST Number</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No clients found
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email || '-'}</TableCell>
                  <TableCell>{client.phone || '-'}</TableCell>
                  <TableCell>{client.gstNumber || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(client)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(client.id)}
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
          setEditingClient(null)
          reset()
        }}
        title={editingClient ? 'Edit Client' : 'Add Client'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            {...register('name')}
            error={errors.name?.message}
            required
          />
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Phone"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <Input
            label="Address"
            {...register('address')}
            error={errors.address?.message}
          />
          <Input
            label="GST Number"
            {...register('gstNumber')}
            error={errors.gstNumber?.message}
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
                setIsModalOpen(false)
                setEditingClient(null)
                reset()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingClient ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

