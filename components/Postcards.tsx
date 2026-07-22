"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const cards = [
  { src: "/images/tunisia-004.jpg", alt: "Medina of Tunis", title: "The living medina", no: "№ 01" },
  { src: "/images/tunisia-012.jpg", alt: "Artisan hands at work", title: "Hands of the masters", no: "№ 02" },
  { src: "/images/tunisia-026.jpg", alt: "Dougga panoramic", title: "Rome, undisturbed", no: "№ 03" },
  { src: "/images/tunisia-030.jpg", alt: "Catamaran on the Mediterranean", title: "Reading the wind", no: "№ 04" },
  { src: "/images/tunisia-048.jpg", alt: "Chebika waterfall", title: "Water in the mountains", no: "№ 05" },
  { src: "/images/tunisia-082.jpg", alt: "Sahara dunes", title: "The sand sea", no: "№ 06" },
];

export default function Postcards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="overflow-hidden bg-paper py-[clamp(5rem,10vh,8rem)]">
      <div ref={ref} className="mx-auto w-[min(1120px,92vw)]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="sec-label font-sans"
        >
          Field Notes
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-3 font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02]"
        >
          Postcards from
          <br />
          <em className="text-brick">the quest.</em>
        </motion.h2>
      </div>

      <div className="flex snap-x snap-mandatory gap-[clamp(1.2rem,3vw,2.4rem)] overflow-x-auto px-[4vw] pb-14 pt-12">
        {cards.map((card, i) => (
          <motion.div
            key={card.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.12 }}
            className={`group relative flex-none snap-center bg-[#fbf6ea] p-3 pb-0 shadow-[0_14px_30px_rgba(74,59,42,0.22)] transition-transform duration-500 hover:z-[2] hover:-translate-y-1.5 hover:rotate-0 hover:scale-[1.02] ${
              i % 2 === 0 ? "rotate-[-2.2deg]" : "translate-y-3.5 rotate-[1.8deg]"
            } w-[min(320px,74vw)]`}
          >
            {/* postmark */}
            <span className="absolute -top-4 -right-3 z-[1] flex h-[74px] w-[74px] rotate-12 items-center justify-center rounded-full border-2 border-[rgba(184,68,44,0.55)] bg-[rgba(251,246,234,0.6)] p-2 text-center font-sans text-[7.5px] font-semibold tracking-[0.14em] text-[rgba(184,68,44,0.7)]">
              TUNIS R.P. · 2026
            </span>
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="320px"
                className="object-cover"
                style={{ filter: "sepia(0.14) saturate(1.02)" }}
              />
            </div>
            <div className="flex items-center justify-between px-0.5 py-2.5">
              <span className="font-serif text-[1.02rem] italic">{card.title}</span>
              <span className="font-sans text-[9px] tracking-[0.22em] text-brick">{card.no}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
