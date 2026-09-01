"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WhosComing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="sec-screen py-[clamp(4rem,8vh,6rem)]"
      style={{
        background:
          "linear-gradient(180deg, #33202a 0%, var(--color-nightblue) 45%, #2a1a14 70%, var(--color-dusk) 88%, var(--color-terracotta) 100%)",
      }}
    >
      <div className="mx-auto grid w-[min(1120px,92vw)] gap-x-16 gap-y-14 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <h2 className="mb-8 font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-[1.08] text-[#f0e7d3]">
            Who&rsquo;s coming
          </h2>
          <div className="space-y-5 font-serif text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.65] text-[rgba(233,226,210,0.85)]">
            <p>
              Twenty to twenty-five people, all hand-picked. Mostly founders, idea
              through series b, plus a handful of creatives, writers, and people
              who are hard to categorize but who you&rsquo;ll be glad are there.
            </p>
            <p>
              We&rsquo;ve hosted 350+ events and 15+ retreats over the past two
              years, and curation is the thing we&rsquo;ve spent the most time on.
              For us, 25 is perfect number for this kind of retreat.
            </p>
            <p>
              Open to Verci members and to everyone else by application.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <h2 className="mb-8 font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-[1.08] text-[#f0e7d3]">
            Eating
          </h2>
          <div className="space-y-5 font-serif text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.65] text-[rgba(233,226,210,0.85)]">
            <p>
              Breakfast is at the hotel every morning. Lunches and dinners will
              move around.
            </p>
            <p>
              The first night is at Dar Zarrouk in Sidi Bou Sa&iuml;d, on a
              terrace above the sea. One night we eat in La Goulette, the old port
              town where the cooking is Sicilian and Tunisian and Jewish all at
              once. Another at Le Golfe. On the water day, lunch is either set up
              on a beach you can only reach by boat or served on board.
            </p>
            <p>
              In the south we will eat at the lodge in the palm grove, and the
              last dinner is cooked over a fire in the dunes by the people hosting
              us out there.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
