"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const properties = [
  {
    name: "Dar Turki",
    location: "Sidi Bou Sa\u00efd",
    type: "Private Palace",
    description:
      "A prestigious arabo-Andalusian palace. Seven fully independent suites, each with its own rhythm. More like a private domain than a hotel.",
    image: "/images/tunisia-038.jpg",
    imageAlt: "Ornate bedroom suite at Dar Turki",
  },
  {
    name: "Dar Sa\u00efd",
    location: "Sidi Bou Sa\u00efd",
    type: "Boutique Hotel",
    description:
      "Tunisia\u2019s first boutique hotel. Sun-warmed stone, scented gardens, four patios. An outdoor pool, a hammam, and breakfast wherever you choose.",
    image: "/images/tunisia-034.jpg",
    imageAlt: "Sidi Bou Said architecture with sea view",
  },
  {
    name: "Diar Abou Habibi",
    location: "Tozeur",
    type: "Oasis Lodge",
    description:
      "Wooden cabins among 400,000 date palms. The kind of place that makes you forget what day it is.",
    image: "/images/tunisia-046.jpg",
    imageAlt: "Palm grove oasis at Tozeur",
  },
];

export default function Accommodations() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-48">
      <div className="px-8 md:px-[8vw]">
        <div ref={headerRef} className="mb-20 md:mb-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="mb-4 font-sans text-[10px] tracking-[0.6em] uppercase text-sand/50"
          >
            Where You&apos;ll Stay
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.03em] text-white"
          >
            The
            <br />
            <span className="italic text-sand/60">Accommodations</span>
          </motion.h2>
        </div>

        {/* Staggered grid */}
        <div className="grid grid-cols-1 gap-10 md:gap-16 md:grid-cols-12">
          {properties.map((property, i) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: "-60px" });
            // Stagger: first takes 5 cols, second 4 cols offset, third 5 cols
            const colClasses = [
              "md:col-span-5",
              "md:col-span-4 md:col-start-7 md:mt-24",
              "md:col-span-5 md:col-start-4 md:mt-12",
            ][i];

            return (
              <motion.div
                ref={ref}
                key={property.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1 }}
                className={`group ${colClasses}`}
              >
                <div className="img-zoom relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Type badge */}
                  <div className="absolute left-4 top-4">
                    <span className="border border-white/20 bg-black/40 px-3 py-1 font-sans text-[9px] tracking-[0.3em] uppercase text-white/60 backdrop-blur-sm">
                      {property.type}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-sand/50">
                    {property.location}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-white md:text-3xl">
                    {property.name}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-[1.7] text-white/40">
                    {property.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
