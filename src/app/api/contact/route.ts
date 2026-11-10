import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // Spam honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message filtered' }, { status: 200 });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const recipient = 'shardulparihar2007@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'SHARDUL.LAB <onboarding@resend.dev>',
          to: [recipient],
          reply_to: email,
          subject: subject ? `[SHARDUL.LAB] ${subject} - from ${name}` : `[SHARDUL.LAB] New Transmission from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
        }),
      });

      if (!resendRes.ok) {
        console.error('Resend API error:', await resendRes.text());
      }
    } else {
      console.log(`[CONTACT SUBMISSION] To: ${recipient} | From: ${name} (${email}) | Subject: ${subject}\n${message}`);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Transmission successfully logged and dispatched.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing contact message.' },
      { status: 500 }
    );
  }
}
