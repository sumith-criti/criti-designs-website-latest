import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@critidesigns.com' },
    update: {},
    create: {
      email: 'admin@critidesigns.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN'
    }
  })

  // Create staff user
  const staffPassword = await bcrypt.hash('staff123', 10)
  const staff = await prisma.user.upsert({
    where: { email: 'staff@critidesigns.com' },
    update: {},
    create: {
      email: 'staff@critidesigns.com',
      password: staffPassword,
      name: 'Staff User',
      role: 'STAFF'
    }
  })

  // Create default settings
  const existingSettings = await prisma.settings.findFirst()
  if (!existingSettings) {
    await prisma.settings.create({
      data: {
        companyName: 'Criti Designs',
        companyEmail: 'info@critidesigns.com',
        companyPhone: '+91 1234567890',
        companyAddress: 'Kerala, India',
        invoicePrefix: 'INV',
        invoiceSequence: 1,
        taxRate: 18
      }
    })
  }

  // Create default template
  const defaultTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { display: flex; justify-content: space-between; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .company-name { font-size: 24px; font-weight: bold; }
        .invoice-title { font-size: 32px; font-weight: bold; }
        .client-section { margin-bottom: 30px; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .items-table th { background-color: #f5f5f5; }
        .totals { margin-top: 20px; text-align: right; }
        .total { font-size: 18px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="company-name">{{company.name}}</div>
          <div>{{company.address}}</div>
          <div>{{company.phone}}</div>
        </div>
        <div>
          <div class="invoice-title">INVOICE</div>
          <div>Invoice #: {{invoice.number}}</div>
          <div>Date: {{invoice.date}}</div>
        </div>
      </div>
      <div class="client-section">
        <strong>Bill To:</strong><br>
        {{client.name}}<br>
        {{client.address}}<br>
        {{client.phone}}
      </div>
      {{items}}
      <div class="totals">
        <div>Subtotal: {{totals.subtotal}}</div>
        <div>Tax ({{totals.taxRate}}%): {{totals.taxAmount}}</div>
        <div class="total">Total: {{totals.totalAmount}}</div>
      </div>
    </body>
    </html>
  `

  const existingTemplate = await prisma.template.findFirst({
    where: { isDefault: true }
  })
  if (!existingTemplate) {
    await prisma.template.create({
      data: {
        name: 'Default Template',
        description: 'Default invoice template',
        htmlContent: defaultTemplate,
        isDefault: true
      }
    })
  }

  console.log('Seed data created successfully!')
  console.log('Admin: admin@critidesigns.com / admin123')
  console.log('Staff: staff@critidesigns.com / staff123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

