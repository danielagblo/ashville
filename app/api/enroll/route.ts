import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Enrollment from '@/models/Enrollment';
import { sendSMS } from '@/lib/sms';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const newEnrollment = await Enrollment.create(body);
    
    const parentPhone = body.parentPhone;
    const schoolPhone = process.env.SCHOOL_PHONE || '0247704801'; 
    
    const parentMessage = `Dear ${body.parentName}, thank you for applying to Ashville School for ${body.studentFirstName}. We have received your application and will contact you shortly regarding the next steps.`;
    await sendSMS(parentPhone, parentMessage);
    
    const schoolMessage = `NEW ENROLLMENT! Student: ${body.studentFirstName} ${body.studentLastName}, Grade: ${body.gradeApplyingFor}, DOB: ${body.dateOfBirth}, Gender: ${body.gender}, Prev School: ${body.previousSchool || 'N/A'}, Parent: ${body.parentName}, Phone: ${body.parentPhone}, Email: ${body.parentEmail || 'N/A'}`;
    await sendSMS(schoolPhone, schoolMessage);
    
    return NextResponse.json({ success: true, data: newEnrollment }, { status: 201 });
  } catch (error: any) {
    console.error('Enrollment error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to process enrollment' }, { status: 500 });
  }
}
