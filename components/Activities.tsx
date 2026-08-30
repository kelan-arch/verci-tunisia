"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ActivityBlockProps {
  title: string;
  children: React.ReactNode;
  delay: number;
  inView: boolean;
}

function ActivityBlock({ title, children, delay, inView }: ActivityBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay }}
      className="border-t border-[rgba(196,167,125,0.25)] pt-8"
    >
      <h3 className="mb-4 font-serif text-[clamp(1.3rem,2.2vw,1.7rem)] italic text-sand">
        {title}
      </h3>
      <div className="space-y-4 font-sans text-[clamp(0.92rem,1.3vw,1.05rem)] leading-[1.75] text-[rgba(233,226,210,0.78)]">
        {children}
      </div>
    </motion.div>
  );
}

export default function Activities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-night py-[clamp(5rem,11vh,8rem)] text-[#e9e2d2]"
    >
      <div className="mx-auto w-[min(820px,92vw)]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-14 font-serif text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.08]"
        >
          What we&rsquo;ll actually do
        </motion.h2>

        <div className="space-y-12">
          {/* 1. The medina */}
          <ActivityBlock title="The medina." delay={0.1} inView={inView}>
            <p>
              Tunis&rsquo;s old city is one of the best-preserved medieval
              Islamic city centers anywhere &mdash; a UNESCO site with 700-odd
              monuments, founded in the 7th century and still completely lived
              in. We walk it with someone who can get us into the working
              ateliers and inner courtyards that aren&rsquo;t on any tour. The
              afternoon is at Dar El Sanaa, where five workshops run at once,
              each with a master craftsperson: copper engraving, Arabic
              calligraphy, embroidery, wood carving, and mosaic. You pick one
              and leave with whatever you made.
            </p>
          </ActivityBlock>

          {/* 2. Carthage and Sidi Bou Saïd */}
          <ActivityBlock
            title="Carthage and Sidi Bou Sa&iuml;d."
            delay={0.15}
            inView={inView}
          >
            <p>
              Carthage was founded around 814 BC and spent a few centuries
              running the western Mediterranean before Rome finally finished it
              off. What&rsquo;s left is worth the morning: the museum on Byrsa
              hill, the Tophet, the circular Punic ports, and the Antonine
              Baths, whose columns are still standing at the edge of the water.
              Sidi Bou Sa&iuml;d in the afternoon &mdash; white walls, blue
              doors, the light that pulled Klee and Macke here a century ago
              &mdash; and Ennejma Ezzahra, a palace that&rsquo;s now the home of
              Tunisian musical heritage.
            </p>
          </ActivityBlock>

          {/* 3. A day on the water at Cap Bon */}
          <ActivityBlock
            title="A day on the water at Cap Bon."
            delay={0.2}
            inView={inView}
          >
            <p>
              Cap Bon is the peninsula pointing at Sicily, the closest Africa
              gets to Europe. In October the sea is still warm and everyone else
              has gone home. Three options, you pick:
            </p>
            <ul className="ml-5 list-disc space-y-2 marker:text-sand/60">
              <li>
                A catamaran from Sidi Bou Sa&iuml;d to Korbous &mdash; coves
                you can&rsquo;t reach by land, some sailing, snorkeling,
                paddleboards, and a lot of doing nothing.
              </li>
              <li>
                The cove at Mteris, up at the northern tip of the cape, reached
                by a short boat crossing.
              </li>
              <li>
                Kayaks and paddleboards from Port aux Princes, about an hour
                along the coast to a cove where the team will have already
                carried the bags over and set up lunch.
              </li>
            </ul>
          </ActivityBlock>

          {/* 4. The drive south */}
          <ActivityBlock
            title="The drive south."
            delay={0.25}
            inView={inView}
          >
            <p>
              Coast to steppe to palm grove over about seven hours, with lunch
              at Tamarza when we arrive. Then the mountain oases &mdash;
              Tamarza, Ch&eacute;bika, and Mid&egrave;s &mdash; where springs
              and waterfalls run through the rock and a canyon opens up under
              your feet. Late afternoon at Mos Espa near Nefta, the Star Wars
              set that&rsquo;s still sitting out in the sand, with a drink while
              the sun goes down. The plains next door are where they shot The
              English Patient.
            </p>
          </ActivityBlock>

          {/* 5. A night in the Sahara */}
          <ActivityBlock
            title="A night in the Sahara."
            delay={0.3}
            inView={inView}
          >
            <p>
              Past Tozeur the road narrows and then stops, and the Grand Erg
              Oriental starts &mdash; one of the two great sand seas of the
              desert. No signal, no noise, nothing to fix your eye on. The
              afternoon goes at whatever pace the dunes set: walking, camels, or
              sitting still and watching the light change. Dinner around a fire,
              then you sleep outside. Most people say this is the part they
              remember.
            </p>
          </ActivityBlock>

          {/* 6. Verci programming */}
          <ActivityBlock
            title="And the Verci programming."
            delay={0.35}
            inView={inView}
          >
            <p>
              Fireside chats, office hours, and workshops built around what this
              particular group wants. We&rsquo;ll ask you before we go.
            </p>
          </ActivityBlock>
        </div>
      </div>
    </section>
  );
}
