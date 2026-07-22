"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const waypoints = [
  { label: "coast", left: "0%" },
  { label: "steppe", left: "33%" },
  { label: "first palms", left: "66%" },
  { label: "dunes", left: "100%" },
];

export default function HeadingSouth() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="text-[#f6ecd8]"
      style={{
        background:
          "linear-gradient(180deg, var(--color-paper) 0%, #e3cfa8 18%, var(--color-terracotta) 46%, var(--color-dusk) 66%, #33202a 84%, var(--color-nightblue) 100%)",
        paddingTop: "clamp(6rem,14vh,10rem)",
        paddingBottom: "clamp(6rem,14vh,10rem)",
      }}
    >
      <div className="mx-auto w-[min(1120px,92vw)] text-center">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="font-sans text-[11px] uppercase tracking-[0.38em] opacity-85"
        >
          Day 05 — seven hours south
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="mb-16 mt-4 font-serif text-[clamp(2.2rem,5.6vw,4.2rem)] font-medium italic"
        >
          The coast falls away,
          <br />
          and the light changes.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative mx-auto mb-16 h-0.5 w-[min(760px,84vw)]"
          style={{ borderTop: "2px dashed rgba(246,236,216,0.55)" }}
        >
          {waypoints.map((wp) => (
            <span key={wp.label}>
              <i
                className="absolute -top-[5px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#f6ecd8]"
                style={{ left: wp.left }}
              />
              <span
                className="absolute -top-[34px] -translate-x-1/2 whitespace-nowrap font-serif text-[0.95rem] italic"
                style={{ left: wp.left }}
              >
                {wp.label}
              </span>
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-sans text-[0.85rem] tracking-[0.06em] opacity-75"
        >
          TUNIS → TAMERZA → CHEBIKA → MIDES → TOZEUR
        </motion.p>
      </div>
    </section>
  );
}
