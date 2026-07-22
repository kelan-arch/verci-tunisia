"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const oases = [
  {
    src: "/images/tunisia-046.jpg",
    alt: "Tozeur palm grove",
    caption: "The palmeraie — 400,000 date palms",
    tag: "OASIS",
    className: "md:col-span-4",
  },
  {
    src: "/images/tunisia-048.jpg",
    alt: "Chebika mountain oasis",
    caption: "Chebika, springs above the desert",
    tag: "SPRING",
    className: "md:col-span-4 md:mt-14",
  },
  {
    src: "/images/tunisia-050.jpg",
    alt: "Mides canyon",
    caption: "Mides, a canyon carved in rock",
    tag: "CANYON",
    className: "md:col-span-4 md:mt-6",
  },
];

export default function Oases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-nightblue py-[clamp(5rem,10vh,8rem)] text-[#efe3c8]">
      <div className="brick-divider mb-[clamp(3rem,7vh,5rem)]" aria-hidden="true" />
      <div ref={ref} className="mx-auto w-[min(1120px,92vw)]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="sec-label font-sans"
          style={{ color: "var(--color-terracotta)" }}
        >
          Tozeur &amp; the mountain oases
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-3 font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02]"
        >
          Where water, brick
          <br />
          and desert <em className="text-terracotta">coexist.</em>
        </motion.h2>

        <div className="mt-12 grid gap-[clamp(1rem,2.5vw,2rem)] md:grid-cols-12">
          {oases.map((oasis, i) => (
            <motion.figure
              key={oasis.src}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              className={oasis.className}
            >
              <div className="img-zoom relative aspect-[3/4]">
                <Image
                  src={oasis.src}
                  alt={oasis.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, 360px"
                  className="object-cover"
                  style={{ filter: "saturate(1.05) contrast(1.02)" }}
                />
              </div>
              <figcaption className="flex justify-between pt-2.5 font-serif text-[0.95rem] italic text-[rgba(239,227,200,0.8)]">
                <span>{oasis.caption}</span>
                <b className="font-sans text-[10px] font-medium not-italic tracking-[0.2em] text-terracotta">
                  {oasis.tag}
                </b>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
