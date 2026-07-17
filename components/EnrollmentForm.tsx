"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnrollmentForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-[3rem] border border-green-100 shadow-2xl text-center flex flex-col items-center max-w-2xl mx-auto"
      >
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="text-green-500" size={48} />
        </div>
        <h3 className="text-3xl font-heading font-bold text-primary mb-4">Application Received!</h3>
        <p className="text-slate-500 text-lg mb-8 font-medium">
          Thank you for applying to Ashville School. We have received your details and an SMS confirmation has been sent to your phone. Our admissions team will be in touch shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors"
        >
          Submit Another Application
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="mb-10 text-center relative z-10">
        <h3 className="text-3xl font-heading font-bold text-primary mb-2">Enrollment Form</h3>
        <p className="text-slate-500 font-medium">Fill in the details below to begin the admission process.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-medium"
          >
            <AlertCircle size={20} />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        <div>
          <h4 className="text-lg font-bold text-primary mb-6 border-b border-slate-100 pb-2">1. Student Details</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">First Name</label>
              <input required name="studentFirstName" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-primary" placeholder="Enter first name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Last Name</label>
              <input required name="studentLastName" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-primary" placeholder="Enter last name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Date of Birth</label>
              <input required name="dateOfBirth" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Gender</label>
              <select required name="gender" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-primary appearance-none">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-primary mb-6 border-b border-slate-100 pb-2">2. Parent / Guardian Details</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
              <input required name="parentName" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-primary" placeholder="Parent or Guardian's full name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
              <input required name="parentPhone" type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-primary" placeholder="e.g. 0241234567" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Email Address (Optional)</label>
              <input name="parentEmail" type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-primary" placeholder="e.g. parent@email.com" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-primary mb-6 border-b border-slate-100 pb-2">3. Academic Details</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Grade Applying For</label>
              <select required name="gradeApplyingFor" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-primary appearance-none">
                <option value="">Select a grade</option>
                <option value="Creche">Creche (6 months+)</option>
                <option value="Nursery">Nursery</option>
                <option value="Kindergarten">Kindergarten</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Previous School (Optional)</label>
              <input name="previousSchool" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-primary" placeholder="Name of previous school" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Message (Optional)</label>
              <textarea name="message" rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-primary" placeholder="Any additional information or questions"></textarea>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed mt-8"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              Submit Application <Send size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
