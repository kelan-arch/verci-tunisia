"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WhosComing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-[clamp(5rem,11vh,8rem)]"
      style={{
        background:
          "linear-gradient(180deg, #33202a 0%, var(--color-nightblue) 100%)",
      }}
    >
      <div className="mx-auto w-[min(720px,92vw)] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-10 font-serif text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.08] text-[#f0e7d3]"
        >
          Who&rsquo;s coming
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-6 font-serif text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7] text-[rgba(233,226,210,0.85)]"
        >
          <p>
            Twenty to twenty-five people, all hand-picked. Mostly founders, idea
            through series b, plus a handful of creatives, writers, and people
            who are hard to categorize but who you&rsquo;ll be glad are there.
          </p>
          <p>
            We&rsquo;ve hosted 350+ events and 15+ retreats over the past two
            years, and curation is the thing we&rsquo;ve spent the most time on.
            For us, 25 is perfect number for this kind of retreat.
          </p>
          <p>
            Open to Verci members and to everyone else by application.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
