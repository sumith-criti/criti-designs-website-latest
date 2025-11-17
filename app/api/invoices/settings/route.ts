import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const settingsSchema = z.object({
  companyName: z.string().min(1),
  companyEmail: z.string().email().optional().or(z.literal('')),
  companyPhone: z.string().optional(),
  companyAddress: z.string().optional(),
  companyGst: z.string().optional(),
  companyWebsite: z.string().optional(),
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankIfsc: z.string().optional(),
  bankBranch: z.string().optional(),
  invoicePrefix: z.string().min(1),
  invoiceSequence: z.number().min(1),
  taxRate: z.number().min(0).max(100),
  logoUrl: z.string().optional()
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let settings = await prisma.settings.findFirst()
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          companyName: 'Criti Designs',
          invoicePrefix: 'INV',
          invoiceSequence: 1,
          taxRate: 18
        }
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = settingsSchema.parse(body)

    let settings = await prisma.settings.findFirst()
    
    if (settings) {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: {
          companyName: data.companyName,
          companyEmail: data.companyEmail || null,
          companyPhone: data.companyPhone || null,
          companyAddress: data.companyAddress || null,
          companyGst: data.companyGst || null,
          companyWebsite: data.companyWebsite || null,
          bankName: data.bankName || null,
          bankAccountNumber: data.bankAccountNumber || null,
          bankIfsc: data.bankIfsc || null,
          bankBranch: data.bankBranch || null,
          invoicePrefix: data.invoicePrefix,
          invoiceSequence: data.invoiceSequence,
          taxRate: data.taxRate,
          logoUrl: data.logoUrl || null
        }
      })
    } else {
      settings = await prisma.settings.create({
        data: {
          companyName: data.companyName,
          companyEmail: data.companyEmail || null,
          companyPhone: data.companyPhone || null,
          companyAddress: data.companyAddress || null,
          companyGst: data.companyGst || null,
          companyWebsite: data.companyWebsite || null,
          bankName: data.bankName || null,
          bankAccountNumber: data.bankAccountNumber || null,
          bankIfsc: data.bankIfsc || null,
          bankBranch: data.bankBranch || null,
          invoicePrefix: data.invoicePrefix,
          invoiceSequence: data.invoiceSequence,
          taxRate: data.taxRate,
          logoUrl: data.logoUrl || null
        }
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}

