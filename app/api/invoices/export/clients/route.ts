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

    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' }
    })

    const exportData = clients.map(client => ({
      Name: client.name,
      Email: client.email || '',
      Phone: client.phone || '',
      Address: client.address || '',
      'GST Number': client.gstNumber || '',
      'Created At': client.createdAt.toISOString()
    }))

    if (format === 'excel') {
      const buffer = generateExcelBuffer(exportData)
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename="clients.xlsx"'
        }
      })
    } else {
      const csv = generateCSVString(exportData)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="clients.csv"'
        }
      })
    }
  } catch (error) {
    console.error('Error exporting clients:', error)
    return NextResponse.json(
      { error: 'Failed to export clients' },
      { status: 500 }
    )
  }
}

