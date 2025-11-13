import { NextResponse } from 'next/server';
import { buildEstimatePdfTemplate } from '@/lib/pdfTemplate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    if (process.env.ENABLE_PDF !== 'true') {
      return NextResponse.json(
        { error: 'PDF generation is disabled in this environment.' },
        { status: 501 }
      );
    }

    const payload = await request.json();
    const { formData, estimate } = payload || {};
    if (!formData || !estimate) {
      return NextResponse.json({ error: 'Missing form data or estimate payload.' }, { status: 400 });
    }

    const html = buildEstimatePdfTemplate({ formData, estimate });

    const puppeteerModule = await import('puppeteer').catch(() => null as any);
    if (!puppeteerModule) {
      return NextResponse.json({ error: 'PDF generation module unavailable.' }, { status: 501 });
    }
    const puppeteer = (puppeteerModule as any).default ?? puppeteerModule;

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '32px', right: '24px', bottom: '32px', left: '24px' },
    });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=\"criti-project-estimate.pdf\"',
      },
    });
  } catch (error) {
    console.error('[api/generate-pdf]', error);
    return NextResponse.json({ error: 'PDF generation failed.' }, { status: 500 });
  }
}


