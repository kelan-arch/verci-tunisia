"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/tunisia-002.jpg"
        alt="Desert sunset silhouette"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-8 md:px-[8vw]">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex items-center justify-between pt-8"
        >
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-white/40">
            Verci
          </span>
          <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-white/40">
            Oct 2026
          </span>
        </motion.div>

        {/* Center — massive typography */}
        <div className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-4 font-sans text-[10px] tracking-[0.6em] uppercase text-white/50"
          >
            wanderquest &times; Verci present
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="font-serif text-[clamp(3.5rem,18vw,16rem)] font-light leading-[0.8] tracking-[-0.04em] text-white"
          >
            TUNISIA
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="mt-6 h-px bg-sand/40"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-4 font-serif text-lg italic text-white/40 md:text-xl"
          >
            the nomadic quest
          </motion.p>
        </div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex items-end justify-between pb-8 px-2"
        >
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30">
              7 Days
            </p>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30">
              Private Quest
            </p>
          </div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>

          <div className="text-right">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30">
              October
            </p>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30">
              19 &ndash; 26, 2026
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
