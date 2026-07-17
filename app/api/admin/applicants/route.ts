import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Enrollment from '@/models/Enrollment';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ashvilleadmin123';

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    const applicants = await Enrollment.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: applicants }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch applicants error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch applicants' }, { status: 500 });
  }
}
