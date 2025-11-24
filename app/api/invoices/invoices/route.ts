import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateInvoiceNumber } from '@/lib/utils'
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
    itemId: z.string(),
    quantity: z.number(),
    rate: z.number(),
    description: z.string().optional()
  }))
})

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        skip,
        take: limit,
        include: {
          client: true,
          items: {
            // include: {
            //   item: true
            // }
          },
          payments: true
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.invoice.count()
    ])

    return NextResponse.json({
      invoices,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = invoiceSchema.parse(body)

    // Get settings for invoice number generation
    let settings = await prisma.settings.findFirst()
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          companyName: 'Criti Designs',
          invoicePrefix: 'INV',
          invoiceSequence: 1
        }
      })
    }

    // Generate invoice number
    const invoiceNumber = generateInvoiceNumber(
      settings.invoicePrefix,
      settings.invoiceSequence
    )

    // Calculate totals
    const totals = calculateInvoiceTotals(
      data.items.map(item => ({ quantity: item.quantity, rate: item.rate })),
      data.taxRate,
      data.discountRate
    )

    // Create invoice with items
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        clientId: data.clientId,
        userId: session.user.id,
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
          // create: data.items.map(item => ({
          //   itemId: item.itemId,
          //   quantity: item.quantity,
          //   rate: item.rate,
          //   total: item.quantity * item.rate,
          //   description: item.description || null
          // }))
        }
      },
      include: {
        client: true,
        items: {
          // include: {
          //   item: true
          // }
        }
      }
    })

    // Update invoice sequence
    await prisma.settings.update({
      where: { id: settings.id },
      data: {
        invoiceSequence: settings.invoiceSequence + 1
      }
    })

    // Log activity
    await logActivity(
      session.user.id,
      'created',
      `Created invoice ${invoiceNumber}`,
      invoice.id
    )

    return NextResponse.json(invoice, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating invoice:', error)
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    )
  }
}

