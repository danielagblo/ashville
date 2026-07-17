"use client";

import PageHero from "@/components/PageHero";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVRAvm6_BX1DklSzIlSTr5NnDbBbQsb_TIyEB4aQZawULGNbuxEqSvnjmvpwuFrezyExND0idmOlP5DWBOv6SdbWkNRvauMr_FprTc6Mx92okJereocAdmPjFxzMNd4YKmebTwoJFTHB7mwHBnUoGV3kUU4fgfk1uU0TTBqIYzQvYdHBass-Ci9s0PKMx_KiQaJvErPTxpIT2EZXNrXbQ_C2w6aNxlBSB6uGyY_0a9o0LSDOUNIJfqQyF-UWShfCLCRrkWhOSjvi8b",
    caption: "Sensory Learning Journey",
    category: "Academic",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD20CzlrFSMCM_pyffDgvDYpokhs4gDeEOlW-cLgIAZ7aAPTFi0hZ-YEGcKl85LKaL7-Vtn0XSHEvv5j4WW4IEWbKgXQG6Yh9ULsMklkx3bDoMrD3krbrFNg8rANP5tuPUYYXEiq6liAfGoP1uC1zlyW2YcDaZAHzf5Vu1vhDXhrgYGpZ-9w5BYE3IFE8vSRtuW8EPlJ0K4W_zJpmk6Zx-3ObWSn46LlWLHL1nXhh5tK3a6TO_xS-vp7r-imQd97DnSn3XM_QMKYEdT",
    caption: "Modern Sustainable Campus",
    category: "Campus",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2AjFFi1ADB5B_h5kgvvtJ8JtUqWkT3YtOzWV6dLc_avMIXVY2i6G6ASu7czTyLbDgnlpMBKvgIjGFZdj_ecGeg-Bv-thD7w2oJebie2FYRC0sd8XZPlHFnloENt7iti1tW5kUC7jRl3Fp9akPDBJ1HPQcHQwg9_O_MfJ8wCXZjC1pwx2JxHeYNdTpKtkwK_fAu04yjc7z3vu5f0PT47Hr8ioggJyyt2TlKJCKRT9l1EXtpMg1r5diGRUiMtne4r3hrKmSRk9ch-Ja",
    caption: "Future Innovators at Work",
    category: "Coding",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnFMZdR_ZMSk4Nw2hSf2CxJQV1SCMvXfWOaQtGaulGqMcuQZGkXGTIO4SbnfjaKdJ_FsRvovJ79WQa2Msjq_OlV-xBtiYQSMxBaTg963oNJywlg6MCsUYmVsePTrZWnoozGAe0de0tJP1C73OzdnSBu9dr7cTk7l_HXd5sCgHPCUH2qDNyHXehCkcHyyJr8_yLKcY9pBl9unoqsQBDLcGKA633vdTNAwU6PP6OV6EWf91WBuiBAnlE7qhzQUmaa-PcRT3duNL8_d0Q",
    caption: "Unleashing Artistic Potential",
    category: "Creative",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8hQ_at2H464Wq-n7wrwej2LW6SE-YfVFh-GwTcYVmzRwHMrasUYPcHCFf_M9dW-5CgQ0R7MLHOAm-PHo_t-Rca0OFASIQfL_F5lbBu2Dnzt55r0HrhDP4BHKWmvRs8cIl6KECXfDMQxSUZylMBwb6jO8Pnw0bkX1ow2tNBwsbUdKUkKuvUgcNGCGJVpglzawTu-8L0q_-Sp__wsM_VPLSbIf4gKCCb0hXHKtvr67xWbVOZZtKR0qfE_ePFbHq-WxeV4ovZFRH2hai",
    caption: "Athletic Excellence & Teamwork",
    category: "Sports",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBf700LsvN519adc1kAeAd8FsG7yXZR_qk1H2g0uxh4zDJ1rOO9aMNW5e53JC39CzQh-nl7sJ4f0Em_XKLqSNAY9pEIynVMd_hY15B7Mf7WvKgQszRk93XVii4emALlnzMPbRf_XHUhnRuc0dQUB1I19mwU9JlewkTM25d55iZfbMGHmSjeNVv9g0o8C-MLILWIsyc0NjfU7zG3eClTSLSvBOWj3DGO8wcYxaQbNv7VxRrPKgvH7Gx_j5v9DGJ6RlJ8UWJa0o3CgUzw",
    caption: "Personalized Mentorship",
    category: "Academic",
  },
];

const categories = ["All Moments", "Academic", "Creative", "Sports", "Campus", "Coding"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All Moments");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All Moments"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const changeImage = (dir: number) => {
    if (lightboxIndex === null) return;
    const newIndex = (lightboxIndex + dir + galleryItems.length) % galleryItems.length;
    setLightboxIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <PageHero defaultSrc="/images/2.png" opacity={0.4} />
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 drop-shadow-lg">
              Our <span className="text-white/80">Gallery</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">
              A glimpse into life at Ashville School.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border font-semibold text-sm transition-all ${activeCategory === cat ? 'bg-primary text-white border-primary' : 'border-slate-200 text-dark/60 hover:border-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 10) * 0.1 }}
              className="relative break-inside-avoid mb-6 overflow-hidden rounded-3xl shadow-lg group bg-slate-200 cursor-pointer"
              onClick={() => openLightbox(galleryItems.indexOf(item))}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-110 block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white bg-primary w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">{item.category}</span>
                <p className="text-white font-heading font-bold">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-primary/10 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-heading font-bold text-dark mb-4">Want to see more of Ashville?</h2>
            <p className="text-dark/60 mb-8 max-w-xl mx-auto">Join us for a personalized campus tour and experience our nurturing environment firsthand.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/admissions" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg">Book a Campus Tour</a>
              <a href="/contact" className="bg-white text-dark px-8 py-3 rounded-full font-bold hover:bg-slate-50 transition-all border border-slate-200">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <button onClick={closeLightbox} className="absolute top-8 right-8 text-white hover:text-primary transition-colors">
            <X size={36} />
          </button>
          <button onClick={() => changeImage(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors">
            <ChevronLeft size={48} />
          </button>
          <button onClick={() => changeImage(1)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors">
            <ChevronRight size={48} />
          </button>
          <div className="max-w-5xl max-h-[80vh] w-full flex items-center justify-center">
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].caption}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-white font-heading font-bold text-xl">{galleryItems[lightboxIndex].caption}</p>
            <p className="text-primary font-semibold uppercase text-sm mt-2 tracking-widest">{galleryItems[lightboxIndex].category}</p>
          </div>
        </div>
      )}
    </div>
  );
}
