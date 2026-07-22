"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const facts: [string, string][] = [
  ["Best time to travel", "October"],
  ["Dates", "October 19 – 26, 2026"],
  ["Duration", "7 days / 6 nights"],
  ["Questers", "~30, exclusive use"],
  ["Route", "Tunis → Testour → Dougga → Cap Bon → Tozeur → Desert → Tunis"],
];

const collage = [
  {
    src: "/images/tunisia-034.jpg",
    alt: "Sidi Bou Saïd",
    caption: "Sidi Bou Saïd, above the Gulf of Tunis",
    className: "left-0 top-0 w-[58%] rotate-[-2.4deg]",
    width: 640,
    height: 480,
  },
  {
    src: "/images/tunisia-010.jpg",
    alt: "Artisan workshop",
    caption: "Dar El Sanaa, the workshops",
    className: "right-0 top-[24%] w-[48%] rotate-[2deg]",
    width: 640,
    height: 480,
  },
  {
    src: "/images/tunisia-024.jpg",
    alt: "Dougga ruins",
    caption: "Dougga, Thugga in Latin",
    className: "bottom-0 left-0 w-[44%] rotate-[-1deg]",
    width: 640,
    height: 480,
  },
  {
    src: "/images/brand/poster.jpg",
    alt: "VERCI in Tunisia poster — stone mark over the dunes",
    caption: "The poster, October 2026",
    className: "bottom-[2%] right-[3%] w-[37%] rotate-[3.2deg]",
    width: 540,
    height: 675,
  },
];

export default function Pitch() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lifted, setLifted] = useState<number | null>(null);

  return (
    <section ref={ref} className="bg-paper py-[clamp(5rem,11vh,8rem)]">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="sec-label font-sans"
        >
          The Nomadic Quest
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-3 font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02]"
        >
          A country few travellers
          <br />
          <em className="text-brick">know in full.</em>
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 items-start gap-[clamp(2rem,5vw,5rem)] md:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <p className="mb-5 font-serif text-[clamp(1.15rem,1.7vw,1.4rem)] leading-[1.55] first-letter:float-left first-letter:pr-1 first-letter:font-serif first-letter:text-[3.2em] first-letter:italic first-letter:leading-[0.82] first-letter:text-brick">
              <span className="font-semibold not-italic text-brick">Experience / </span>
              From the living medina of Tunis to the ancient Numidian city of Dougga and
              the Andalusian town of Testour, a full day on the Mediterranean aboard a
              catamaran, and deep into the south: the mountain oases, canyons and salt
              lakes of Tozeur — converging on a night under the stars in the Sahara
              desert.
            </p>
            <p className="mb-8 font-serif text-[clamp(1.15rem,1.7vw,1.4rem)] leading-[1.55]">
              Mediterranean light, desert silence, and centuries of layered civilisation
              coexist, sometimes within hours of each other. Travelling through them is
              less a visit than a rereading. <em>Curiosity is the compass.</em>
            </p>

            <dl className="text-[0.82rem]" style={{ borderTop: "1.5px dotted var(--color-ink-soft)" }}>
              {facts.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 px-0.5 py-3"
                  style={{ borderBottom: "1.5px dotted var(--color-ink-soft)" }}
                >
                  <dt className="tracking-[0.06em] text-ink-soft">{label}</dt>
                  <dd className="text-right font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="relative mt-4 h-[420px] md:h-[540px]"
          >
            {collage.map((photo, i) => (
              <figure
                key={photo.src}
                onClick={() => setLifted(lifted === i ? null : i)}
                className={`absolute cursor-pointer bg-[#fbf6ea] p-2.5 pb-7 shadow-[0_10px_26px_rgba(74,59,42,0.22)] transition-all duration-300 ease-out hover:z-20 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.06] hover:shadow-[0_28px_56px_rgba(74,59,42,0.38)] before:absolute before:-top-3 before:left-1/2 before:h-[26px] before:w-[84px] before:-translate-x-1/2 before:rotate-[-2deg] before:bg-[rgba(214,199,163,0.85)] before:shadow-[0_1px_3px_rgba(0,0,0,0.12)] before:content-[''] ${photo.className} ${
                  lifted === i
                    ? "z-20! -translate-y-2! rotate-0! scale-[1.06]! shadow-[0_28px_56px_rgba(74,59,42,0.38)]!"
                    : ""
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="w-full"
                  style={{ filter: "sepia(0.18) saturate(0.95)" }}
                />
                <figcaption className="pt-2 text-center font-serif text-[0.85rem] italic text-ink-soft">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
