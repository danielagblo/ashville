"use client";

import Image from "next/image";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ChevronRight, Loader2 } from "lucide-react";
import SchoolDoodles from "@/components/SchoolDoodles";
import { useState, FormEvent } from "react";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setFeedback(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          childAge: formData.get("childAge"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFeedback({ type: "success", text: "Message sent! We will contact you soon." });
        form.reset();
      } else {
        setFeedback({ type: "error", text: data.error || "Failed to send message. Please try again." });
      }
    } catch {
      setFeedback({ type: "error", text: "Network error. Please check your connection and try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="pb-0">
      <section className="bg-primary text-white py-32 px-4 text-center relative overflow-hidden">
        <SchoolDoodles className="text-white/30" />
        <PageHero defaultSrc="/images/1.png" opacity={0.1} />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight">Contact Us</h1>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-8"></div>
          <p className="text-white/70 max-w-2xl mx-auto text-lg font-medium">
            Connect With Our School Community — we&apos;re here to help.
          </p>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <SchoolDoodles className="text-primary/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-heading font-bold text-dark mb-8">Send us a Message</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-semibold text-dark/70 mb-1 block">Full Name</label>
                  <input type="text" name="name" placeholder="Your Name" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-dark/70 mb-1 block">Email Address</label>
                  <input type="email" name="email" placeholder="your@email.com" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-dark/70 mb-1 block">Phone Number</label>
                  <input type="tel" name="phone" placeholder="024 000 0000" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-dark/70 mb-1 block">Child&apos;s Age</label>
                  <select name="childAge" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all text-dark/60">
                    <option>Creche (6mo - 2yrs)</option>
                    <option>Preschool (2yrs - 5yrs)</option>
                    <option>Primary (6yrs+)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-dark/70 mb-1 block">Your Message</label>
                  <textarea name="message" rows={4} placeholder="How can we help you?" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"></textarea>
                </div>
                <div className="md:col-span-2">
                  {feedback && (
                    <div className={`p-4 rounded-xl mb-4 text-sm font-medium ${
                      feedback.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {feedback.text}
                    </div>
                  )}
                  <button type="submit" disabled={sending} className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed w-full">
                    {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-heading font-bold text-dark mb-6">Quick Contact</h3>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: "Our Location", value: "No. 18 Okantey Street, Adenta, Accra" },
                    { icon: Phone, label: "Phone Lines", value: "024 437 4343 / 020 319 7369" },
                    { icon: Mail, label: "Email Address", value: "admissions@ashvilleschool.edu.gh" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-dark/60">{item.label}</p>
                        <p className="text-dark font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://wa.me/233244374343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-200 hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-[#25D366] text-sm">Chat with Admissions</p>
                      <p className="text-dark/50 text-xs">Response: &lt; 30 mins</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-[#25D366]" />
                </a>
              </div>

              <div className="bg-dark text-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={24} />
                  <h3 className="text-xl font-heading font-bold">Operating Hours</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span className="opacity-70">Monday - Friday</span>
                    <span className="font-medium">7:00 AM - 5:30 PM</span>
                  </li>
                  <li className="flex justify-between border-b border-white/10 pb-4">
                    <span className="opacity-70">Saturday</span>
                    <span className="font-medium">By Appointment</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="opacity-70">Sunday</span>
                    <span className="font-medium text-red-400">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[500px] w-full relative overflow-hidden bg-slate-100">
        <div className="w-full h-full grayscale-[0.3]">
          <div className="w-full h-full relative">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaYPBkG6gJqx-DbMqRDE936QuOSq_kPfya_riLz4l-JIaW3CEOYpXPlcFMONFfX7FCR3WyRzcxNCfhchxXn-L4CuUlJ6U8W3LtUO8RCMkbfZKwyJzVSHiP5i85PlU124MqvOP5ofb6ApvLE9wHyKlHK-iRTFOaSePHs1iW9ksuQ_UaVswsjyLLnF_ZOh-3RBWmnasJPaR_eYynn-Ub4d-2mZ3kNVqlyoPPX_BNw7M8flPr21JlTQL3LCen421yY3bQb3BBOfPPkk6d"
              alt="Map"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
