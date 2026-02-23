import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate fields
    const { name, phone, requirement } = body;
    if (!name || !phone || !requirement) {
      return NextResponse.json(
        { error: 'All fields (name, phone, requirement) are required.' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with your verified sender email
      to: 'sumithedadan@gmail.com', // Replace with your email address
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Requirement:</strong> ${requirement}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully', emailResponse },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}