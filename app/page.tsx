"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Baby, ToyBrick, School, BookOpen, Sun, Clock, Code,
  ChevronRight, ChevronLeft, Star, Heart, Users, Activity,
  ArrowRight, Home as HomeIcon, GraduationCap, ClipboardCheck,
  UserPlus, Calendar, MapPin, Phone, Mail, Send
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import SchoolDoodles from "@/components/SchoolDoodles";

const slides = [
  {
    image: "/images/1.png",
    title: "Nurturing With Love",
    subtitle: "A warm, Montessori-based sanctuary in Adenta where every child is celebrated and nurtured to reach their full potential.",
    badge: "From 6 Months to Grade 3"
  },
  {
    image: "/images/2.png",
    title: "Montessori Excellence",
    subtitle: "Child-centered approach where educators guide students through a journey of discovery, ensuring each milestone is met with care.",
    badge: "Authentic Montessori"
  },
  {
    image: "/images/3.png",
    title: "Learning for the Future",
    subtitle: "We introduce young learners to coding, robotics, and hands-on activities that build problem-solving skills.",
    badge: "Coding & Robotics"
  },
  {
    image: "/images/4.png",
    title: "A Home Away From Home",
    subtitle: "Reliable and professional care for children in a healthy, engaging environment designed to inspire.",
    badge: "Safe & Nurturing"
  }
];

const programs = [
  { title: "Creche", age: "6 Months - 1.5 Years", desc: "A safe and loving space for our youngest learners to begin their sensory journey.", icon: Baby },
  { title: "Nursery", age: "1.5 - 3 Years", desc: "Focusing on language development and social skills through exploratory play.", icon: ToyBrick },
  { title: "Kindergarten", age: "3 - 5 Years", desc: "Preparing children for formal education with core Montessori foundations.", icon: School },
  { title: "Primary", age: "Grade 1 - 3", desc: "A blend of academic excellence and independent research-based learning.", icon: BookOpen },
  { title: "Day Care", age: "6 Months +", desc: "Reliable and professional care for children in a healthy, engaging environment.", icon: Sun },
  { title: "After School Care", age: "School Age", desc: "Homework support and extra-curricular engagement until parents arrive.", icon: Clock },
];

const galleryImages = ["/images/1.png", "/images/2.png", "/images/3.png", "/images/4.png", "/images/5.png", "/images/6.png", "/images/7.png", "/images/8.png", "/images/9.png", "/images/10.png", "/images/11.png", "/images/12.png"];

function WhimsicalBubble({ feature, idx }: { feature: any; idx: number }) {
  const isEven = idx % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: idx * 0.05 }}
      className={`relative flex flex-col items-center group ${isEven ? 'md:translate-y-16' : ''}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3 + idx, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.05, transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] } }}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-[3.5rem] overflow-hidden shadow-[0_15px_40px_rgba(255,98,72,0.12)] border-[3px] border-white group-hover:border-primary transition-colors duration-150 isolate bg-slate-900"
          style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
        >
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            sizes="(max-width: 768px) 256px, 320px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/60 opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <feature.icon size={48} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-8 text-center max-w-[280px]">
        <h4 className="text-xl md:text-2xl font-heading font-bold text-dark mb-3 group-hover:text-primary transition-colors duration-150">
          {feature.title}
        </h4>
        <div className="overflow-hidden max-h-0 group-hover:max-h-32 transition-all duration-300 ease-out">
          <p className="text-dark/50 text-sm font-medium leading-relaxed pb-4 px-2">{feature.desc}</p>
        </div>
      </div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4], rotate: [0, 180, 360] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-2 -right-2 text-primary z-20 pointer-events-none"
      >
        <Star size={24} className="fill-primary" />
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const iconPositions = [...Array(12)].map((_, i) => ({
    left: `${(i * 15 + 7) % 100}%`,
    top: `${(i * 23 + 12) % 100}%`,
    type: i % 4
  }));

  return (
    <div className="overflow-x-hidden">
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          <img src={lightboxImg} alt="Gallery" className="max-w-full max-h-full object-contain rounded-2xl" />
        </div>
      )}

      <section className="relative h-screen flex items-center overflow-hidden bg-primary">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.5 }, scale: { duration: 8, ease: "easeOut" } }}
            className="absolute inset-0"
          >
            <Image src={slides[currentSlide].image} alt={slides[currentSlide].title} fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/60 to-black/20 hidden md:block"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary/95 md:hidden"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-3 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-[10px] uppercase tracking-widest mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                {slides[currentSlide].badge}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-[1.05] tracking-tight">
                {slides[currentSlide].title.split(" ").slice(0, -2).join(" ")} <br />
                <span className="text-white/80 italic">
                  {slides[currentSlide].title.split(" ").slice(-2).join(" ")}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-12 max-w-xl font-medium leading-relaxed border-l-4 border-white/50 pl-6">
                {slides[currentSlide].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/admissions" className="bg-white hover:bg-white/90 text-primary px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl">
                  Enroll Now <ChevronRight size={20} strokeWidth={3} />
                </Link>
                <Link href="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold transition-all flex items-center justify-center">
                  Discover Our Story
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 md:bottom-10 right-4 md:right-10 z-20 flex flex-col md:flex-row items-end md:items-center gap-6 md:gap-8">
          <div className="flex gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-4 bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
          <div className="flex gap-2 bg-black/30 backdrop-blur-md p-2 rounded-full border border-white/10">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <SchoolDoodles className="text-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              <div className="absolute inset-0 bg-primary/5 -m-8 rounded-[4rem] -z-10"></div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative h-64 sm:h-48 md:h-64 rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden shadow-lg border-4 border-white image-shine"
              >
                <Image src="/images/home_about.png" alt="Montessori Classroom" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative h-64 sm:h-48 md:h-64 rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden shadow-lg border-4 border-white image-shine"
              >
                <Image src="/images/8.png" alt="Students" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative h-64 sm:h-48 md:h-64 rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden shadow-lg border-4 border-white image-shine"
              >
                <Image src="/images/7.png" alt="Classroom" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative h-64 sm:h-48 md:h-64 rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden shadow-lg border-4 border-white image-shine"
              >
                <Image src="/images/12.png" alt="Group" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </motion.div>
            </div>

            <div className="max-w-xl">
              <span className="text-xs font-black tracking-[0.3em] text-primary uppercase mb-4 block">Welcome to Ashville School</span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-dark mb-6 leading-tight">Nurturing <span className="text-primary italic">With Love</span></h2>
              <p className="text-dark/60 text-lg leading-relaxed mb-10 font-medium">
                Ashville School is a Montessori-based school in Adenta offering nurturing education from 6 months to Grade 3. Our environment is designed to foster independence, creativity, and a lifelong love for learning.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <Heart size={28} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">Since</div>
                    <div className="text-xs font-bold text-dark/40 uppercase tracking-widest">2014</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <Users size={28} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">1:12</div>
                    <div className="text-xs font-bold text-dark/40 uppercase tracking-widest">Student Ratio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <SchoolDoodles className="text-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl image-shine">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqjWE5natTycCXnDjN2NM5xdVRtD3YpnBlFr9DXfCIzTsPrY8i-glYn0rLufTPpFio6VasWCIGswmAV-Xp123Vck_9dOWn3oIZGsgtC-iPJtyqIx6WK1RHbVuSfeD2GRIxtPmyklH08JpXRx3cLrlvc3k3CsFlK2FuoRvo2DFIPKRn0uAnk7gfi4yg8-p-ArKiNa1JZvkPLZSBq5PBRpZ6IoqG9GeVdDV4t8GXj5mNZ8ReS8vepfAcwBO_8cVBM4GqUbL8-39q4N2W"
                alt="Coding and Robotics"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-xs font-black tracking-[0.3em] text-primary uppercase mb-4 block">Future Ready</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6 leading-tight">Coding &amp; Robotics</h2>
              <p className="text-dark/60 text-lg leading-relaxed mb-8 font-medium">
                We introduce young learners to coding and robotics concepts, building problem-solving skills through hands-on activities and preparing children for a tech-driven future.
              </p>
              <div className="space-y-4">
                {["We introduce young learners to coding and robotics concepts.", "Building problem-solving skills through hands-on activities.", "Preparing children for a tech-driven future."].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Code size={20} className="text-primary" />
                    </div>
                    <p className="text-dark/70 font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <SchoolDoodles className="text-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">Our Programs</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-dark">Nurturing Every Stage</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <program.icon size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-dark mb-1">{program.title}</h3>
                <p className="text-primary font-semibold text-sm mb-4">{program.age}</p>
                <p className="text-dark/60 text-sm">{program.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative overflow-hidden" id="gallery-section">
        <SchoolDoodles className="text-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-dark">Life at Ashville</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="cursor-pointer overflow-hidden rounded-xl break-inside-avoid mb-4 shadow-lg hover:shadow-xl transition-all group"
                onClick={() => setLightboxImg(img)}
              >
                <img
                  src={img}
                  alt={`Ashville ${idx + 1}`}
                  className="w-full h-auto hover:scale-105 transition-transform duration-500 object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <SchoolDoodles className="text-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">Admissions</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-dark">Simple Admission Process</h3>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { icon: UserPlus, title: "Inquire", desc: "Call or fill the form to express interest." },
              { icon: GraduationCap, title: "Visit", desc: "Tour our campus and meet our educators." },
              { icon: ClipboardCheck, title: "Submit", desc: "Provide medical history and ID records." },
              { icon: Calendar, title: "Pay", desc: "Finalize enrollment fees and materials." },
              { icon: Star, title: "Start", desc: "Welcome your child to the Ashville family!" }
            ].map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-dark mb-2">{step.title}</h4>
                <p className="text-sm text-dark/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <SchoolDoodles className="text-primary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark">Get in Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Address", value: "No. 18 Okantey Street, Housing Down, Adenta, Accra" },
                  { icon: Phone, label: "Phones", value: "024 437 4343 / 020 319 7369" },
                  { icon: Mail, label: "Email", value: "ashvilleschool2022@gmail.com" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark">{item.label}</h4>
                      <p className="text-dark/60">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl overflow-hidden h-64 border border-slate-200">
                <iframe
                  src="https://maps.google.com/maps?q=Adenta%20Housing%20Down%20Accra&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-heading font-bold text-dark mb-6">Enrollment Inquiry</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thank you! We'll contact you soon."); }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Parent's Name" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-primary outline-none" />
                  <input type="tel" placeholder="Phone Number" required className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <select defaultValue="" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full text-dark/60 focus:ring-2 focus:ring-primary outline-none">
                  <option disabled value="">Child&apos;s Age / Grade</option>
                  <option>Under 1 Year</option>
                  <option>1-2 Years</option>
                  <option>2-3 Years</option>
                  <option>Grade 1</option>
                  <option>Grade 2</option>
                  <option>Grade 3</option>
                </select>
                <textarea placeholder="Your Message" rows={4} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full focus:ring-2 focus:ring-primary outline-none"></textarea>
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Send size={18} /> Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary relative overflow-hidden">
        <SchoolDoodles />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 tracking-tight">
              Nurturing With <span className="text-white/80 italic">Love</span>
            </h2>
            <p className="text-xl text-white/80 font-medium mb-10 max-w-2xl mx-auto">
              Providing a foundational academic and moral platform for your child to thrive in a global world.
            </p>
            <Link href="/admissions" className="inline-flex bg-white hover:bg-white/90 text-primary px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 items-center justify-center gap-3 shadow-xl">
              Join Our Family <ChevronRight size={20} strokeWidth={3} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
