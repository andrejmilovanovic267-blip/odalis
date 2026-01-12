import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  console.log('[CONTACT API] Route hit');
  
  try {
    const body = await request.json();
    const { name, phone, email, message, interest, intent } = body;

    console.log('[CONTACT API] Received data:', { name, phone, email: email ? 'provided' : 'not provided', message: message ? 'provided' : 'not provided' });

    // Validate required fields
    if (!name || (!phone && !email)) {
      console.log('[CONTACT API] Validation failed: missing name or contact');
      return NextResponse.json(
        { error: 'Ime i kontakt (telefon ili email) su obavezni.' },
        { status: 400 }
      );
    }

    // Get email configuration from environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;

    console.log('[CONTACT API] Environment check:', {
      hasResendKey: !!resendApiKey,
      hasEmailTo: !!emailTo,
      emailTo: emailTo || 'NOT SET'
    });

    if (!resendApiKey) {
      console.error('[CONTACT API] ERROR: RESEND_API_KEY is missing');
      return NextResponse.json(
        { error: 'Email servis nije konfigurisan. RESEND_API_KEY nedostaje.' },
        { status: 500 }
      );
    }

    if (!emailTo) {
      console.error('[CONTACT API] ERROR: EMAIL_TO is missing');
      return NextResponse.json(
        { error: 'Email servis nije konfigurisan. EMAIL_TO nedostaje.' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // Build email content
    const emailSubject = 'Nova konsultacija – Odalis';
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0B1F33; color: #FDFCFA;">
        <h2 style="color: #FDFCFA; margin-bottom: 20px;">Nova konsultacija – Odalis</h2>
        
        <div style="background-color: #1A2F47; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
          <p style="margin: 10px 0;"><strong style="color: #E8E5E0;">Ime i prezime:</strong> <span style="color: #FDFCFA;">${name}</span></p>
          ${phone ? `<p style="margin: 10px 0;"><strong style="color: #E8E5E0;">Broj telefona:</strong> <span style="color: #FDFCFA;">${phone}</span></p>` : ''}
          ${email ? `<p style="margin: 10px 0;"><strong style="color: #E8E5E0;">Email adresa:</strong> <span style="color: #FDFCFA;">${email}</span></p>` : ''}
          ${interest ? `<p style="margin: 10px 0;"><strong style="color: #E8E5E0;">Interest:</strong> <span style="color: #FDFCFA;">${interest === 'facial-rejuvenation' ? 'Facial rejuvenation' : interest === 'body-rejuvenation' ? 'Body rejuvenation' : 'Not sure / need advice'}</span></p>` : ''}
          ${intent ? `<p style="margin: 10px 0;"><strong style="color: #E8E5E0;">Intent:</strong> <span style="color: #FDFCFA;">${intent === 'question' ? 'I would like to ask a question' : 'I would like to book a free consultation'}</span></p>` : ''}
          ${message ? `<div style="margin-top: 15px;"><strong style="color: #E8E5E0; display: block; margin-bottom: 8px;">Poruka:</strong><p style="color: #FDFCFA; white-space: pre-wrap; margin: 0;">${message}</p></div>` : ''}
        </div>
        
        <p style="color: #B8B5B0; font-size: 12px; margin-top: 20px;">Poruka poslata sa Odalis sajta</p>
      </div>
    `;

    const emailText = `
Nova konsultacija – Odalis

Ime i prezime: ${name}
${phone ? `Broj telefona: ${phone}` : ''}
${email ? `Email adresa: ${email}` : ''}
${interest ? `Interest: ${interest === 'facial-rejuvenation' ? 'Facial rejuvenation' : interest === 'body-rejuvenation' ? 'Body rejuvenation' : 'Not sure / need advice'}` : ''}
${intent ? `Intent: ${intent === 'question' ? 'I would like to ask a question' : 'I would like to book a free consultation'}` : ''}
${message ? `\nPoruka:\n${message}` : ''}
    `.trim();

    console.log('[CONTACT API] Calling Resend API...');
    console.log('[CONTACT API] Email config:', {
      from: 'Odalis <onboarding@resend.dev>',
      to: emailTo,
      subject: emailSubject
    });

    // Send email
    const result = await resend.emails.send({
      from: 'Odalis <onboarding@resend.dev>',
      to: emailTo,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    console.log('[CONTACT API] Resend response:', result);

    if (result.error) {
      console.error('[CONTACT API] Resend returned error:', result.error);
      return NextResponse.json(
        { error: 'Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo.' },
        { status: 500 }
      );
    }

    if (!result.data || !result.data.id) {
      console.error('[CONTACT API] Resend response missing data or id:', result);
      return NextResponse.json(
        { error: 'Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo.' },
        { status: 500 }
      );
    }

    console.log('[CONTACT API] Email sent successfully. ID:', result.data.id);

    return NextResponse.json(
      { success: true, message: 'Vaš upit je uspešno poslat. Javićemo Vam se uskoro.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[CONTACT API] Exception caught:', error);
    console.error('[CONTACT API] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Došlo je do greške pri slanju poruke. Molimo pokušajte ponovo.' },
      { status: 500 }
    );
  }
}
