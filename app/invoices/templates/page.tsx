'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Textarea from '@/components/ui/Textarea'
import Input from '@/components/ui/Input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'

const templateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  htmlContent: z.string().min(1, 'HTML content is required'),
  isDefault: z.boolean().default(false)
})

type TemplateFormData = z.infer<typeof templateSchema>

interface Template {
  id: string
  name: string
  description: string | null
  isDefault: boolean
  createdAt: string
}

export default function TemplatesPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      isDefault: false
    }
  })

  const htmlContent = watch('htmlContent')

  useEffect(() => {
    if (session?.user?.role !== 'ADMIN') {
      router.push('/invoices/dashboard')
      return
    }
    fetchTemplates()
  }, [session])

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/invoices/templates')
      if (res.ok) {
        const data = await res.json()
        setTemplates(data)
      }
    } catch (error) {
      toast.error('Failed to fetch templates')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: TemplateFormData) => {
    try {
      const url = editingTemplate
        ? `/api/invoices/templates/${editingTemplate.id}`
        : '/api/invoices/templates'
      const method = editingTemplate ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        toast.success(editingTemplate ? 'Template updated' : 'Template created')
        setIsModalOpen(false)
        reset()
        setEditingTemplate(null)
        fetchTemplates()
      } else {
        toast.error('Failed to save template')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const handleEdit = async (template: Template) => {
    try {
      const res = await fetch(`/api/invoices/templates/${template.id}`)
      if (res.ok) {
        const data = await res.json()
        setEditingTemplate(data)
        reset({
          name: data.name,
          description: data.description || '',
          htmlContent: data.htmlContent,
          isDefault: data.isDefault
        })
        setIsModalOpen(true)
      }
    } catch (error) {
      toast.error('Failed to load template')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return

    try {
      const res = await fetch(`/api/invoices/templates/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        toast.success('Template deleted')
        fetchTemplates()
      } else {
        toast.error('Failed to delete template')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const handleNew = () => {
    setEditingTemplate(null)
    reset({
      name: '',
      description: '',
      htmlContent: '',
      isDefault: false
    })
    setIsModalOpen(true)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
        <Button onClick={handleNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add Template
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No templates found
                </TableCell>
              </TableRow>
            ) : (
              templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.description || '-'}</TableCell>
                  <TableCell>
                    {template.isDefault && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Default
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(template.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(template)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(template.id)}
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
          setEditingTemplate(null)
          reset()
        }}
        title={editingTemplate ? 'Edit Template' : 'Add Template'}
        size="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Template Name"
            {...register('name')}
            error={errors.name?.message}
            required
          />
          <Input
            label="Description"
            {...register('description')}
            error={errors.description?.message}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isDefault"
              {...register('isDefault')}
              className="rounded border-gray-300"
            />
            <label htmlFor="isDefault" className="text-sm font-medium text-gray-700">
              Set as default template
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              HTML Content <span className="text-red-500">*</span>
            </label>
            <Textarea
              {...register('htmlContent')}
              error={errors.htmlContent?.message}
              rows={15}
              className="font-mono text-xs"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Use placeholders like {'{{'}invoice.number{'}}'}, {'{{'}client.name{'}}'}, {'{{'}items{'}}'}, {'{{'}totals.totalAmount{'}}'} etc.
            </p>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsModalOpen(false)
                setEditingTemplate(null)
                reset()
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingTemplate ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

