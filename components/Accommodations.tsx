"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function Accommodations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-[clamp(5rem,11vh,8rem)] text-[#f0e7d3]"
      style={{
        background:
          "linear-gradient(180deg, var(--color-paper-deep) 0%, var(--color-terracotta) 30%, var(--color-dusk) 70%, #33202a 100%)",
      }}
    >
      <div className="mx-auto w-[min(1120px,92vw)]">
        <div className="grid grid-cols-1 items-center gap-[clamp(2rem,5vw,5rem)] md:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="space-y-5 font-serif text-[clamp(1.05rem,1.5vw,1.2rem)] leading-[1.7]"
          >
            <h2 className="mb-6 font-serif text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.08]">
              Where you&rsquo;ll stay
            </h2>
            <p>
              Golden Carthage Hotel &amp; R&eacute;sidence, in La Marsa &mdash; a
              seafront town at the top of the Carthage coast, ten minutes from
              Sidi Bou Sa&iuml;d and about twenty from the airport, with the
              promenade and the beach in walking distance.
            </p>
            <p>
              We&rsquo;re taking a mix of the residence apartments and the hotel
              rooms. Every unit has a balcony. Breakfast is included,
              there&rsquo;s daily housekeeping and 24-hour room service, two
              pools, three restaurants, and a gym.
            </p>
            <p>
              In the south you&rsquo;re in a beautiful hotel at Diar Abou
              Habibi, a lodge built inside a palm grove outside Tozeur.
            </p>
            <p>
              The last night there&rsquo;s no hotel at all. Tents, bedrolls, and
              open sky in the Grand Erg Oriental.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <figure className="img-zoom relative overflow-hidden before:absolute before:-inset-3 before:-z-[1] before:border-[1.5px] before:border-dashed before:border-[rgba(240,231,211,0.3)] before:content-['']">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/tunisia-038.jpg"
                  alt="Ornate bedroom at the hotel"
                  fill
                  sizes="(max-width: 768px) 92vw, 480px"
                  className="object-cover"
                />
              </div>
              <figcaption className="pt-3 font-serif text-[0.85rem] italic text-[rgba(240,231,211,0.7)]">
                Golden Carthage Hotel &amp; R&eacute;sidence
              </figcaption>
            </figure>

            <figure className="img-zoom relative overflow-hidden before:absolute before:-inset-3 before:-z-[1] before:border-[1.5px] before:border-dashed before:border-[rgba(240,231,211,0.3)] before:content-['']">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/diar-abou-habibi-room.png"
                  alt="Carved wooden bedroom at Diar Abou Habibi"
                  fill
                  sizes="(max-width: 768px) 92vw, 480px"
                  className="object-cover object-[center_75%]"
                />
              </div>
              <figcaption className="pt-3 font-serif text-[0.85rem] italic text-[rgba(240,231,211,0.7)]">
                Diar Abou Habibi, Tozeur
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
