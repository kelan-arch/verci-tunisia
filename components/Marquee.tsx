"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

const items: { en: string; ar?: string }[] = [
  { en: "Tunis", ar: "تونس" },
  { en: "Sidi Bou Saïd", ar: "سيدي بو سعيد" },
  { en: "Testour" },
  { en: "Dougga", ar: "دقة" },
  { en: "Cap Bon" },
  { en: "Tozeur", ar: "توزر" },
  { en: "Sahara", ar: "الصحراء" },
  { en: "Grand Erg Oriental" },
];

function Run() {
  return (
    <>
      {items.map((item) => (
        <Fragment key={item.en}>
          <span className="mx-4 font-serif text-lg text-ink-soft">{item.en}</span>
          {item.ar && (
            <span className="mx-4 font-arabic text-xl text-ink-soft">{item.ar}</span>
          )}
          <span className="mx-4 text-brick">✳</span>
        </Fragment>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div
      className="overflow-hidden whitespace-nowrap bg-paper py-3.5"
      style={{
        borderTop: "1.5px dotted var(--color-ink-soft)",
        borderBottom: "1.5px dotted var(--color-ink-soft)",
      }}
      aria-hidden="true"
    >
      <motion.div
        className="inline-block"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        <Run />
        <Run />
      </motion.div>
    </div>
  );
}
