import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [
      totalInvoices,
      totalRevenue,
      pendingInvoices,
      recentInvoices
    ] = await Promise.all([
      prisma.invoice.count(),
      prisma.invoice.aggregate({
        _sum: { totalAmount: true }
      }),
      prisma.invoice.count({
        where: {
          paymentStatus: {
            in: ['PENDING', 'PARTIAL']
          }
        }
      }),
      prisma.invoice.findMany({
        take: 5,
        include: {
          client: true
        },
        orderBy: { createdAt: 'desc' }
      })
    ])

    const pendingAmount = await prisma.invoice.aggregate({
      where: {
        paymentStatus: {
          in: ['PENDING', 'PARTIAL']
        }
      },
      _sum: { totalAmount: true }
    })

    // Calculate paid amount
    const totalPaid = await prisma.payment.aggregate({
      _sum: { amount: true }
    })

    return NextResponse.json({
      totalInvoices,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      pendingInvoices,
      pendingAmount: pendingAmount._sum.totalAmount || 0,
      totalPaid: totalPaid._sum.amount || 0,
      recentInvoices
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}

