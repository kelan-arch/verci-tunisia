"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function InstagramEmbed() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="ig-video" className="flex min-h-[calc(100dvh+10rem)] flex-col justify-center bg-paper py-8 md:min-h-[calc(100dvh/0.9+10rem)]">
      <div className="mx-auto w-[min(560px,90vw)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center"
        >
          <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.5em] text-ink-soft/50">
            Last retreat
          </p>
          <h2 className="mb-5 font-serif text-[clamp(1.4rem,2.6vw,1.9rem)] italic text-ink">
            Austrian Alps, Winter 2025
          </h2>
          <div className="relative w-[min(880px,94vw)] overflow-hidden rounded-sm">
            <video
              src="/videos/verci-austria.mp4"
              className="aspect-[4/3] w-full bg-black/90 object-contain"
              poster="/images/verci-austria-poster.jpg"
              loop
              playsInline
              controls
              preload="none"
            />
          </div>

          <p className="mt-8 font-serif text-[clamp(0.9rem,1.3vw,1.1rem)] italic leading-[1.6] text-ink-soft">
            Thirty of us, one hotel, five days.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
