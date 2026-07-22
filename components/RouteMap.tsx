"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import PassportOverlay from "@/components/PassportOverlay";
import { days } from "@/lib/itinerary";

const PAPER = "#f0e7d3";

/* Per-stop marker data: ring position, tag position/anchor, illustration */
const stops = [
  {
    day: 0,
    cx: 382,
    cy: 64,
    tag: { x: 404, y: 60, anchor: "start" as const },
    label: "Sidi Bou Saïd",
    illus: (
      <g transform="translate(390,26)">
        <g className="illus" filter="url(#rough2)">
          {/* blue door */}
          <path d="M 0 22 L 0 8 Q 7 -2 14 8 L 14 22 Z" fill="#2456a4" stroke="#1a3f7d" strokeWidth="1" />
          <circle cx="7" cy="14" r="1.2" fill={PAPER} />
        </g>
      </g>
    ),
  },
  {
    day: 1,
    cx: 352,
    cy: 80,
    tag: { x: 296, y: 66, anchor: "end" as const },
    label: "Medina of Tunis",
    illus: (
      <g transform="translate(322,44)">
        <g className="illus" filter="url(#rough2)">
          {/* minaret + arch */}
          <rect x="0" y="6" width="7" height="18" fill="none" stroke="#4a3b2a" strokeWidth="1.3" />
          <path d="M -1 6 L 8.5 6 L 3.5 0 Z" fill="#4a3b2a" />
          <path d="M 11 24 L 11 16 Q 15 10 19 16 L 19 24" fill="none" stroke="#4a3b2a" strokeWidth="1.3" />
        </g>
      </g>
    ),
  },
  {
    day: 2,
    cx: 252,
    cy: 112,
    tag: { x: 196, y: 98, anchor: "end" as const },
    label: "Testour & Dougga",
    illus: (
      <g transform="translate(222,120)">
        <g className="illus" filter="url(#rough2)">
          {/* roman columns */}
          <g stroke="#4a3b2a" strokeWidth="1.3" fill="none">
            <line x1="2" y1="4" x2="2" y2="18" />
            <line x1="9" y1="4" x2="9" y2="18" />
            <line x1="16" y1="4" x2="16" y2="18" />
            <line x1="-1" y1="3" x2="19" y2="3" />
            <line x1="0" y1="0" x2="18" y2="0" />
            <line x1="-1" y1="19" x2="19" y2="19" />
          </g>
        </g>
      </g>
    ),
  },
  {
    day: 3,
    cx: 452,
    cy: 50,
    tag: { x: 470, y: 78, anchor: "start" as const },
    label: "Cap Bon",
    illus: (
      <g transform="translate(478,18)">
        <g className="illus" filter="url(#rough2)">
          {/* catamaran */}
          <path d="M 0 16 L 22 16 L 18 21 L 4 21 Z" fill="none" stroke="#4a3b2a" strokeWidth="1.3" />
          <path d="M 11 15 L 11 0 L 20 13 Z" fill="#4a3b2a" opacity=".85" />
        </g>
      </g>
    ),
  },
  {
    day: 4,
    cx: 138,
    cy: 380,
    tag: { x: 122, y: 366, anchor: "end" as const },
    label: "Tozeur",
    illus: (
      <g transform="translate(96,330)">
        <g className="illus" filter="url(#rough2)">
          {/* palm */}
          <path d="M 12 24 Q 11 12 12 6" fill="none" stroke="#4a3b2a" strokeWidth="1.4" />
          <path
            d="M 12 7 Q 4 2 -2 6 M 12 7 Q 10 -2 4 -3 M 12 7 Q 15 -3 22 -2 M 12 7 Q 20 3 26 8"
            fill="none"
            stroke="#4a3b2a"
            strokeWidth="1.2"
          />
        </g>
      </g>
    ),
  },
  {
    day: 5,
    cx: 254,
    cy: 528,
    tag: { x: 216, y: 516, anchor: "end" as const },
    label: "Sahara Desert",
    illus: (
      <g transform="translate(272,540)">
        <g className="illus" filter="url(#rough2)">
          {/* camel + moon */}
          <path d="M 0 14 Q 5 6 10 12 Q 14 5 19 12 L 21 8 L 23 8 L 22 14 Z" fill="#4a3b2a" />
          <path d="M 3 14 L 3 19 M 8 14 L 8 19 M 15 14 L 15 19 M 20 14 L 20 19" stroke="#4a3b2a" strokeWidth="1.1" />
          <path d="M 32 2 A 6 6 0 1 0 36 10 A 4.6 4.6 0 1 1 32 2 Z" fill="#4a3b2a" opacity=".8" />
        </g>
      </g>
    ),
  },
  {
    day: 6,
    cx: 371,
    cy: 92,
    tag: { x: 412, y: 112, anchor: "start" as const },
    label: "Back to Tunis",
    muted: true,
    illus: (
      <g transform="translate(384,96)">
        <g className="illus" filter="url(#rough2)">
          {/* plane */}
          <path
            d="M 0 10 L 20 6 L 14 0 L 17 0 L 26 5 L 34 4 Q 37 5 34 7 L 26 8 L 17 13 L 14 13 L 18 8 Z"
            fill="#4a3b2a"
            opacity=".85"
          />
        </g>
      </g>
    ),
  },
];

export default function RouteMap() {
  const ref = useRef(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const wasDragged = useRef(false);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  return (
    <section className="bg-paper py-[clamp(5rem,12vh,9rem)]" id="route">
      <div ref={ref} className="mx-auto w-[min(1120px,92vw)]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="sec-label font-sans"
        >
          Suggested Itinerary
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-3 font-serif text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02] text-ink"
        >
          The <em className="text-brick">route.</em>
        </motion.h2>

        <motion.div
          ref={frameRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mx-auto mt-12 max-w-[720px] rounded-[4px] border border-[rgba(74,59,42,0.35)] p-[clamp(0.8rem,3vw,2rem)]"
          style={{ outline: "1.5px dotted rgba(74,59,42,0.3)", outlineOffset: "6px", background: "#ede2c8" }}
        >
          {/* Cartouche */}
          <div
            className="absolute left-[clamp(1rem,4vw,2.4rem)] top-[clamp(1rem,4vw,2.4rem)] z-[2] border-[1.5px] border-ink px-4 py-2.5 text-center"
            style={{ background: PAPER, boxShadow: "3px 3px 0 rgba(74,59,42,0.15)" }}
          >
            <h3 className="font-serif text-[1.3rem] font-semibold tracking-[0.24em] text-ink">TUNISIE</h3>
            <p className="font-serif text-[0.78rem] italic text-ink-soft">carnet de route · oct. 2026</p>
          </div>
          <p className="absolute bottom-[clamp(0.9rem,3vw,1.8rem)] right-[clamp(1rem,4vw,2.2rem)] z-[2] font-serif text-[0.85rem] italic text-ink-soft">
            Click a stop — or the passport itself
          </p>

          {/* Resting passport — draggable around the map */}
          <motion.button
            drag
            dragConstraints={frameRef}
            dragMomentum={false}
            dragElastic={0.15}
            style={{ rotate: 7 }}
            whileHover={{ scale: 1.05, rotate: 4 }}
            whileDrag={{ scale: 1.06, rotate: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            onDragStart={() => (wasDragged.current = true)}
            onDragEnd={() => setTimeout(() => (wasDragged.current = false), 0)}
            onClick={() => {
              if (!wasDragged.current) setSelectedDay(0);
            }}
            aria-label="Open the itinerary passport"
            className="group absolute -right-[clamp(8px,3vw,52px)] top-[clamp(90px,15vw,140px)] z-[3] w-[clamp(128px,19vw,200px)] cursor-grab touch-none border-0 bg-transparent p-0 active:cursor-grabbing"
          >
            <span
              className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-ink px-2.5 py-1 font-sans text-[8.5px] uppercase tracking-[0.22em] text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              Your travel document
            </span>
            <Image
              src="/images/tunisia-passport-clean.png"
              alt="Republic of Tunisia passport"
              width={276}
              height={396}
              className="pointer-events-none h-auto w-full drop-shadow-[0_14px_22px_rgba(0,0,0,0.35)]"
              draggable={false}
            />
          </motion.button>

          <svg viewBox="0 0 620 820" role="img" aria-label="Illustrated map of Tunisia with the seven-day route" className="block w-full">
            <defs>
              <filter id="rough">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={3} result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale={5} />
              </filter>
              <filter id="rough2">
                <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale={3} />
              </filter>
            </defs>

            {/* sea waves */}
            <g filter="url(#rough2)" stroke="#8aa3b2" strokeWidth="1.1" fill="none" opacity=".5">
              <path d="M 430 20 q 14 -7 28 0 q 14 7 28 0" />
              <path d="M 500 60 q 14 -7 28 0 q 14 7 28 0" />
              <path d="M 480 130 q 14 -7 28 0 q 14 7 28 0" />
              <path d="M 520 210 q 14 -7 28 0 q 14 7 28 0" />
              <path d="M 510 320 q 14 -7 28 0 q 14 7 28 0" />
              <path d="M 540 430 q 14 -7 28 0 q 14 7 28 0" />
              <path d="M 150 15 q 14 -7 28 0 q 14 7 28 0" />
              <path d="M 60 40 q 14 -7 28 0 q 14 7 28 0" />
            </g>
            <text className="map-sea" x="455" y="255" transform="rotate(62 455 255)">
              MER MÉDITERRANÉE
            </text>

            {/* landmass */}
            <g filter="url(#rough)">
              <path
                d="M 186 58
                   C 230 38, 290 20, 322 26
                   C 344 30, 352 48, 344 62
                   C 358 56, 372 62, 372 78
                   C 380 70, 398 64, 414 62
                   C 434 58, 452 48, 462 44
                   C 472 42, 476 50, 470 58
                   C 460 74, 442 92, 424 100
                   C 416 106, 410 112, 408 120
                   C 412 138, 414 158, 412 176
                   C 418 190, 440 198, 458 210
                   C 466 226, 452 250, 438 268
                   C 432 282, 430 288, 427 292
                   C 408 310, 380 330, 362 352
                   C 352 366, 346 376, 348 384
                   C 362 388, 386 386, 402 392
                   C 420 400, 442 412, 462 422
                   C 470 440, 464 470, 458 500
                   C 452 540, 450 590, 448 640
                   C 447 680, 446 725, 444 758
                   C 420 730, 380 690, 340 655
                   C 300 620, 262 592, 240 570
                   C 220 548, 200 510, 184 470
                   C 170 434, 150 400, 118 384
                   C 88 370, 60 352, 50 336
                   C 46 300, 58 250, 72 210
                   C 84 172, 100 132, 120 104
                   C 138 80, 162 66, 186 58 Z"
                fill="#ece1c6"
                stroke="#4a3b2a"
                strokeWidth="2.2"
              />
              {/* Djerba */}
              <path
                d="M 470 430 q 20 -8 34 4 q 8 12 -6 20 q -20 8 -32 -4 q -6 -12 4 -20 Z"
                fill="#ece1c6"
                stroke="#4a3b2a"
                strokeWidth="1.8"
              />
            </g>

            {/* chott el jerid */}
            <g filter="url(#rough2)">
              <ellipse cx="172" cy="408" rx="62" ry="20" fill="none" stroke="#9b8a6d" strokeWidth="1.4" strokeDasharray="5 4" />
              <g stroke="#9b8a6d" strokeWidth="1" opacity=".7">
                <line x1="140" y1="404" x2="152" y2="404" />
                <line x1="162" y1="412" x2="176" y2="412" />
                <line x1="186" y1="403" x2="200" y2="403" />
                <line x1="152" y1="418" x2="140" y2="418" />
              </g>
              <text className="map-geo" x="132" y="443">
                Chott el Jerid
              </text>
            </g>

            {/* dune hatching, deep south */}
            <g filter="url(#rough2)" stroke="#b09a76" strokeWidth="1.3" fill="none" opacity=".75">
              <path d="M 250 585 q 12 -10 24 0" />
              <path d="M 290 610 q 12 -10 24 0" />
              <path d="M 330 640 q 12 -10 24 0" />
              <path d="M 265 640 q 12 -10 24 0" />
              <path d="M 310 675 q 12 -10 24 0" />
              <path d="M 360 660 q 12 -10 24 0" />
              <path d="M 350 700 q 12 -10 24 0" />
              <path d="M 395 690 q 12 -10 24 0" />
              <path d="M 300 570 q 12 -10 24 0" />
            </g>
            <text className="map-geo" x="290" y="730">
              Grand Erg Oriental
            </text>

            {/* context cities */}
            <g fill="#7a6a52">
              <circle cx="320" cy="34" r="2.5" />
              <text className="map-geo" x="328" y="38">
                Bizerte
              </text>
              <circle cx="424" cy="290" r="2.5" />
              <text className="map-geo" x="398" y="304">
                Sfax
              </text>
              <text className="map-geo" x="470" y="465">
                Djerba
              </text>
            </g>

            {/* outbound route */}
            <path
              className="route-path"
              filter="url(#rough2)"
              d="M 382 64 C 372 74, 362 76, 352 80
                 C 316 92, 276 100, 252 112
                 C 268 100, 320 78, 360 72
                 C 396 66, 428 54, 452 50
                 C 448 74, 436 96, 420 116
                 C 396 150, 350 200, 310 250
                 C 270 300, 200 340, 138 380
                 C 150 400, 180 440, 210 480
                 C 228 504, 244 520, 254 528"
            />
            {/* return route (lighter) */}
            <path
              className="route-path route-return"
              filter="url(#rough2)"
              d="M 262 524 C 300 480, 330 420, 344 360
                 C 358 300, 366 200, 368 120
                 C 369 100, 370 84, 371 76"
            />

            {/* stops */}
            {stops.map((s) => (
              <g
                key={s.day}
                className="map-stop"
                tabIndex={0}
                role="button"
                aria-label={`Day ${s.day + 1} — ${s.label}. Open passport.`}
                onClick={() => setSelectedDay(s.day)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedDay(s.day);
                  }
                }}
              >
                {s.illus}
                <g className="ring">
                  <circle
                    cx={s.cx}
                    cy={s.cy}
                    r={s.muted ? 9 : 11}
                    fill={PAPER}
                    stroke={s.muted ? "#7a6a52" : "#b8442c"}
                    strokeWidth={s.muted ? 1.8 : 2}
                    strokeDasharray="2.5 2.5"
                  />
                  <text
                    x={s.cx}
                    y={s.cy + 4}
                    textAnchor="middle"
                    fontFamily="var(--font-inter)"
                    fontSize={s.muted ? 9 : 10}
                    fontWeight={600}
                    fill={s.muted ? "#7a6a52" : "#b8442c"}
                  >
                    {s.day + 1}
                  </text>
                </g>
                <g className="tag">
                  <text className="map-label" x={s.tag.x} y={s.tag.y} textAnchor={s.tag.anchor}>
                    DAY {String(s.day + 1).padStart(2, "0")}
                  </text>
                  <text className="map-sub" x={s.tag.x} y={s.tag.y + 15} textAnchor={s.tag.anchor}>
                    {s.label}
                  </text>
                </g>
              </g>
            ))}

            {/* compass */}
            <g filter="url(#rough2)" transform="translate(64,620)">
              <circle r="26" fill="none" stroke="#4a3b2a" strokeWidth="1.3" />
              <path d="M 0 -22 L 5 6 L 0 0 L -5 6 Z" fill="#b8442c" />
              <text x="0" y="-32" textAnchor="middle" fontFamily="var(--font-cormorant)" fontStyle="italic" fontSize="15" fill="#4a3b2a">
                N
              </text>
            </g>
            {/* scale */}
            <g transform="translate(46,700)" stroke="#4a3b2a" strokeWidth="1.2">
              <line x1="0" y1="0" x2="90" y2="0" />
              <line x1="0" y1="-4" x2="0" y2="4" />
              <line x1="45" y1="-3" x2="45" y2="3" />
              <line x1="90" y1="-4" x2="90" y2="4" />
              <text x="45" y="17" textAnchor="middle" fontFamily="var(--font-cormorant)" fontStyle="italic" fontSize="12" fill="#4a3b2a" stroke="none">
                100 km
              </text>
            </g>
          </svg>
        </motion.div>

        {/* Legend under the frame (mobile-friendly index) */}
        <div className="mx-auto mt-16 flex max-w-[720px] flex-wrap justify-center gap-x-5 gap-y-2">
          {days.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(i)}
              className="font-sans text-[10.5px] uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-brick"
            >
              <span className="text-brick">{d.day}</span> · {d.title}
            </button>
          ))}
        </div>
      </div>

      <PassportOverlay openDay={selectedDay} onClose={() => setSelectedDay(null)} />
    </section>
  );
}
