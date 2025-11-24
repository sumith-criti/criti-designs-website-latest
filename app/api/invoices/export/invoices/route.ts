import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateCSVString, generateExcelBuffer } from '@/lib/export'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const format = searchParams.get('format') || 'csv'

    const invoices = await prisma.invoice.findMany({
      include: {
        client: true
      },
      orderBy: { createdAt: 'desc' }
    })

    const exportData = invoices.map(invoice => ({
      'Invoice Number': invoice.invoiceNumber,
      'Client Name': invoice.client.name,
      'Invoice Date': invoice.invoiceDate.toISOString().split('T')[0],
      'Due Date': invoice.dueDate ? invoice.dueDate.toISOString().split('T')[0] : '',
      'Project Name': invoice.projectName || '',
      'Location': invoice.location || '',
      'Subtotal': invoice.subtotal,
      'Tax Amount': invoice.taxAmount,
      'Discount Amount': invoice.discountAmount,
      'Total Amount': invoice.totalAmount,
      'Payment Status': invoice.paymentStatus,
      'Created At': invoice.createdAt.toISOString()
    }))

    if (format === 'excel') {
      const buffer = generateExcelBuffer(exportData)
      return new NextResponse(new Uint8Array(buffer), {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename="invoices.xlsx"'
        }
      })
    } else {
      const csv = generateCSVString(exportData)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="invoices.csv"'
        }
      })
    }
  } catch (error) {
    console.error('Error exporting invoices:', error)
    return NextResponse.json(
      { error: 'Failed to export invoices' },
      { status: 500 }
    )
  }
}

