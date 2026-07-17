import { NextResponse } from 'next/server';
import { sendSMS } from '@/lib/sms';

export async function POST(request: Request) {
  try {
    const { name, email, phone, childAge, message } = await request.json();

    const schoolPhone = process.env.SCHOOL_PHONE || '0247704801';
    const smsText = `CONTACT FORM MESSAGE\nFrom: ${name}\nEmail: ${email}\nPhone: ${phone}\nChild's Age: ${childAge}\nMessage: ${message}`;

    await sendSMS(schoolPhone, smsText);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to send message' }, { status: 500 });
  }
}
