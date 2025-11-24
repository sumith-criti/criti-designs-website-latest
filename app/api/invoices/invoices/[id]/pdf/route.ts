import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateInvoicePDF } from '@/lib/pdf-generator'
import { TemplateData } from '@/lib/template-engine'
import { formatDate } from '@/lib/utils'

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
          // include: {
          //   item: true
          // }
        },
        payments: true,
        template: true
      }
    })

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    // Get settings
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

    // Get template
    const template = invoice.template || await prisma.template.findFirst({
      where: { isDefault: true }
    })

    if (!template) {
      return NextResponse.json(
        { error: 'No template found' },
        { status: 404 }
      )
    }

    // Prepare template data
    const templateData: TemplateData = {
      invoice: {
        number: invoice.invoiceNumber,
        date: formatDate(invoice.invoiceDate),
        dueDate: invoice.dueDate ? formatDate(invoice.dueDate) : undefined,
        projectName: invoice.projectName || undefined,
        location: invoice.location || undefined,
        notes: invoice.notes || undefined
      },
      client: {
        name: invoice.client.name,
        email: invoice.client.email || undefined,
        phone: invoice.client.phone || undefined,
        address: invoice.client.address || undefined,
        gstNumber: invoice.client.gstNumber || undefined
      },
      company: {
        name: settings.companyName,
        email: settings.companyEmail || undefined,
        phone: settings.companyPhone || undefined,
        address: settings.companyAddress || undefined,
        gst: settings.companyGst || undefined,
        website: settings.companyWebsite || undefined,
        logoUrl: settings.logoUrl || undefined
      },
      bank: {
        name: settings.bankName || undefined,
        accountNumber: settings.bankAccountNumber || undefined,
        ifsc: settings.bankIfsc || undefined,
        branch: settings.bankBranch || undefined
      },
      items: [],
      // items: invoice.items.map(item => ({
      //   name: item.item.name,
      //   description: item.description || undefined,
      //   quantity: item.quantity,
      //   unitType: item.item.unitType,
      //   rate: item.rate,
      //   total: item.total
      // })),
      totals: {
        subtotal: invoice.subtotal,
        discountAmount: invoice.discountAmount,
        taxAmount: invoice.taxAmount,
        totalAmount: invoice.totalAmount,
        taxRate: invoice.taxRate,
        discountRate: invoice.discountRate
      },
      payments: invoice.payments.length > 0 ? invoice.payments.map(payment => ({
        amount: payment.amount,
        date: formatDate(payment.paymentDate),
        mode: payment.paymentMode,
        referenceNumber: payment.referenceNumber || undefined
      })) : undefined
    }

    // Generate PDF
    const pdfBuffer = await generateInvoicePDF(template.htmlContent, templateData)

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${invoice.invoiceNumber}.pdf"`
      }
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}

