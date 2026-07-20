"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const details = [
  { label: "Dates", value: "October 19\u201326, 2026" },
  { label: "Duration", value: "7 days / 6 nights" },
  { label: "Group Size", value: "Intimate group" },
  { label: "Base", value: "Sidi Bou Sa\u00efd, Tozeur, Sahara" },
  { label: "Transfers", value: "All private" },
  { label: "Experience", value: "Exclusive, curated" },
];

const includes = [
  "Private accommodation in heritage properties",
  "All experiences and guided visits",
  "Private transfers throughout",
  "Catamaran day on the Mediterranean",
  "Desert camp under the stars",
  "Artisan workshops with master craftspeople",
  "Welcome dinner and select meals",
];

export default function Details() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-night-light py-32 md:py-48" ref={ref}>
      <div className="px-8 md:px-[8vw]">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="mb-4 font-sans text-[10px] tracking-[0.6em] uppercase text-sand/50"
          >
            At a Glance
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mb-20 font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.03em] text-white md:mb-24"
          >
            Trip{" "}
            <span className="italic text-sand/60">Details</span>
          </motion.h2>

          <div className="grid grid-cols-1 gap-10 md:gap-16 md:grid-cols-2 lg:gap-24">
            {/* Details grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.4 }}
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-10">
                {details.map((detail) => (
                  <div key={detail.label}>
                    <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-sand/40">
                      {detail.label}
                    </p>
                    <p className="mt-2 font-serif text-xl text-white">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What's included */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.6 }}
            >
              <p className="mb-8 font-sans text-[9px] tracking-[0.4em] uppercase text-sand/40">
                What&apos;s Included
              </p>
              <ul className="space-y-4">
                {includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 font-sans text-sm leading-relaxed text-white/45"
                  >
                    <span className="mt-2 h-px w-3 shrink-0 bg-sand/30" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
