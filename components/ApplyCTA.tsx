"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ApplyCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden py-48 md:py-64" ref={ref}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/tunisia-084.jpg"
          alt="Desert golden hour"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/60 to-night" />
      </div>

      <div className="relative z-10 px-8 md:px-[8vw]">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="mb-8 font-sans text-[10px] tracking-[0.6em] uppercase text-sand/50"
          >
            Limited Spots Available
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-serif text-[clamp(3rem,10vw,8rem)] leading-[0.85] tracking-[-0.03em] text-white"
          >
            Join the{" "}
            <span className="italic text-sand/70">Quest</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 font-sans text-base leading-relaxed text-white/40 md:text-lg"
          >
            This is an invitation-based experience for a small group. Apply to
            learn more about pricing, logistics, and how to secure your spot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-14"
          >
            <button className="group relative inline-flex items-center gap-3 bg-sand/10 px-8 py-4 md:px-14 md:py-5 font-sans text-sm tracking-[0.3em] uppercase text-sand backdrop-blur-sm transition-all duration-500 hover:bg-sand/20">
              <span>Apply Now</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 font-sans text-xs text-white/20"
          >
            October 19&ndash;26, 2026 &middot; Tunisia
          </motion.p>
        </div>
      </div>
    </section>
  );
}
