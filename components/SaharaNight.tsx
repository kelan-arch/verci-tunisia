"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* Deterministic star positions (avoids SSR hydration mismatch). */
const stars = Array.from({ length: 90 }, (_, i) => ({
  left: `${(i * 37.7) % 100}%`,
  top: `${(i * 23.3) % 70}%`,
  delay: `${((i * 13) % 34) / 10}s`,
  scale: 0.4 + ((i * 7) % 11) / 10,
}));

export default function SaharaNight() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-night py-[clamp(7rem,16vh,12rem)] text-[#e9e2d2]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {stars.map((star, i) => (
          <i
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              transform: `scale(${star.scale})`,
              animation: `twinkle 3.4s ease-in-out ${star.delay} infinite`,
            }}
          />
        ))}
      </div>
      <style>{`@keyframes twinkle { 0%,100% { opacity: .18 } 50% { opacity: .85 } }`}</style>

      <div
        ref={ref}
        className="relative z-[2] mx-auto grid w-[min(1120px,92vw)] items-center gap-[clamp(2rem,6vw,6rem)] md:grid-cols-[1.05fr_0.95fr]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="sec-label font-sans" style={{ color: "var(--color-sand)" }}>
            Day 06 — a night with the nomads
          </p>
          <h2 className="mb-6 mt-4 font-serif text-[clamp(2.3rem,5.4vw,4.2rem)] font-medium leading-[1.05]">
            No network.
            <br />
            No noise.
            <br />
            <em className="text-sand">No reference points.</em>
          </h2>
          <p className="mb-5 font-serif text-[clamp(1.15rem,2vw,1.5rem)] italic leading-[1.55] text-[rgba(233,226,210,0.85)]">
            The road narrows, and then disappears. The Grand Erg Oriental begins — one
            of the two great sand seas of the Sahara.
          </p>
          <p className="max-w-[44ch] font-sans text-[0.85rem] leading-[1.7] text-[rgba(233,226,210,0.6)]">
            Dinner prepared on-site around a fire. The night spent under the stars:
            tents, bedrolls, blankets, open sky. No electricity. No schedule. Just the
            silence that surprises, and the kind of darkness that makes the stars look
            different.
          </p>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.25 }}
          className="relative before:absolute before:-inset-3.5 before:-z-[1] before:border-[1.5px] before:border-dashed before:border-[rgba(196,167,125,0.4)] before:content-['']"
        >
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/tunisia-086.jpg"
              alt="Desert camp fire at night"
              fill
              sizes="(max-width: 768px) 92vw, 520px"
              className="object-cover"
            />
          </div>
          <figcaption className="pt-3 font-serif text-[0.9rem] italic text-[rgba(196,167,125,0.75)]">
            Grand Erg Oriental — dinner around the fire
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
