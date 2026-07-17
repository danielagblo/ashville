"use client";

import Image from "next/image";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Target, Compass, Award, Heart, Users } from "lucide-react";
import SchoolDoodles from "@/components/SchoolDoodles";

const team = [
  {
    name: "Ms. Ama Serwaa",
    role: "Head of School",
    bio: "Certified Montessori Lead with 15 years of experience in early childhood pedagogy.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBS9qgi2bqnw7t9t1zMkMHycvlji1MkgygdI39hpgV7R_4x7_MTvYWKbL2YZR6Y5o3dPeb36A0Om34e2iiug79mfTYfQ4m1DhbfVkUtLuCFMwY9mEbb2m9rlPjxsMfrAFN64KtdbHsxSW5hPyzgnTUL5FAznrvYeAkSG-TzsmNi8mesk-CrklyGOLK0O7AAd1_OKYLWUMe8p7sfS45mlJX2Dy6fMiZzeKCK2Oc_ADtwwCR791_UCalPxcF5cnRR8D4j8K3qDRQE5djf"
  },
  {
    name: "Mr. Kofi Asante",
    role: "Robotics & Coding Lead",
    bio: "Innovator bridging the gap between traditional learning and future technology.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxN463IOwhy4-PlWSP8PRchs37WHnU73BIKWAGE2HpRNq4lZs_vpb6ekkajQb5DkKgYlqlTIVL_iN6vwrUfNDLxo1Tw3pa3ur2fdtSxSIT-jYlrp4oIMLo9-yS0KhaVRp-lHO3eHvkBrCSsjkRI62A0ww0kujeG-svp1JM6wUP_XjXx7bForwuivA7u0hUjZcXOlPDtczPi7p6rcBRmzjZcjSegi_jDO9mhitu_f7pgacL14CY7IEcXqFUVMyaU5Qs-fMrA93YtJdd"
  },
  {
    name: "Mrs. Elikem Mensah",
    role: "Pre-School Coordinator",
    bio: "Specialist in linguistic development and sensory integration for ages 3-6.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWTXVGaFRw41A7AI8_dEzQx8qfrzEP7_eWMah6fiSyyzSbraI_SqAdtPftfDwqjxJLeeKIKYbwPaATBoRsQeiQ6xmLtHHurZPfPN4KTowgNOhu6N_gxApwFqlW1xIQsuj7lXvaHHmzjnT1mfufTkQPOc11YjCusjlQzUa2IXdeo_cSTa4jARKmr5cHynUyThr8OBZw9-JCpgRnNTaAvPjDEJBJDYCYCrVXg0FmNdy4dM0ArbON3iMG9TWA2XMt9XHBR2CWc_auyBel"
  },
  {
    name: "Dr. David Tetteh",
    role: "Academic Director",
    bio: "Overseeing curriculum standards and ensuring every child achieves their potential.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqagRnKSt076YOSweOvbK_h9ilEJxkGnr0J5CWXa6eulAmRUVkickS1nZmqJpbi9aExCsH2wJIUU323zbatXkAjmj_yf1kh55k6Yaxoo1I3F1KMoyqpLZZ3wS_8dhILFu18xkP6tY2WIz_I3eMTboa-SUlTOQ0CCggYkQsMyBmrvXZddSHPunP5OwY-qspTF1caW8ugIOQ-o3lf4VFr54rstpdNvTRVOEgt1pHrLKRQU7ch-QqUa2MYBDMIbVJllmw3aCTth8kp50w"
  }
];

export default function About() {
  return (
    <div className="pb-16">
      <div className="bg-primary text-white py-32 px-4 text-center relative overflow-hidden">
        <SchoolDoodles className="text-white/30" />
        <PageHero defaultSrc="/images/home_about.png" opacity={0.1} />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight">About Ashville</h1>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-8"></div>
          <p className="text-white/70 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Where every child&apos;s journey is celebrated through authentic Montessori education.
          </p>
        </div>
      </div>

      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <SchoolDoodles className="text-primary/20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">Our Story</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-8 leading-tight">
                A School Built on <span className="text-primary italic">Love</span>
              </h3>
              <p className="text-dark/60 text-lg leading-relaxed mb-6 font-medium">
                What started as a small dream in Adenta has grown into a cornerstone of Montessori education in Ghana. Ashville School was established with a singular vision: to create a &ldquo;second home&rdquo; where learning is as natural as breathing.
              </p>
              <p className="text-dark/60 text-lg leading-relaxed font-medium">
                We believe in a child-centered approach where educators guide students through a journey of discovery, ensuring each developmental milestone is met with care and expertise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[450px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl image-shine"
            >
              <Image
                src="/images/home_about.png"
                alt="Montessori Classroom"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-white shadow-2xl">
                  <p className="font-heading font-bold text-2xl">Since 2014</p>
                  <p className="text-white/80 font-medium text-sm">A decade of nurturing young minds</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <SchoolDoodles className="text-primary/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">Our Foundation</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-12 leading-tight">
                Empowering Minds, <br/>Inspiring Futures
              </h3>

              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/10 group-hover:bg-primary transition-all duration-500">
                      <Target className="text-primary group-hover:text-white transition-colors" size={28} />
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-dark">Our Mission</h4>
                  </div>
                  <p className="text-dark/60 leading-relaxed text-lg font-medium">
                    To provide an authentic Montessori experience that empowers children to become self-motivated, globally conscious, and empathetic individuals through a nurturing and prepared environment.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="group"
                >
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all duration-500">
                      <Compass className="text-primary group-hover:text-white transition-colors" size={28} />
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-dark">Our Vision</h4>
                  </div>
                  <p className="text-dark/60 leading-relaxed text-lg font-medium">
                    To be the leading light in early childhood education in Ghana, setting the standard for holistic development where the love of learning is kindled for a lifetime.
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[450px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl order-1 md:order-2 image-shine"
            >
              <Image
                src="/images/9.png"
                alt="Students learning"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <SchoolDoodles className="text-primary/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs tracking-[0.3em] uppercase">Our Educators</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mt-4">Nurturing Minds, Shaping Futures</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-4 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
              >
                <div className="relative aspect-square rounded-[1.5rem] overflow-hidden mb-6">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center px-2">
                  <h4 className="font-heading font-bold text-lg text-dark">{member.name}</h4>
                  <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-dark/60 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Experience the Ashville Difference</h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Join our community of happy learners and dedicated parents. Book a school tour today to see our philosophy in action.
              </p>
              <a href="/admissions" className="inline-flex bg-white text-primary px-10 py-4 rounded-full font-bold hover:bg-white/90 transition-all shadow-xl">
                Schedule a Tour
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
