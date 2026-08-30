"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function GettingThere() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-night py-[clamp(5rem,11vh,8rem)]">
      <div className="mx-auto w-[min(720px,92vw)] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-10 font-serif text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.08] text-[#f0e7d3]"
        >
          Getting there
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="space-y-8"
        >
          <p className="font-serif text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7] text-[rgba(233,226,210,0.85)]">
            Fly into Tunis-Carthage (TUN), about twenty minutes from the hotel.
            Direct from Paris, Rome, Istanbul, Frankfurt, and most of Europe;
            one connection from the US.
          </p>

          <div>
            <h3 className="mb-3 font-serif text-[clamp(1.2rem,1.8vw,1.4rem)] italic text-sand">
              Weather
            </h3>
            <p className="font-serif text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7] text-[rgba(233,226,210,0.85)]">
              High 70s and sunny on the coast in late October. Warm days and
              genuinely cold nights in the desert.
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="pt-4 font-serif text-[clamp(1.15rem,1.6vw,1.35rem)] italic text-sand"
          >
            Applications are open. We read all of them.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
