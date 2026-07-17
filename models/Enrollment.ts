import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  studentFirstName: string;
  studentLastName: string;
  dateOfBirth: Date;
  gender: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  gradeApplyingFor: string;
  previousSchool?: string;
  message?: string;
  status: string;
  createdAt: Date;
}

const EnrollmentSchema: Schema = new Schema({
  studentFirstName: { type: String, required: true },
  studentLastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  parentName: { type: String, required: true },
  parentPhone: { type: String, required: true },
  parentEmail: { type: String },
  gradeApplyingFor: { type: String, required: true },
  previousSchool: { type: String },
  message: { type: String },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
