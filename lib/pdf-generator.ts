import puppeteer from 'puppeteer'
import { TemplateData, renderTemplate } from './template-engine'

export async function generateInvoicePDF(
  templateHtml: string,
  data: TemplateData
): Promise<Buffer> {
  const renderedHtml = renderTemplate(templateHtml, data)

  // Wrap in a complete HTML document with styles
  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #333;
            padding: 20px;
          }
          .items-table, .payments-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .items-table th, .items-table td,
          .payments-table th, .payments-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          .items-table th, .payments-table th {
            background-color: #f5f5f5;
            font-weight: bold;
          }
          .items-table td:last-child,
          .payments-table td:nth-child(2) {
            text-align: right;
          }
          @media print {
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        ${renderedHtml}
      </body>
    </html>
  `

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' })
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    })

    return Buffer.from(pdf)
  } finally {
    await browser.close()
  }
}

