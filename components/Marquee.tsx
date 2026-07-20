"use client";

import { motion } from "framer-motion";

const items = [
  "Tunis",
  "Sidi Bou Sa\u00efd",
  "Medina",
  "Cap Bon",
  "Tozeur",
  "Sahara",
  "Chebika",
  "Mides",
  "Mos Espa",
  "Dar Turki",
];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-white/5 py-5">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-8"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-serif text-2xl italic text-white/15 md:text-3xl">
              {item}
            </span>
            <span className="text-sand/20">&bull;</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
