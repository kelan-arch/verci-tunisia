"use client";

import { useCallback, useEffect, useRef, useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { days, type ItineraryDay } from "@/lib/itinerary";

const PAGE_BG = "#f0ebe1";

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  function Page({ children }, ref) {
    return (
      <div
        ref={ref}
        className="page-solid relative overflow-hidden"
        style={{ background: PAGE_BG, width: "100%", height: "100%", borderRadius: 8 }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='35' font-family='serif' font-size='10' fill='%23000' text-anchor='middle' opacity='0.5'%3EV%3C/text%3E%3C/svg%3E")`,
            backgroundSize: "45px 45px",
          }}
        />
        {children}
      </div>
    );
  }
);

const PhotoPage = forwardRef<HTMLDivElement, { day: ItineraryDay }>(
  function PhotoPage({ day }, ref) {
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
            <div className="rotate-[-4deg] rounded-[1px] border-[1.5px] px-2 py-0.5 text-center" style={{ borderColor: "rgba(184,68,44,0.3)" }}>
              <p className="font-sans text-[4px] font-bold uppercase tracking-[0.2em] md:text-[5px]" style={{ color: "rgba(184,68,44,0.45)" }}>{day.stamp}</p>
              <p className="font-sans text-[6px] font-bold tracking-wider md:text-[7px]" style={{ color: "rgba(184,68,44,0.4)" }}>{day.date}</p>
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

const InfoPage = forwardRef<HTMLDivElement, { day: ItineraryDay }>(
  function InfoPage({ day }, ref) {
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

type FlipBookApi = {
  pageFlip: () =>
    | {
        flipNext: () => void;
        flipPrev: () => void;
        turnToPage: (page: number) => void;
      }
    | undefined;
};

export default function PassportOverlay({
  openDay,
  onClose,
}: {
  /** Day index (0-based) to open at, or null when closed. */
  openDay: number | null;
  onClose: () => void;
}) {
  const bookRef = useRef<FlipBookApi>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const onFlip = useCallback((e: { data: number }) => setCurrentPage(e.data), []);
  const isOpen = openDay !== null;
  const currentDay = Math.min(Math.floor(currentPage / 2), days.length - 1);

  // Sync page state when opened at a new day (adjust-state-during-render pattern).
  const [lastOpenDay, setLastOpenDay] = useState(openDay);
  if (openDay !== lastOpenDay) {
    setLastOpenDay(openDay);
    if (openDay !== null) setCurrentPage(openDay * 2);
  }

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") bookRef.current?.pageFlip()?.flipPrev();
      if (e.key === "ArrowRight") bookRef.current?.pageFlip()?.flipNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, openDay, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-[rgba(13,17,23,0.55)] backdrop-blur-[3px]"
          />
          <motion.div
            key="sheet"
            initial={{ y: "110%", x: "-50%" }}
            animate={{ y: 0, x: "-50%" }}
            exit={{ y: "110%", x: "-50%" }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.25, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Itinerary passport"
            className="fixed bottom-0 left-1/2 z-[201] w-[min(700px,96vw)] pb-[max(env(safe-area-inset-bottom),14px)]"
          >
            <button
              onClick={onClose}
              className="absolute -top-11 right-0 rounded-t bg-paper px-4 py-2.5 font-sans text-[10px] uppercase tracking-[0.26em] text-ink"
            >
              ✕ &nbsp;Close passport
            </button>

            {/* Passport cover wraps the book */}
            <div
              className="rounded-2xl p-2.5 pb-2"
              style={{
                background: "var(--color-passport)",
                boxShadow:
                  "0 -18px 60px rgba(0,0,0,0.45), inset 0 0 0 1.5px rgba(196,167,125,0.55)",
              }}
            >
              <div className="relative overflow-hidden rounded-[10px]">
                <HTMLFlipBook
                  key={openDay}
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
                  usePortrait={true}
                  startPage={(openDay ?? 0) * 2}
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
                    <PhotoPage key={`photo-${i}`} day={day} />,
                    <InfoPage key={`info-${i}`} day={day} />,
                  ])}
                </HTMLFlipBook>
              </div>

              {/* Nav */}
              <div className="flex items-center justify-between px-3 pb-1 pt-2.5">
                <button
                  onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
                  className="rounded-[3px] border border-[rgba(196,167,125,0.4)] px-3.5 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-sand transition-colors hover:bg-[rgba(196,167,125,0.15)]"
                >
                  ← Prev
                </button>
                <div className="flex gap-1">
                  {days.map((d, i) => (
                    <button
                      key={d.day}
                      onClick={() => bookRef.current?.pageFlip()?.turnToPage(i * 2)}
                      className={`px-1.5 py-1 font-sans text-[10px] tracking-[0.15em] text-sand transition-opacity ${
                        i === currentDay ? "opacity-100" : "opacity-50"
                      }`}
                      style={i === currentDay ? { borderBottom: "1px solid var(--color-sand)" } : {}}
                    >
                      {d.day}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => bookRef.current?.pageFlip()?.flipNext()}
                  className="rounded-[3px] border border-[rgba(196,167,125,0.4)] px-3.5 py-2 font-sans text-[10px] uppercase tracking-[0.2em] text-sand transition-colors hover:bg-[rgba(196,167,125,0.15)]"
                >
                  Next →
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
