"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  "Last retreat",
  "Austrian Alps, Winter 2025",
  "Thirty of us, one hotel, five days.",
];
const OUTRO_LINES = ["Don’t let this moment slip.", "Join us :)"];
const CHAR_MS = 40;
const LINE_HOLD_MS = 1200; // finished line lingers alone before the next
const BLANK_MS = 350; // empty beat between lines
const HOLD_MS = 900;
const BG = "#f7f2e6";

type Phase = "hidden" | "typing" | "film" | "outro";

export default function CrackReveal() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [line, setLine] = useState(0);
  const [typed, setTyped] = useState(0);
  const [outroDone, setOutroDone] = useState(false);
  const [needsSound, setNeedsSound] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const open = phase !== "hidden";

  // First tap/click anywhere silently primes the video (play+pause while
  // muted) so browsers allow unmuted playback later without a fresh gesture.
  useEffect(() => {
    const prime = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = true;
      v.play()
        .then(() => {
          v.pause();
          v.currentTime = 0;
        })
        .catch(() => {});
    };
    const onCrack = () => {
      setLine(0);
      setTyped(0);
      setOutroDone(false);
      setPhase("typing");
    };
    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("stone-cracked", onCrack);
    return () => {
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("stone-cracked", onCrack);
    };
  }, []);

  // Typewriter: each line types alone, lingers, then clears for the next.
  // Runs for both the intro (into the film) and the outro (after the film).
  useEffect(() => {
    if (phase !== "typing" && phase !== "outro") return;
    const lines = phase === "outro" ? OUTRO_LINES : LINES;
    let li = 0;
    let ci = 0;
    let t: number;
    const tick = () => {
      ci += 1;
      setTyped(ci);
      if (ci < lines[li].length) {
        t = window.setTimeout(tick, CHAR_MS);
        return;
      }
      // Line finished — hold it, then either blank into the next or finish
      if (li < lines.length - 1) {
        t = window.setTimeout(() => {
          li += 1;
          ci = 0;
          setLine(li);
          setTyped(0);
          t = window.setTimeout(tick, BLANK_MS);
        }, LINE_HOLD_MS);
      } else if (phase === "typing") {
        t = window.setTimeout(() => setPhase("film"), LINE_HOLD_MS + HOLD_MS);
      } else {
        // Outro: the last line stays put; surface the Apply button and ✕.
        t = window.setTimeout(() => setOutroDone(true), 500);
      }
    };
    t = window.setTimeout(tick, 200);
    return () => window.clearTimeout(t);
  }, [phase]);

  // Film phase: play with sound, muted fallback if the browser refuses.
  useEffect(() => {
    if (phase !== "film") return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.play()
      .then(() => setNeedsSound(false))
      .catch(() => {
        // Autoplay-with-sound blocked (user never clicked) — play muted and
        // surface a one-click unmute chip.
        v.muted = true;
        v.play().catch(() => {});
        setNeedsSound(true);
      });
  }, [phase]);

  // Scroll lock + Escape while open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    videoRef.current?.pause();
    setNeedsSound(false);
    setOutroDone(false);
    setPhase("hidden");
  };

  const startOutro = () => {
    videoRef.current?.pause();
    setLine(0);
    setTyped(0);
    setOutroDone(false);
    setPhase("outro");
  };

  const unmute = () => {
    const v = videoRef.current;
    if (!v) return;
    // Chrome pauses an autoplay-muted video when it's unmuted; the pause
    // lands asynchronously, so retry play() a couple of beats after the
    // click (the click grants sticky activation, so unmuted play is legal).
    v.muted = false;
    v.play().catch(() => {});
    for (const ms of [60, 250]) {
      window.setTimeout(() => {
        if (v.paused && !v.ended) v.play().catch(() => {});
      }, ms);
    }
    setNeedsSound(false);
  };

  const lineStyle =
    "font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-[1.2] text-ink";

  return (
    <>
      {/* Whiteout + typewriter */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="whiteout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            transition={{ duration: 0.3 }}
            onClick={() => phase === "typing" && setPhase("film")}
            className="fixed inset-0 z-[300] flex items-center justify-center"
            style={{ background: BG }}
          >
            <motion.div
              animate={{ opacity: phase === "film" ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="px-6 text-center"
            >
              <p className={`min-h-[1.3em] ${lineStyle}`}>
                {(phase === "outro" ? OUTRO_LINES : LINES)[line].slice(0, typed)}
                <Cursor />
              </p>
              {phase === "outro" && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={outroDone ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7 }}
                  className={`mt-10 ${outroDone ? "" : "pointer-events-none"}`}
                >
                  <a
                    href="https://airtable.com/appfHYP1FsRGQoYeT/pagwo4elSg0CbGMOb/form"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-[3px] bg-brick px-8 py-4 font-sans text-[11px] uppercase tracking-[0.3em] text-[#f6efdd] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#99351f]"
                  >
                    Apply
                  </a>
                </motion.div>
              )}
            </motion.div>
            {phase === "outro" && outroDone && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className="absolute right-5 top-5 rounded bg-[rgba(20,18,14,0.75)] px-4 py-2.5 font-sans text-[10px] uppercase tracking-[0.26em] text-[#f0e7d3] transition-colors hover:bg-[rgba(20,18,14,0.9)]"
              >
                ✕ &nbsp;Close
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen film — always mounted so the priming trick works */}
      <div
        className={`fixed inset-0 z-[301] flex items-center justify-center transition-opacity duration-700 ${
          phase === "film" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ background: BG }}
        aria-hidden={phase !== "film"}
      >
        <video
          ref={videoRef}
          src="/videos/verci-austria.mp4"
          className="h-full w-full object-contain"
          playsInline
          controls
          preload="metadata"
          onEnded={startOutro}
        />
        <button
          onClick={startOutro}
          className="absolute right-5 top-5 rounded bg-[rgba(20,18,14,0.75)] px-4 py-2.5 font-sans text-[10px] uppercase tracking-[0.26em] text-[#f0e7d3] transition-colors hover:bg-[rgba(20,18,14,0.9)]"
        >
          Skip &nbsp;→
        </button>
        {needsSound && phase === "film" && (
          <button
            onClick={unmute}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-[rgba(20,18,14,0.78)] px-5 py-3 font-sans text-[11px] uppercase tracking-[0.26em] text-[#f0e7d3] shadow-[0_8px_28px_rgba(0,0,0,0.4)] transition-colors hover:bg-[rgba(20,18,14,0.92)]"
          >
            🔊 &nbsp;Click for sound
          </button>
        )}
      </div>
    </>
  );
}

function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      className="ml-0.5 inline-block w-[0.55em] translate-y-[0.08em] bg-brick"
      style={{ height: "1em" }}
    />
  );
}
