"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Invitation() {
  return (
    <header
      className="relative flex min-h-svh flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #aebfc9 0%, #c3cbc6 34%, #ddd6bd 62%, #e8dfc4 100%)",
      }}
    >
      <div className="halftone" />

      <div className="relative z-[2] flex flex-1 flex-col items-center justify-between px-6 pt-[clamp(2rem,5vh,4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="text-center"
        >
          <p
            className="mb-4 font-sans text-[11px] uppercase tracking-[0.38em] text-[#f4efdf]"
            style={{ textShadow: "0 1px 8px rgba(60,70,80,0.25)" }}
          >
            wanderquest × verci nyc — a private quest
          </p>
          <h1
            className="font-serif text-[clamp(1.9rem,4.6vw,3.4rem)] font-medium italic leading-[1.1] text-[#f7f1de]"
            style={{ textShadow: "0 1px 14px rgba(60,70,80,0.28)" }}
          >
            October 19 to
            <br />
            October 26, 2026
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="relative my-4 w-[clamp(240px,42vw,460px)]"
        >
          <Image
            src="/images/brand/stone-mark.jpg"
            alt="Verci Tunisia — hand-carved calligraphy mark"
            width={540}
            height={676}
            priority
            className="w-full mix-blend-multiply"
            style={{ filter: "contrast(1.05)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="flex w-full max-w-[1060px] items-baseline justify-between pb-7 font-serif text-[clamp(1.5rem,3.4vw,2.6rem)] text-brick"
        >
          <span>VERCI</span>
          <span className="italic">in</span>
          <span>Tunisia</span>
        </motion.div>
      </div>

      <div className="relative h-[clamp(180px,30vh,320px)]">
        <Image
          src="/images/tunisia-076.jpg"
          alt="Questers on the dunes of the Sahara"
          fill
          priority
          className="object-cover object-[center_62%]"
          style={{ filter: "sepia(0.32) saturate(0.92) contrast(0.98) brightness(1.04)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #e8dfc4 0%, rgba(232,223,196,0) 26%)",
          }}
        />
      </div>

      <motion.span
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-3.5 left-1/2 z-[3] -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.3em] text-[#fdf8ea]"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
      >
        Begin the journey ↓
      </motion.span>
    </header>
  );
}
