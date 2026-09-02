"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="sec-screen bg-paper py-[clamp(5rem,11vh,8rem)]">
      <div className="mx-auto w-[min(720px,92vw)]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-12 text-center font-serif text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.08]"
        >
          <em className="text-brick">About the Excursion</em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-6 font-serif text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.7] text-ink"
        >
          <p className="first-letter:float-left first-letter:pr-2 first-letter:font-serif first-letter:text-[3.4em] first-letter:leading-[0.8] first-letter:text-brick">
            Very rarely do we get to go on adventures when we&rsquo;re head down
            building companies or pursuing a creative journey.
          </p>

          <p>
            And even more rarely do we get to do that with other curated people
            who understand it as well as you do.
          </p>

          <p>
            As we continue to create experiences for people in these fields, this
            retreat split between 25 founders and creatives on the Tunisian coast
            and the Sahara. Half of it more heads-down, half of it out in a
            country most people have never seriously considered visiting.
          </p>

          <p>
            We&rsquo;ve been running retreats for two years. Last winter it was
            the Austrian Alps where thirty of us went skiing the Pitztal and
            worked out of a hotel we&rsquo;d taken over completely. This is the
            warm-weather version, and in a lot of ways the more interesting one.
            Tunis has some of the best-preserved Roman sites in the
            Mediterranean, a medina that&rsquo;s been continuously lived in since
            the 7th century, and the Sahara about five hours south of the
            airport.
          </p>

          <div className="pt-4 text-center">
            <a
              href="https://airtable.com/appfHYP1FsRGQoYeT/pagwo4elSg0CbGMOb/form"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-[3px] bg-brick px-8 py-4 font-sans text-[11px] uppercase tracking-[0.3em] text-[#f6efdd] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#99351f]"
            >
              Apply
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
