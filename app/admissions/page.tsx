"use client";

import Image from "next/image";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CheckCircle2, MapPin, MessageCircle, Phone, ArrowRight, UserPlus, ClipboardCheck, GraduationCap, ChevronDown, Download, School } from "lucide-react";
import { useState } from "react";
import SchoolDoodles from "@/components/SchoolDoodles";

const faqs = [
  {
    q: "When is the best time to apply?",
    a: "We accept applications year-round, but most families apply in January for our main September intake. Early application is encouraged as seats in our Creche and Nursery programs fill up quickly."
  },
  {
    q: "Do you offer part-time enrollment?",
    a: "While we focus on full-day immersive Montessori education, we do have flexible morning-only sessions for our youngest learners (Creche level) to help them transition into school life."
  },
  {
    q: "What are the school fees?",
    a: "Our fee structure varies by grade level. Please download our latest Prospectus for a detailed breakdown of tuition, admission, and facility fees."
  },
  {
    q: "Is transportation available?",
    a: "Yes, Ashville School provides a safe and reliable bus service covering major residential areas in the vicinity. Fees for transport depend on the distance from the school."
  }
];

export default function Admissions() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="pb-0">
      <section className="relative h-[70vh] min-h-[600px] flex items-center overflow-hidden bg-primary">
        <SchoolDoodles />
        <div className="absolute inset-0">
          <PageHero defaultSrc="/images/4.png" opacity={0.3} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-[10px] uppercase tracking-widest mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Admissions Now Open
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tight leading-tight">
              Your Child&apos;s Journey <br/>
              <span className="text-white/80 italic">Begins Here</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
              At Ashville School, we follow the child. Our admission process is designed to ensure a mutual fit between our nurturing environment and your family&apos;s educational goals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <SchoolDoodles className="text-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">Simple Steps</h2>
            <h3 className="text-4xl font-heading font-bold text-dark">The Admission Process</h3>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { icon: UserPlus, step: "01", title: "Inquire", desc: "Call or fill the form to express interest." },
              { icon: ClipboardCheck, step: "02", title: "Visit", desc: "Tour our campus and meet our educators." },
              { icon: School, step: "03", title: "Submit", desc: "Provide medical history and ID records." },
              { icon: Calendar, step: "04", title: "Pay", desc: "Finalize enrollment fees and materials." },
              { icon: GraduationCap, step: "05", title: "Start", desc: "Welcome to the Ashville family!" }
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <item.icon size={32} className="text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    {idx + 1}
                  </div>
                  {idx < 4 && <div className="hidden md:block absolute top-10 left-full w-full h-[2px] bg-slate-200"></div>}
                </div>
                <h4 className="text-lg font-heading font-bold text-dark mb-2">{item.title}</h4>
                <p className="text-sm text-dark/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <SchoolDoodles className="text-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-heading font-bold text-dark mb-8 flex items-center gap-3">
                <CheckCircle2 className="text-primary" size={28} />
                Documentation Needed
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-4">
                  {["Completed Enrollment Form", "Child's Original Birth Certificate (to be sighted)", "2 Recent Passport-sized Photographs"].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-4">
                  {["Copy of Vaccination/Immunization Record", "Previous School Reports (if applicable)", "Parent/Guardian ID (Copy)"].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-primary text-white p-10 rounded-3xl shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-heading font-bold mb-6">Age Groups</h3>
                <div className="space-y-6">
                  <div className="border-b border-white/20 pb-4">
                    <h4 className="text-lg font-heading font-bold">Creche</h4>
                    <p className="text-sm opacity-80">6 Months to 2 Years</p>
                  </div>
                  <div className="border-b border-white/20 pb-4">
                    <h4 className="text-lg font-heading font-bold">Nursery</h4>
                    <p className="text-sm opacity-80">2 Years to 4 Years</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-heading font-bold">Primary</h4>
                    <p className="text-sm opacity-80">5 Years and Above</p>
                  </div>
                </div>
              </div>
              <button className="mt-8 bg-white text-primary w-full py-4 rounded-xl font-bold hover:bg-white/90 transition-colors">
                Apply Online
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <SchoolDoodles className="text-primary/5" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">FAQ</h2>
            <h3 className="text-4xl font-heading font-bold text-dark">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-all ${openFaq === index ? 'bg-primary text-white' : 'bg-slate-50 text-dark hover:bg-slate-100'}`}
                >
                  <span className="text-base font-heading font-bold pr-4">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openFaq === index ? 'bg-white text-primary rotate-180' : 'bg-white text-dark shadow-sm'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="p-6 bg-white text-dark/60 leading-relaxed border-t border-slate-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary relative overflow-hidden text-center">
        <SchoolDoodles className="text-white/10" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Ready to join the Ashville community?</h2>
          <p className="text-xl text-white/80 mb-10">Start your child&apos;s application today and give them the gift of a lifelong love for learning.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact" className="bg-white text-primary px-10 py-5 rounded-2xl font-bold hover:bg-white/90 transition-all shadow-xl">
              Enroll Now
            </Link>
            <a href="#" className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Download size={20} /> Download Prospectus
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
