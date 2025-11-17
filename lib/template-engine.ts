import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const window = new JSDOM('').window
const purify = DOMPurify(window as any)

export interface TemplateData {
  invoice: {
    number: string
    date: string
    dueDate?: string
    projectName?: string
    location?: string
    notes?: string
  }
  client: {
    name: string
    email?: string
    phone?: string
    address?: string
    gstNumber?: string
  }
  company: {
    name: string
    email?: string
    phone?: string
    address?: string
    gst?: string
    website?: string
    logoUrl?: string
  }
  bank: {
    name?: string
    accountNumber?: string
    ifsc?: string
    branch?: string
  }
  items: Array<{
    name: string
    description?: string
    quantity: number
    unitType: string
    rate: number
    total: number
  }>
  totals: {
    subtotal: number
    discountAmount: number
    taxAmount: number
    totalAmount: number
    taxRate: number
    discountRate: number
  }
  payments?: Array<{
    amount: number
    date: string
    mode: string
    referenceNumber?: string
  }>
}

export function sanitizeTemplate(html: string): string {
  // Remove script tags and event handlers
  return purify.sanitize(html, {
    ALLOWED_TAGS: [
      'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'img', 'br', 'hr', 'strong', 'em', 'b', 'i', 'u',
      'ul', 'ol', 'li', 'a', 'style'
    ],
    ALLOWED_ATTR: [
      'class', 'id', 'style', 'src', 'alt', 'href', 'colspan', 'rowspan',
      'width', 'height', 'align', 'valign'
    ],
    ALLOW_DATA_ATTR: false
  })
}

export function renderTemplate(template: string, data: TemplateData): string {
  let rendered = template

  // Replace simple variables
  rendered = rendered.replace(/\{\{invoice\.number\}\}/g, data.invoice.number)
  rendered = rendered.replace(/\{\{invoice\.date\}\}/g, data.invoice.date)
  rendered = rendered.replace(/\{\{invoice\.dueDate\}\}/g, data.invoice.dueDate || '')
  rendered = rendered.replace(/\{\{invoice\.projectName\}\}/g, data.invoice.projectName || '')
  rendered = rendered.replace(/\{\{invoice\.location\}\}/g, data.invoice.location || '')
  rendered = rendered.replace(/\{\{invoice\.notes\}\}/g, data.invoice.notes || '')

  rendered = rendered.replace(/\{\{client\.name\}\}/g, data.client.name)
  rendered = rendered.replace(/\{\{client\.email\}\}/g, data.client.email || '')
  rendered = rendered.replace(/\{\{client\.phone\}\}/g, data.client.phone || '')
  rendered = rendered.replace(/\{\{client\.address\}\}/g, data.client.address || '')
  rendered = rendered.replace(/\{\{client\.gstNumber\}\}/g, data.client.gstNumber || '')

  rendered = rendered.replace(/\{\{company\.name\}\}/g, data.company.name)
  rendered = rendered.replace(/\{\{company\.email\}\}/g, data.company.email || '')
  rendered = rendered.replace(/\{\{company\.phone\}\}/g, data.company.phone || '')
  rendered = rendered.replace(/\{\{company\.address\}\}/g, data.company.address || '')
  rendered = rendered.replace(/\{\{company\.gst\}\}/g, data.company.gst || '')
  rendered = rendered.replace(/\{\{company\.website\}\}/g, data.company.website || '')
  rendered = rendered.replace(/\{\{company\.logoUrl\}\}/g, data.company.logoUrl || '')

  rendered = rendered.replace(/\{\{bank\.name\}\}/g, data.bank.name || '')
  rendered = rendered.replace(/\{\{bank\.accountNumber\}\}/g, data.bank.accountNumber || '')
  rendered = rendered.replace(/\{\{bank\.ifsc\}\}/g, data.bank.ifsc || '')
  rendered = rendered.replace(/\{\{bank\.branch\}\}/g, data.bank.branch || '')

  // Replace totals
  rendered = rendered.replace(/\{\{totals\.subtotal\}\}/g, formatCurrency(data.totals.subtotal))
  rendered = rendered.replace(/\{\{totals\.discountAmount\}\}/g, formatCurrency(data.totals.discountAmount))
  rendered = rendered.replace(/\{\{totals\.taxAmount\}\}/g, formatCurrency(data.totals.taxAmount))
  rendered = rendered.replace(/\{\{totals\.totalAmount\}\}/g, formatCurrency(data.totals.totalAmount))
  rendered = rendered.replace(/\{\{totals\.taxRate\}\}/g, data.totals.taxRate.toString())
  rendered = rendered.replace(/\{\{totals\.discountRate\}\}/g, data.totals.discountRate.toString())

  // Replace items table
  const itemsHtml = renderItemsTable(data.items)
  rendered = rendered.replace(/\{\{items\}\}/g, itemsHtml)

  // Replace payments if exists
  if (data.payments && data.payments.length > 0) {
    const paymentsHtml = renderPaymentsTable(data.payments)
    rendered = rendered.replace(/\{\{payments\}\}/g, paymentsHtml)
  } else {
    rendered = rendered.replace(/\{\{payments\}\}/g, '')
  }

  return rendered
}

function renderItemsTable(items: TemplateData['items']): string {
  if (items.length === 0) return ''

  const rows = items.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.name}${item.description ? `<br><small>${item.description}</small>` : ''}</td>
      <td>${item.quantity} ${item.unitType}</td>
      <td>${formatCurrency(item.rate)}</td>
      <td>${formatCurrency(item.total)}</td>
    </tr>
  `).join('')

  return `
    <table class="items-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Rate</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `
}

function renderPaymentsTable(payments: TemplateData['payments']): string {
  if (!payments || payments.length === 0) return ''

  const rows = payments.map((payment) => `
    <tr>
      <td>${payment.date}</td>
      <td>${formatCurrency(payment.amount)}</td>
      <td>${payment.mode}</td>
      <td>${payment.referenceNumber || '-'}</td>
    </tr>
  `).join('')

  return `
    <table class="payments-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Mode</th>
          <th>Reference</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount)
}

