"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function TheWeek() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-paper py-[clamp(5rem,11vh,8rem)]">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-12 font-serif text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.08]"
        >
          The week
        </motion.h2>

        <div className="grid grid-cols-1 gap-[clamp(2rem,5vw,4rem)] md:grid-cols-2">
          {/* Days 1–4 */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <h3 className="mb-4 font-serif text-[clamp(1.3rem,2.2vw,1.7rem)] font-medium italic text-brick">
              Days 1&ndash;4, La Marsa.
            </h3>
            <p className="font-serif text-[clamp(1.05rem,1.5vw,1.2rem)] leading-[1.7] text-ink">
              We take over a hotel on the coast just north of Carthage and use it
              as a basecamp. Mornings are for working and hanging out, with some
              small programming. Then we&rsquo;ll go out: the medina one day,
              Carthage and Sidi Bou Sa&iuml;d the next, a full day on the water
              after that.
            </p>
          </motion.div>

          {/* Divider — visible only on mobile between stacked columns */}
          <hr className="dotted-rule md:hidden" />

          {/* Days 5–7 */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative md:before:absolute md:before:-left-[clamp(1rem,2.5vw,2rem)] md:before:top-0 md:before:h-full md:before:border-l-[1.5px] md:before:border-dotted md:before:border-ink-soft/50 md:before:content-['']"
          >
            <h3 className="mb-4 font-serif text-[clamp(1.3rem,2.2vw,1.7rem)] font-medium italic text-brick">
              Days 5&ndash;7, the south.
            </h3>
            <p className="font-serif text-[clamp(1.05rem,1.5vw,1.2rem)] leading-[1.7] text-ink">
              We drive out of Tunis early and don&rsquo;t come back for three
              days. Mountain oases, a Star Wars set still standing in the desert,
              and a night sleeping in the dunes with nomadic hosts. No laptops or
              wifi allowed. Day seven is the road back to Tunis and flights home.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
