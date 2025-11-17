import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sanitizeTemplate } from '@/lib/template-engine'
import { z } from 'zod'

const templateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  htmlContent: z.string().min(1),
  isDefault: z.boolean().default(false)
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const templates = await prisma.template.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = templateSchema.parse(body)

    // Sanitize HTML content
    const sanitizedContent = sanitizeTemplate(data.htmlContent)

    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await prisma.template.updateMany({
        where: { isDefault: true },
        data: { isDefault: false }
      })
    }

    const template = await prisma.template.create({
      data: {
        name: data.name,
        description: data.description || null,
        htmlContent: sanitizedContent,
        isDefault: data.isDefault
      }
    })

    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating template:', error)
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    )
  }
}

