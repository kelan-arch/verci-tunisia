"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What does my ticket cover?",
    a: "Ticket prices vary based on your selected accommodations, but each ticket is all-inclusive: accommodations for the full week, all meals and beverages, private transport within Tunisia, access to all programming and activities. Not included: your flights to Tunis and any personal shopping.",
  },
  {
    q: "How do I get there?",
    a: "Fly into Tunis-Carthage (TUN). We\u2019ll arrange transfers from the airport. Direct flights from Paris, Rome, Istanbul, Frankfurt, and most of Europe; one connection from the US.",
  },
  {
    q: "What should I bring?",
    a: "Light layers for warm coast days, something warmer for cold desert nights. We\u2019ll send a full packing list two weeks before the trip.",
  },
  {
    q: "How do I apply?",
    a: "Open to Verci members and everyone else by application through this website.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="sec-screen bg-nightblue py-[clamp(5rem,11vh,8rem)]">
      <div className="mx-auto w-[min(760px,92vw)]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-12 font-serif text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.08] text-[#f0e7d3]"
        >
          FAQ
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="divide-y divide-[rgba(196,167,125,0.25)]"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-t border-[rgba(196,167,125,0.25)] first:border-t-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.4] text-[#f0e7d3]">
                    {faq.q}
                  </span>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center font-sans text-xl text-sand transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 font-sans text-[clamp(0.92rem,1.3vw,1.05rem)] leading-[1.7] text-[rgba(233,226,210,0.7)]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
