"use client";

import Image from "next/image";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { motion } from "framer-motion";
import { Baby, ToyBrick, School, BookOpen, Sun, Clock, Code, ChevronRight, CheckCircle2, Star } from "lucide-react";
import SchoolDoodles from "@/components/SchoolDoodles";

const programs = [
  {
    title: "Creche",
    age: "6 Months - 1.5 Years",
    desc: "A safe and loving space for our youngest learners to begin their sensory journey.",
    icon: Baby,
    features: ["Sensory-rich play zones", "High caregiver-to-infant ratio"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgkS1L2ydIsgEMBDQCLOn9S1DdaTOGI5CcrMfBFrReIq70E0DXT-Vxv3gCXK2HrtfzKR0eItESkzervhBoyoj2yOZ_sfpEVZ31Prdbj-P0c7KyY2a6M6SwSV-_VCpfKhd0LVJ76i0IvxPmwlFt7uxUwkLHZ7iRxz_dzfzurUHLDRNGtEfYaZUHRA97g7EffbImpUa9vWGPIpWUOlVVHvHD8_jiJ8dF_c2bGCWV1gD-YGby6yQV_rmSctAe0a77aQZYSS3lRGv5IPC0"
  },
  {
    title: "Nursery",
    age: "1.5 - 3 Years",
    desc: "Focusing on language development and social skills through exploratory play.",
    icon: ToyBrick,
    features: ["Language & Phonics foundation", "Practical life skill sessions"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Az2ZHGNJc4e-tloX7T_PsiSJoGP2dSe_yKXFE8LWAWkns1ZxwPSLA2MZTNXlAGni8jrrBDfx4Kr86SAzogN5_kOQqH-l9173Zo0c-CaJO54RIxWu_gHTqpMahvIvRHUobxe4W90r08gcEniYYgtvLXHJO3wDq4nrDgXqxUy2T5x2ad2KOMFdQgP0XBhZFh8qNJa5JQbAkL6wH0C7fZ3DueHedCX9W0366OTWpaFysTnnzbvQI9rPlHUtp5xlGDFwnCPuWC7W_rQo"
  },
  {
    title: "Kindergarten",
    age: "3 - 5 Years",
    desc: "Preparing children for formal education with core Montessori foundations.",
    icon: School,
    features: ["Mathematical mind building", "Cultural and global awareness"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAQxRKP1aZN8DWFcqWx5fSXZqKkjwjOnOWdtjn-Q58yymQc7Z_SK2G8Rp18JpFDlLu_3AL6sEsFUu9unG9guZG6OaP3iKrtLavUSZKVDIWC9XLv66ggMYFpGt_RzKFgTBmDfPaRBatYkzXP6h_L_ZEgVWomI3_BcgnmXBKdzPNt0nDF_N730Yb1sC0gZaTL3Earp5PYqkL1QkqDb_p0Akn7M9aZcUM_d0Vr5OqJ3-VKCPNNFe-rY_KAQPLAU3XyRyY92vi3XqKwXqz"
  }
];

export default function Programs() {
  return (
    <div className="pb-16">
      <div className="bg-primary text-white py-32 px-4 text-center relative overflow-hidden">
        <SchoolDoodles className="text-white/40" />
        <div className="absolute inset-0">
          <PageHero defaultSrc="/images/home_about.png" opacity={0.15} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
        </div>
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight relative z-10">Our Programs</h1>
        <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-8 relative z-10"></div>
        <p className="text-white/80 max-w-2xl mx-auto text-lg font-medium leading-relaxed relative z-10">
          Nurturing Potential through Montessori Principles — from Creche to Primary.
        </p>
      </div>

      <section className="py-32 bg-white relative overflow-hidden">
        <SchoolDoodles className="text-primary/25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">Early Learning Stages</h2>
            <h3 className="text-4xl font-heading font-bold text-dark">Foundational Years</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary font-bold text-xs uppercase shadow-sm">
                    {program.age}
                  </div>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary">
                    <program.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-dark mb-3">{program.title}</h3>
                  <p className="text-dark/60 leading-relaxed mb-6">{program.desc}</p>
                  <ul className="space-y-2">
                    {program.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-dark/70">
                        <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <SchoolDoodles className="text-primary/25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 bg-dark rounded-[2rem] overflow-hidden min-h-[450px]">
            <div className="lg:col-span-7 relative aspect-video overflow-hidden">
              <Image
                src="/images/robochildren.jpg"
                alt="Coding and Robotics"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark/60 to-transparent hidden lg:block"></div>
            </div>
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center text-white">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <Code size={32} className="text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Coding & Robotics</h2>
              <p className="text-white/80 text-lg mb-8">
                Preparing students for the 21st century. Our curriculum integrates logical thinking, computational design, and hands-on engineering from Grade 1.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Code size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Visual Block Coding</h4>
                    <p className="text-xs text-white/60">Logic and sequencing basics</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Star size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Modular Robotics</h4>
                    <p className="text-xs text-white/60">Hands-on engineering concepts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <SchoolDoodles className="text-primary/25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">Additional Care</h2>
            <h3 className="text-4xl font-heading font-bold text-dark">Primary & Specialized Support</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Primary (Grade 1-3)",
                desc: "A structured yet creative transition into formalized academic subjects, emphasizing research skills and project-based learning.",
                icon: BookOpen,
                tag: "Full Day Program"
              },
              {
                title: "Day Care",
                desc: "Flexible hours for working parents. We provide a nutritious lunch, rest periods, and engaging free-play activities.",
                icon: Sun,
                tag: "Flexible Slots"
              },
              {
                title: "After School Care",
                desc: "Homework assistance and enrichment clubs including music, dance, and art to keep students active after class.",
                icon: Clock,
                tag: "Until 6:00 PM"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-dark mb-4">{item.title}</h3>
                <p className="text-dark/60 leading-relaxed mb-6 flex-1">{item.desc}</p>
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-dark/50">{item.tag}</span>
                  <Link href="/admissions" className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all text-sm">
                    Learn more <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary relative overflow-hidden text-center">
        <SchoolDoodles className="text-white/40" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Ready to Join the Ashville Family?</h2>
          <p className="text-xl text-white/80 mb-10">Book a tour of our campus today and see how our programs create a foundation for lifelong learning.</p>
          <Link href="/admissions" className="inline-flex bg-white text-primary px-10 py-4 rounded-full font-bold hover:bg-white/90 transition-all shadow-xl">
            Schedule a Visit <ChevronRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
