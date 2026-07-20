"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const experiences = [
  {
    title: "Ancient Medina",
    subtitle: "UNESCO World Heritage",
    image: "/images/tunisia-004.jpg",
  },
  {
    title: "Artisan Workshops",
    subtitle: "Hands-on craft",
    image: "/images/tunisia-008.jpg",
  },
  {
    title: "Mediterranean Sailing",
    subtitle: "Cap Bon coastline",
    image: "/images/tunisia-032.jpg",
  },
  {
    title: "Star Wars Locations",
    subtitle: "Mos Espa, Nefta",
    image: "/images/tunisia-058.jpg",
  },
  {
    title: "Mountain Oases",
    subtitle: "Chebika & Mides",
    image: "/images/tunisia-050.jpg",
  },
  {
    title: "Night Under the Stars",
    subtitle: "Sahara Desert",
    image: "/images/tunisia-082.jpg",
  },
];

export default function Experiences() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-night-light py-32 md:py-48">
      <div className="px-8 md:px-[8vw]">
        <div ref={headerRef} className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="mb-4 font-sans text-[10px] tracking-[0.6em] uppercase text-sand/50"
          >
            What Awaits
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.03em] text-white"
          >
            The
            <br />
            <span className="italic text-sand/60">Experiences</span>
          </motion.h2>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto px-8 pb-8 md:gap-6 md:px-[8vw] [&::-webkit-scrollbar]:hidden">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative w-[75vw] shrink-0 sm:w-[50vw] md:w-[35vw] lg:w-[28vw]"
            >
              <div className="img-zoom relative aspect-[3/4] overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:brightness-110"
                  sizes="(max-width: 768px) 75vw, 35vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-sand/60">
                    {exp.subtitle}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-white">
                    {exp.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Spacer for scroll padding */}
          <div className="w-8 shrink-0 md:w-[8vw]" />
        </div>
      </div>
    </section>
  );
}
