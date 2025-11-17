import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { calculateInvoiceTotals } from '@/lib/utils'
import { logActivity } from '@/lib/activity-log'
import { z } from 'zod'

const invoiceSchema = z.object({
  clientId: z.string(),
  projectName: z.string().optional(),
  location: z.string().optional(),
  invoiceDate: z.string(),
  dueDate: z.string().optional(),
  paymentStatus: z.enum(['PENDING', 'PARTIAL', 'PAID']),
  taxRate: z.number().default(0),
  discountRate: z.number().default(0),
  notes: z.string().optional(),
  templateId: z.string().optional(),
  items: z.array(z.object({
    id: z.string().optional(),
    itemId: z.string(),
    quantity: z.number(),
    rate: z.number(),
    description: z.string().optional()
  }))
})

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        items: {
          include: {
            item: true
          }
        },
        payments: true,
        template: true
      }
    })

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    return NextResponse.json(invoice)
  } catch (error) {
    console.error('Error fetching invoice:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = invoiceSchema.parse(body)

    // Calculate totals
    const totals = calculateInvoiceTotals(
      data.items.map(item => ({ quantity: item.quantity, rate: item.rate })),
      data.taxRate,
      data.discountRate
    )

    // Delete existing items
    await prisma.invoiceItem.deleteMany({
      where: { invoiceId: params.id }
    })

    // Update invoice
    const invoice = await prisma.invoice.update({
      where: { id: params.id },
      data: {
        clientId: data.clientId,
        projectName: data.projectName || null,
        location: data.location || null,
        invoiceDate: new Date(data.invoiceDate),
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        paymentStatus: data.paymentStatus,
        taxRate: data.taxRate,
        taxAmount: totals.taxAmount,
        discountRate: data.discountRate,
        discountAmount: totals.discountAmount,
        subtotal: totals.subtotal,
        totalAmount: totals.totalAmount,
        notes: data.notes || null,
        templateId: data.templateId || null,
        items: {
          create: data.items.map(item => ({
            itemId: item.itemId,
            quantity: item.quantity,
            rate: item.rate,
            total: item.quantity * item.rate,
            description: item.description || null
          }))
        }
      },
      include: {
        client: true,
        items: {
          include: {
            item: true
          }
        }
      }
    })

    // Log activity
    await logActivity(
      session.user.id,
      'updated',
      `Updated invoice ${invoice.invoiceNumber}`,
      invoice.id
    )

    return NextResponse.json(invoice)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating invoice:', error)
    return NextResponse.json(
      { error: 'Failed to update invoice' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id }
    })

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    await prisma.invoice.delete({
      where: { id: params.id }
    })

    // Log activity
    await logActivity(
      session.user.id,
      'deleted',
      `Deleted invoice ${invoice.invoiceNumber}`,
      invoice.id
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting invoice:', error)
    return NextResponse.json(
      { error: 'Failed to delete invoice' },
      { status: 500 }
    )
  }
}

