"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Eating() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-[clamp(5rem,11vh,8rem)]"
      style={{
        background:
          "linear-gradient(180deg, var(--color-nightblue) 0%, #2a1a14 40%, var(--color-dusk) 70%, var(--color-terracotta) 100%)",
      }}
    >
      <div className="mx-auto w-[min(760px,92vw)]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-10 font-serif text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.08] text-[#f0e7d3]"
        >
          Eating
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-6 font-serif text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7] text-[rgba(233,226,210,0.85)]"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
