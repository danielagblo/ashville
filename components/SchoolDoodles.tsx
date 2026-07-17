"use client";

import { motion } from "framer-motion";
import { Rocket, Heart, Star, Music, Pencil, Smile, Paperclip } from "lucide-react";

export default function SchoolDoodles({ className = "text-primary opacity-20" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-[10%] scale-50 md:scale-100 origin-top-left">
        <Rocket size={80} strokeWidth={1} />
      </motion.div>
      <motion.div animate={{ scale: [0.5, 0.55, 0.5], rotate: [-10, 0, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 right-[20%] block">
        <motion.div animate={{ scale: [1, 1.1, 1] }} className="hidden md:block">
          <Heart size={60} strokeWidth={1.5} />
        </motion.div>
        <div className="md:hidden block">
          <Heart size={60} strokeWidth={1.5} />
        </div>
      </motion.div>
      <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute bottom-20 left-[15%] scale-50 md:scale-100 origin-bottom-left">
        <Star size={70} strokeWidth={1.2} />
      </motion.div>
      <motion.div animate={{ y: [0, 15, 0], rotate: [15, 0, 15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-40 left-[40%] scale-50 md:scale-100 origin-top">
        <Music size={50} strokeWidth={1.5} />
      </motion.div>
      <motion.div animate={{ x: [0, 10, 0], y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-16 right-[15%] scale-50 md:scale-100 origin-bottom-right">
        <Pencil size={90} strokeWidth={1} className="-rotate-12" />
      </motion.div>
      <motion.div animate={{ scale: [0.5, 0.525, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-[5%] block">
        <motion.div animate={{ scale: [1, 1.05, 1] }} className="hidden md:block">
          <Smile size={100} strokeWidth={1} />
        </motion.div>
        <div className="md:hidden block">
          <Smile size={100} strokeWidth={1} />
        </div>
      </motion.div>
      <motion.div animate={{ rotate: [15, 30, 15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/3 right-[5%] scale-50 md:scale-100 origin-right">
        <Paperclip size={70} strokeWidth={1.2} />
      </motion.div>
    </div>
  );
}
