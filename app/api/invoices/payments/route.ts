import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { logActivity } from '@/lib/activity-log'
import { z } from 'zod'

const paymentSchema = z.object({
  invoiceId: z.string(),
  amount: z.number().min(0.01),
  paymentDate: z.string(),
  paymentMode: z.enum(['CASH', 'BANK_TRANSFER', 'CHEQUE', 'CARD', 'UPI', 'OTHER']),
  referenceNumber: z.string().optional(),
  notes: z.string().optional()
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = paymentSchema.parse(body)

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        invoiceId: data.invoiceId,
        amount: data.amount,
        paymentDate: new Date(data.paymentDate),
        paymentMode: data.paymentMode,
        referenceNumber: data.referenceNumber || null,
        notes: data.notes || null
      },
      include: {
        invoice: true
      }
    })

    // Calculate total payments for invoice
    const totalPayments = await prisma.payment.aggregate({
      where: { invoiceId: data.invoiceId },
      _sum: { amount: true }
    })

    const totalPaid = totalPayments._sum.amount || 0
    const invoiceTotal = payment.invoice.totalAmount

    // Update invoice payment status
    let paymentStatus: 'PENDING' | 'PARTIAL' | 'PAID'
    if (totalPaid >= invoiceTotal) {
      paymentStatus = 'PAID'
    } else if (totalPaid > 0) {
      paymentStatus = 'PARTIAL'
    } else {
      paymentStatus = 'PENDING'
    }

    await prisma.invoice.update({
      where: { id: data.invoiceId },
      data: { paymentStatus }
    })

    // Log activity
    await logActivity(
      session.user.id,
      'payment_added',
      `Added payment of ${data.amount} for invoice ${payment.invoice.invoiceNumber}`,
      data.invoiceId
    )

    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating payment:', error)
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}

