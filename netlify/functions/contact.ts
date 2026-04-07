import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body || '{}');

    const { name, phone, requirement } = body;

    // Validation
    if (!name || !phone || !requirement) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'All fields (name, phone, requirement) are required.',
        }),
      };
    }

    // Send email
    const emailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', // change later
      to: 'sumithedadan@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Requirement:</strong> ${requirement}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully',
        emailResponse,
      }),
    };
  } catch (error) {
    console.error('Function error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email. Please try again later.',
      }),
    };
  }
};