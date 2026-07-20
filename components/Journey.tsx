"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-48 md:py-80" ref={ref}>
      {/* Background image — faded */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/tunisia-088.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-night via-transparent to-night" />

      <div className="relative z-10 px-8 md:px-[8vw]">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 font-sans text-[10px] tracking-[0.6em] uppercase text-sand/50"
          >
            The Journey
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-serif text-[clamp(1.75rem,5vw,5rem)] leading-[1.05] tracking-[-0.02em] text-white/90"
          >
            A slow immersion into a country that few travellers know{" "}
            <span className="italic text-sand/70">in full.</span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "80px" } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 h-px bg-sand/30"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 max-w-2xl font-sans text-base leading-[1.8] text-white/40 md:text-lg"
          >
            From Islamic medinas and Roman ruins to Andalusian heritage, desert
            dunes and oasis cities built in yellow brick &mdash; each day
            reveals a distinct face of the same territory.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-16 font-serif text-[clamp(1.5rem,3vw,2.5rem)] italic text-sand/40"
          >
            Curiosity is the compass.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
