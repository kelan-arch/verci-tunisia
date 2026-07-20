"use client";

import { useState, useRef, useCallback, forwardRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";

const days = [
  { day: "01", title: "Sidi Bou Sa\u00efd", subtitle: "Arrival", stamp: "TUNIS-CARTHAGE", date: "19 OCT 2026", code: "TUN", description: "White walls, blue doors, bougainvillea, and the sea below. A first unstructured walk \u2014 no agenda. Welcome dinner at Dar Zarrouk.", image: "/images/tunisia-034.jpg" },
  { day: "02", title: "Medina of Tunis", subtitle: "UNESCO Heritage", stamp: "TUNIS MEDINA", date: "20 OCT 2026", code: "TUN", description: "A thousand years of continuous habitation. Workshops in copper engraving, Arabic calligraphy, embroidery, wood sculpture, and mosaic.", image: "/images/tunisia-088.jpg" },
  { day: "03", title: "Maya\u2019s Olive Groves", subtitle: "The Countryside", stamp: "NORTHERN TUNISIA", date: "21 OCT 2026", code: "NTN", description: "A family private estate where the renowned olive oil Ayla is produced. An intimate morning through the groves.", image: "/images/tunisia-042.jpg" },
  { day: "04", title: "A Day at Sea", subtitle: "Cap Bon", stamp: "CAP BON", date: "22 OCT 2026", code: "MED", description: "Catamaran along the Cap Bon coastline. The sea is still warm in October, the light is clear, and the crowds are long gone.", image: "/images/tunisia-030.jpg" },
  { day: "05", title: "Mountain Oases", subtitle: "Tozeur", stamp: "TOZEUR / NEFTA", date: "23 OCT 2026", code: "TOZ", description: "Chebika, Mides \u2014 springs, waterfalls, deep canyons. Late afternoon at Mos Espa, the Star Wars set still standing.", image: "/images/tunisia-048.jpg" },
  { day: "06", title: "Night with the Nomads", subtitle: "Sahara Desert", stamp: "GRAND ERG ORIENTAL", date: "24 OCT 2026", code: "SAH", description: "No network, no noise, nothing but dunes to the horizon. Dinner around a fire. Night under the open sky. Just silence and stars.", image: "/images/tunisia-076.jpg" },
  { day: "07", title: "Farewell", subtitle: "Back to Tunis", stamp: "D\u00c9PART", date: "25 OCT 2026", code: "TUN", description: "Sunrise in the desert. Breakfast at camp. A last moment in the dunes. Private transfer north for a final meal together.", image: "/images/tunisia-072.jpg" },
];

const PAGE_BG = "#f0ebe1";

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  function Page({ children }, ref) {
    return (
      <div ref={ref} className="page-solid relative h-full overflow-hidden rounded-[8px]" style={{ background: PAGE_BG }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='35' font-family='serif' font-size='10' fill='%23000' text-anchor='middle' opacity='0.5'%3EV%3C/text%3E%3C/svg%3E")`, backgroundSize: "45px 45px" }} />
        {children}
      </div>
    );
  }
);

const PhotoPage = forwardRef<HTMLDivElement, { day: (typeof days)[number]; idx: number }>(
  function PhotoPage({ day, idx }, ref) {
    return (
      <Page ref={ref}>
        <div className="flex h-full flex-col p-4 md:p-5">
          <div className="relative flex-1 overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
            <Image src={day.image} alt={day.title} fill className="object-cover" sizes="300px" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-sans text-[5px] uppercase tracking-[0.3em] md:text-[6px]" style={{ color: "rgba(0,0,0,0.18)" }}>Day {day.day}</p>
            <p className="font-sans text-[5px] uppercase tracking-[0.2em] md:text-[6px]" style={{ color: "rgba(0,0,0,0.13)" }}>{day.date}</p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="rotate-[-4deg] rounded-[1px] border-[1.5px] px-2 py-0.5 text-center" style={{ borderColor: "rgba(180,50,50,0.3)" }}>
              <p className="font-sans text-[4px] font-bold uppercase tracking-[0.2em] md:text-[5px]" style={{ color: "rgba(180,50,50,0.45)" }}>{day.stamp}</p>
              <p className="font-sans text-[6px] font-bold tracking-wider md:text-[7px]" style={{ color: "rgba(180,50,50,0.4)" }}>{day.date}</p>
            </div>
            <div className="flex h-8 w-8 rotate-[10deg] flex-col items-center justify-center rounded-full border-[1.5px] border-dashed md:h-9 md:w-9" style={{ borderColor: "rgba(30,70,130,0.25)" }}>
              <span className="font-sans text-[3px] font-bold uppercase tracking-[0.15em] md:text-[4px]" style={{ color: "rgba(30,70,130,0.35)" }}>{day.code}</span>
              <span className="font-serif text-[7px] md:text-[8px]" style={{ color: "rgba(30,70,130,0.3)" }}>{day.day}</span>
            </div>
          </div>
        </div>
      </Page>
    );
  }
);

const InfoPage = forwardRef<HTMLDivElement, { day: (typeof days)[number]; idx: number }>(
  function InfoPage({ day, idx }, ref) {
    return (
      <Page ref={ref}>
        <div className="flex h-full flex-col p-4 md:p-5">
          <div className="mb-2 border-b pb-1.5" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
            <p className="font-sans text-[5px] uppercase tracking-[0.5em] md:text-[6px]" style={{ color: "rgba(0,0,0,0.18)" }}>Day {day.day} &mdash; {day.subtitle}</p>
          </div>
          <h3 className="font-serif text-base md:text-lg" style={{ color: "rgba(20,18,14,0.85)" }}>{day.title}</h3>
          <div className="mt-1.5 h-px w-6" style={{ background: "rgba(0,0,0,0.06)" }} />
          <p className="mt-1.5 flex-1 font-sans text-[9px] leading-[1.8] md:text-[10px] md:leading-[1.9]" style={{ color: "rgba(20,18,14,0.4)" }}>{day.description}</p>
          <div className="mt-2 border-t pt-1.5" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
            <p className="font-mono text-[4px] leading-relaxed tracking-[0.05em] md:text-[5px]" style={{ color: "rgba(0,0,0,0.08)" }}>
              P&lt;TUN/VERCI&lt;&lt;WQ&lt;&lt;{day.code}&lt;&lt;DAY{day.day}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
              L898902C36TUN2610196&lt;&lt;&lt;&lt;&lt;&lt;&lt;04
            </p>
          </div>
        </div>
      </Page>
    );
  }
);

export default function Itinerary() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<any>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const onFlip = useCallback((e: any) => setCurrentPage(e.data), []);
  const currentDay = Math.floor(currentPage / 2);

  return (
    <section className="py-32 md:py-48">

      <div className="relative px-8 md:px-[8vw]">
        <div ref={headerRef} className="mb-16 md:mb-20">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="mb-4 font-sans text-[10px] tracking-[0.6em] uppercase text-sand/50">7 Days Across Tunisia</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, delay: 0.2 }} className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.03em] text-white">
            The<br /><span className="italic text-sand/60">Itinerary</span>
          </motion.h2>
        </div>
      </div>

      <div className="relative flex flex-col items-center px-4 md:px-[6vw]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ===== CLOSED PASSPORT — portrait ===== */
            <motion.div
              key="closed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ rotateY: -120, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ perspective: "800px", transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="relative cursor-pointer overflow-hidden rounded-[8px]"
                style={{
                  width: "min(280px, 75vw)",
                  height: "min(380px, calc(75vw * 1.36))",
                  background: "linear-gradient(160deg, #1a2744 0%, #0f1b33 40%, #0a1428 100%)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.5), 3px 0 6px rgba(0,0,0,0.2)",
                  transformOrigin: "left center",
                }}
                whileHover={{ rotateY: -8, scale: 1.01 }}
                onClick={() => setIsOpen(true)}
              >
                {/* Leather texture */}
                <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23ffffff' fill-opacity='0.03'/%3E%3C/svg%3E")` }} />
                {/* Spine */}
                <div className="absolute bottom-0 left-0 top-0 w-[5px]" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.3), transparent)" }} />
                {/* Page edges */}
                <div className="absolute bottom-4 right-[2px] top-4 w-[3px]" style={{ background: "linear-gradient(90deg, rgba(230,225,215,0.35), rgba(230,225,215,0.15))" }} />

                <div className="flex h-full flex-col items-center justify-between py-10">
                  <p className="font-sans text-[6px] font-semibold tracking-[0.5em] uppercase" style={{ color: "#b8974a" }}>Verci &times; WanderQuest</p>
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border" style={{ borderColor: "rgba(184,151,74,0.3)" }}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border" style={{ borderColor: "rgba(184,151,74,0.15)" }}>
                        <span style={{ color: "#b8974a", fontSize: "18px" }}>&#9733;</span>
                      </div>
                    </div>
                    <p className="font-sans text-[13px] font-semibold tracking-[0.35em] uppercase" style={{ color: "#b8974a" }}>Passport</p>
                    <p className="font-sans text-[5px] tracking-[0.4em] uppercase" style={{ color: "rgba(184,151,74,0.4)" }}>Tunisia &bull; Oct 2026</p>
                  </div>
                  <p className="font-sans text-[5px] tracking-[0.3em] uppercase" style={{ color: "rgba(184,151,74,0.2)" }}>Click to open</p>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* ===== OPEN BOOK ===== */
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="relative" style={{ width: "min(560px, 92vw)", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}>
                {/* Spine */}
                <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 z-50 -translate-x-1/2" style={{ width: "3px" }}>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)" }} />
                </div>

                {/* @ts-ignore */}
                <HTMLFlipBook
                  ref={bookRef}
                  width={280}
                  height={380}
                  size="stretch"
                  minWidth={200}
                  maxWidth={350}
                  minHeight={280}
                  maxHeight={480}
                  showCover={false}
                  mobileScrollSupport={true}
                  onFlip={onFlip}
                  className=""
                  style={{}}
                  maxShadowOpacity={0.3}
                  drawShadow={true}
                  flippingTime={800}
                  usePortrait={false}
                  startPage={0}
                  autoSize={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={30}
                  showPageCorners={true}
                  disableFlipByClick={false}
                  startZIndex={0}
                  renderOnlyPageLengthChange={false}
                >
                  {days.flatMap((day, i) => [
                    <PhotoPage key={`photo-${i}`} day={day} idx={i} />,
                    <InfoPage key={`info-${i}`} day={day} idx={i} />,
                  ])}
                </HTMLFlipBook>
              </div>

              {/* Nav */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-1">
                {days.map((d, i) => (
                  <button key={d.day} onClick={() => bookRef.current?.pageFlip()?.turnToPage(i * 2)} className="px-1.5 py-1 font-sans text-[9px] tracking-[0.15em] transition-all duration-300" style={{ color: i === currentDay ? "rgba(196,167,125,0.8)" : "rgba(196,167,125,0.2)" }}>
                    {d.day}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-center gap-3">
                <button onClick={() => bookRef.current?.pageFlip()?.flipPrev()} className="flex h-6 w-6 items-center justify-center border" style={{ borderColor: "rgba(196,167,125,0.15)", color: "rgba(196,167,125,0.4)" }}>
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                </button>
                <span className="min-w-[50px] text-center font-sans text-[8px] tracking-[0.2em] uppercase text-white/20">Day {days[Math.min(currentDay, 6)]?.day}</span>
                <button onClick={() => bookRef.current?.pageFlip()?.flipNext()} className="flex h-6 w-6 items-center justify-center border" style={{ borderColor: "rgba(196,167,125,0.15)", color: "rgba(196,167,125,0.4)" }}>
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </button>
              </div>
              <button onClick={() => setIsOpen(false)} className="mt-3 font-sans text-[7px] uppercase tracking-[0.3em]" style={{ color: "rgba(196,167,125,0.25)" }}>Close</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
