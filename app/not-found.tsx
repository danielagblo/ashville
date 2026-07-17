"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-[150px] w-96 h-96 -top-20 -right-20"></div>
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-[150px] w-96 h-96 -bottom-20 -left-20"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 max-w-lg"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-8"
        >
          <Search size={56} className="text-primary" strokeWidth={1.5} />
        </motion.div>

        <h1 className="text-8xl font-heading font-black text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-dark/60 text-lg leading-relaxed mb-8">
          It looks like this page has wandered off into the playground. Let&apos;s get you back to class.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <Home size={20} /> Back to Home
          </Link>
          <Link
            href="/contact"
            className="bg-white border-2 border-primary text-primary px-8 py-4 rounded-full font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-3"
          >
            <ArrowLeft size={20} /> Help Desk
          </Link>
        </div>

        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="mt-12 text-primary/20"
        >
          <p className="text-sm font-heading font-bold italic">
            &ldquo;The child is both a hope and a promise for mankind.&rdquo;
          </p>
          <p className="text-xs mt-2 opacity-60">— Maria Montessori</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
