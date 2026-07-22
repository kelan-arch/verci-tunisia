"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const includes = [
  "Private accommodation in heritage properties",
  "All transfers & a private catamaran day",
  "Master-led artisan workshops in the medina",
  "Guided walks — Medina, Testour, Dougga",
  "A night with nomadic hosts in the Sahara",
  "All meals, from Dar Zarrouk to the campfire",
];

export default function JoinCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="py-[clamp(5rem,12vh,9rem)] text-[#e9e2d2]"
      style={{ background: "linear-gradient(180deg, var(--color-night) 0%, #12100c 100%)" }}
    >
      <div ref={ref} className="mx-auto w-[min(1120px,92vw)]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="sec-label font-sans"
          style={{ color: "var(--color-sand)" }}
        >
          Join the quest
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-3 font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02]"
        >
          Your seat on
          <br />
          the <em className="text-sand">caravan.</em>
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 items-center gap-[clamp(2.5rem,6vw,6rem)] md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <ul>
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3.5 py-3.5 font-serif text-[1.1rem]"
                  style={{ borderBottom: "1.5px dotted rgba(196,167,125,0.3)" }}
                >
                  <span className="text-[0.8rem] text-brick">✳</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="mailto:ami@verci.com"
              className="mt-9 inline-block rounded-[3px] bg-brick px-8 py-4 font-sans text-[11px] uppercase tracking-[0.3em] text-[#f6efdd] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#99351f]"
            >
              Request an invitation
            </a>
          </motion.div>

          {/* Boarding pass + the designer's invitation cards behind it */}
          <div className="relative mt-16 md:mt-6">
            <motion.figure
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              animate={
                inView
                  ? { opacity: 1, y: 0, rotate: 5, transition: { duration: 0.9, delay: 0.65 } }
                  : {}
              }
              whileHover={{ y: -170, rotate: 9, scale: 1.04 }}
              whileTap={{ y: -170, rotate: 9, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="absolute -top-[clamp(3rem,7vw,5.5rem)] right-[4%] z-0 w-[46%] max-w-[230px] overflow-hidden rounded-[6px] shadow-[0_16px_44px_rgba(0,0,0,0.55)]"
            >
              <Image
                src="/images/brand/invitation-cards.jpg"
                alt="You are invited to — VERCI Tunisia invitation cards"
                width={540}
                height={675}
                className="w-full"
              />
            </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 26, rotate: 0 }}
            animate={inView ? { opacity: 1, y: 0, rotate: -1.6 } : {}}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="relative z-[1] overflow-hidden rounded-[10px] bg-[#f6efdd] text-ink shadow-[0_24px_60px_rgba(0,0,0,0.5)] before:absolute before:-left-[13px] before:top-[64%] before:h-[26px] before:w-[26px] before:rounded-full before:bg-[#12100c] before:content-[''] after:absolute after:-right-[13px] after:top-[64%] after:h-[26px] after:w-[26px] after:rounded-full after:bg-[#12100c] after:content-['']"
          >
            <div className="px-4 pb-0 pt-4 md:px-7 md:pt-6">
              <div className="flex items-center justify-between font-serif text-[1.45rem] font-semibold md:text-[2rem]">
                <span>NYC</span>
                <span className="font-sans text-[0.8rem] tracking-[0.3em] text-brick md:text-[1.1rem]">·····✈︎·····</span>
                <span>TUN</span>
              </div>
              <div className="mt-0.5 flex justify-between font-sans text-[8px] uppercase tracking-[0.18em] text-ink-soft md:text-[9.5px]">
                <span>New York</span>
                <span>Tunis-Carthage</span>
              </div>
              <div className="mt-3.5 flex flex-nowrap justify-between gap-x-2 font-sans text-[0.6rem] md:mt-5 md:justify-start md:gap-8 md:text-[0.72rem]">
                {[
                  ["Passenger", "QUESTER / VERCI"],
                  ["Date", "19 OCT 2026"],
                  ["Seats", "~30"],
                  ["Class", "EXCLUSIVE"],
                ].map(([label, value]) => (
                  <div key={label} className="whitespace-nowrap">
                    <b className="mb-0.5 block text-[7px] font-medium uppercase tracking-[0.18em] text-ink-soft md:text-[9px] md:tracking-[0.2em]">
                      {label}
                    </b>
                    {value}
                  </div>
                ))}
              </div>
              <div className="mt-3.5 md:mt-5" style={{ borderTop: "2px dashed rgba(74,59,42,0.35)" }} />
            </div>
            <div className="flex flex-nowrap items-center justify-between gap-3 px-4 pb-4 pt-3 md:px-7 md:pb-6 md:pt-4">
              <span className="shrink-0 rotate-[-5deg] rounded-md border-2 border-brick bg-[rgba(184,68,44,0.05)] px-2 py-1.5 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-brick md:border-[2.5px] md:px-3.5 md:py-2.5 md:text-[0.8rem] md:tracking-[0.22em]">
                Join the Quest
              </span>
              <span className="font-mono text-[0.85rem] tracking-[-1px] opacity-80 md:text-[1.6rem]">
                ▮I015IL▮I0▮LI▮1▮0IIL▮
              </span>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
