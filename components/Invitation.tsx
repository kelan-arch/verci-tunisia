"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

const STONE_MASK = {
  WebkitMaskImage: "url(/images/brand/stone-mark.png)",
  maskImage: "url(/images/brand/stone-mark.png)",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const;

/* Jagged energy arcs around the stone rim (viewBox 0 0 540 675).
   Each flashes independently; frequency params drive the flicker. */
const BOLTS = [
  { d: "M452 300 l24 -10 -8 16 26 -6 -10 18 20 -4", f1: 7.3, f2: 11.9, p: 0 },
  { d: "M92 356 l-22 -8 10 14 -26 -2 12 16 -18 2", f1: 6.1, f2: 13.7, p: 2.1 },
  { d: "M382 128 l14 -20 4 16 20 -14 -2 18 16 -8", f1: 8.7, f2: 10.3, p: 4.4 },
  { d: "M158 152 l-16 -18 -2 16 -22 -10 6 18 -14 4", f1: 5.7, f2: 12.9, p: 1.2 },
  { d: "M414 552 l20 14 -12 4 24 16 -16 2 12 12", f1: 7.9, f2: 9.7, p: 3.3 },
  { d: "M138 532 l-18 12 12 6 -20 14 16 4 -8 12", f1: 6.7, f2: 14.3, p: 5.2 },
];

/* Jagged crack line splitting the stone in two (shared points so the
   halves fit back together seamlessly). */
const LEFT_CLIP =
  "polygon(0% 0%, 52% 0%, 46% 14%, 55% 30%, 47% 46%, 56% 62%, 46% 78%, 53% 90%, 49% 100%, 0% 100%)";
const RIGHT_CLIP =
  "polygon(52% 0%, 100% 0%, 100% 100%, 49% 100%, 53% 90%, 46% 78%, 56% 62%, 47% 46%, 55% 30%, 46% 14%)";

type Phase = "idle" | "split" | "cinema" | "reforming";

export default function Invitation() {
  // Pointer-driven tilt: the stone leans toward the cursor as if suspended.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), {
    stiffness: 110,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), {
    stiffness: 110,
    damping: 16,
  });
  // Hovering the stone charges it up: over ~3s the light and shake ramp
  // from a calm breath to full surge, then hold. Releasing discharges.
  const hovering = useRef(false);
  const charge = useRef(0);
  // Haptics (touch only): Android via navigator.vibrate; iOS via the
  // Safari 17.4+ hack — programmatically toggling a hidden switch-style
  // checkbox fires a native haptic tick. Undocumented, may break.
  const touchCharging = useRef(false);
  const lastHaptic = useRef(0);
  const switchRef = useRef<HTMLInputElement>(null);
  const hapticTick = (strength: number) => {
    if ("vibrate" in navigator && typeof navigator.vibrate === "function") {
      navigator.vibrate(Math.round(8 + 32 * strength));
    } else {
      switchRef.current?.click();
    }
  };
  const bloomOpacity = useMotionValue(0.55);
  const bloomScale = useMotionValue(1);
  const raysOpacity = useMotionValue(0.45);
  const raysScale = useMotionValue(0.6);
  const coreOpacity = useMotionValue(0.35);
  const coreScale = useMotionValue(1.03);
  const floatY = useMotionValue(0);
  const shakeX = useMotionValue(0);
  const shakeRot = useMotionValue(0);
  const bolt0 = useMotionValue(0);
  const bolt1 = useMotionValue(0);
  const bolt2 = useMotionValue(0);
  const bolt3 = useMotionValue(0);
  const bolt4 = useMotionValue(0);
  const bolt5 = useMotionValue(0);
  const boltOps = [bolt0, bolt1, bolt2, bolt3, bolt4, bolt5];

  // Climax state machine: idle (chargeable) → split (energy discharged,
  // halves apart) → reforming (halves drifting back) → idle.
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const power = useRef(1); // 1 = energized, 0 = discharged (post-split)
  // Contour glow lives on the stone wrapper so it dies with the power
  const glowA = useMotionValue(0.5);
  const glowB = useMotionValue(0.35);
  const glowFilter = useMotionTemplate`drop-shadow(0 0 22px rgba(255,246,205,${glowA})) drop-shadow(0 0 60px rgba(255,240,185,${glowB})) drop-shadow(0 18px 30px rgba(60,50,35,0.22))`;

  const closeCinema = () => {
    phaseRef.current = "reforming";
    setPhase("reforming");
  };

  // Cinema: lock scroll, close on Escape
  useEffect(() => {
    if (phase !== "cinema") return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCinema();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [phase]);

  useAnimationFrame((t, dt) => {
    // Power snaps toward 0 the instant the stone splits, back to 1 on reform
    const targetPower = phaseRef.current === "idle" ? 1 : 0;
    const p = (power.current +=
      (targetPower - power.current) * Math.min(1, dt / 160));

    const step =
      hovering.current && phaseRef.current === "idle" ? dt / 3000 : -dt / 700;
    const c = (charge.current = Math.min(1, Math.max(0, charge.current + step)));

    // Climax: fully charged → the stone splits, the energy discharges,
    // then the site dims and the film reveals itself.
    if (c >= 1 && phaseRef.current === "idle") {
      phaseRef.current = "split";
      setPhase("split");
      charge.current = 0;
      // Haptic burst at the climax
      if (touchCharging.current) {
        if ("vibrate" in navigator && typeof navigator.vibrate === "function") {
          navigator.vibrate([70, 40, 90]);
        } else {
          let n = 0;
          const id = window.setInterval(() => {
            switchRef.current?.click();
            if (++n >= 5) window.clearInterval(id);
          }, 55);
        }
      }
      window.setTimeout(() => {
        phaseRef.current = "cinema";
        setPhase("cinema");
      }, 500);
    }

    // Haptic ramp while charging by touch: ticks speed up with charge
    if (
      touchCharging.current &&
      hovering.current &&
      phaseRef.current === "idle" &&
      c > 0.04
    ) {
      const interval = 300 - 240 * c;
      if (t - lastHaptic.current > interval) {
        lastHaptic.current = t;
        hapticTick(c);
      }
    }

    const ts = t / 1000;
    // Idle breathing (fades out as charge grows)
    const breath = Math.sin((ts * 2 * Math.PI) / 5.5) * (1 - c);
    // Flicker: two out-of-phase sines whose speed and amplitude grow with charge
    const flick =
      c *
      (Math.sin(ts * (12 + 30 * c)) * 0.5 +
        Math.sin(ts * (19 + 46 * c) + 1.7) * 0.5);

    bloomOpacity.set(p * (0.55 + 0.15 * breath + 0.35 * c + 0.18 * flick));
    bloomScale.set(1 + 0.03 * breath + 0.26 * c + 0.06 * flick);
    // Rays pulsate in place — the throb gets faster and deeper with charge —
    // and stretch outward from short at rest to long at full charge.
    const pulse = Math.sin(ts * (2.2 + 7 * c));
    raysOpacity.set(p * (0.45 + 0.1 * breath + 0.4 * c + pulse * (0.07 + 0.2 * c)));
    raysScale.set(0.6 + 0.02 * breath + 0.44 * c + pulse * (0.025 + 0.1 * c));
    coreOpacity.set(p * (0.35 + 0.12 * breath + 0.55 * c + 0.2 * flick));
    coreScale.set(1.03 + 0.02 * breath + 0.18 * c + 0.05 * flick);
    glowA.set(p * (0.5 + 0.5 * c));
    glowB.set(p * (0.35 + 0.45 * c));

    // Electricity: each arc flashes when its interference wave crests.
    // Charge lowers the threshold (more frequent) and raises brightness.
    BOLTS.forEach((b, i) => {
      const wave = Math.sin(ts * b.f1 + b.p) + Math.sin(ts * b.f2 + b.p * 2);
      const threshold = 1.72 - 1.05 * c;
      boltOps[i].set(wave > threshold ? p * (0.25 + 0.7 * c) : 0);
    });

    // Levitation gives way to an increasingly violent shake (quadratic ramp)
    floatY.set(Math.sin((ts * 2 * Math.PI) / 6) * -7 * (1 - c) * p);
    const violence = c * c * p;
    shakeX.set(Math.sin(ts * 42 * (0.5 + c)) * 3.6 * violence);
    shakeRot.set(Math.sin(ts * 33 * (0.5 + c) + 1) * 1.1 * violence);
  });

  return (
    <header
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative flex min-h-[calc(100svh/0.9)] flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #aebfc9 0%, #c3cbc6 34%, #ddd6bd 62%, #e8dfc4 100%)",
      }}
    >
      <div className="halftone" />

      <div className="relative z-[2] flex flex-1 flex-col items-center px-6 pt-[clamp(2rem,5vh,4rem)]">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="text-center font-sans text-[11px] uppercase tracking-[0.38em] text-[#f4efdf]"
          style={{ textShadow: "0 1px 8px rgba(60,70,80,0.25)" }}
        >
          wanderquest × verci nyc — a private quest
        </motion.p>
        <h1 className="sr-only">Verci in Tunisia — October 19 to 26, 2026</h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="relative my-auto w-[clamp(260px,46vw,500px)] py-4"
          style={{ perspective: 900 }}
        >
          {/* Big soft bloom so the whole thing reads as glowing light */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[175%] w-[175%] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="h-full w-full rounded-full"
              style={{
                opacity: bloomOpacity,
                scale: bloomScale,
                background:
                  "radial-gradient(circle, rgba(255,251,235,0.95) 0%, rgba(255,244,205,0.55) 32%, rgba(255,240,195,0) 62%)",
                mixBlendMode: "screen",
              }}
            />
          </div>
          {/* Rays of light fanning out from behind the stone — a static
              sunburst (repeating conic gradient) that pulsates, fading out
              radially. Screen blend keeps it pure light on the pale sky. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[210%] w-[210%] -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="h-full w-full"
              style={{ opacity: raysOpacity, scale: raysScale, mixBlendMode: "screen" }}
            >
              <div
                className="h-full w-full rounded-full"
                style={{
                  background:
                    "repeating-conic-gradient(from 0deg, rgba(255,252,238,0.95) 0deg 4deg, rgba(255,252,238,0) 7deg 15deg)",
                  WebkitMaskImage:
                    "radial-gradient(circle, #000 10%, rgba(0,0,0,0.55) 36%, transparent 66%)",
                  maskImage:
                    "radial-gradient(circle, #000 10%, rgba(0,0,0,0.55) 36%, transparent 66%)",
                  filter: "blur(3px)",
                }}
              />
            </motion.div>
          </div>
          {/* Hot core right behind the rock so the beams have a source */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-[1]"
            style={{
              ...STONE_MASK,
              opacity: coreOpacity,
              scale: coreScale,
              background: "#fff6df",
              mixBlendMode: "screen",
              filter: "blur(18px)",
            }}
          />
          {/* Levitation at rest → growing energy shake as charge builds;
              pointer tilt. At full charge the stone splits along a jagged
              crack: two clipped halves fly apart, then drift back together. */}
          <motion.div
            onHoverStart={() => (hovering.current = true)}
            onHoverEnd={() => (hovering.current = false)}
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse") {
                touchCharging.current = true;
                hovering.current = true;
              }
            }}
            onPointerUp={() => {
              if (touchCharging.current) {
                touchCharging.current = false;
                hovering.current = false;
              }
            }}
            onPointerCancel={() => {
              if (touchCharging.current) {
                touchCharging.current = false;
                hovering.current = false;
              }
            }}
            onContextMenu={(e) => e.preventDefault()}
            className="select-none"
            style={{
              rotateX,
              rotateY,
              x: shakeX,
              y: floatY,
              rotate: shakeRot,
              filter: glowFilter,
              touchAction: "none",
              WebkitTouchCallout: "none",
            }}
          >
            <motion.div
              animate={
                phase === "split" || phase === "cinema"
                  ? { x: -46, y: 12, rotate: -8 }
                  : { x: 0, y: 0, rotate: 0 }
              }
              transition={
                phase === "split" || phase === "cinema"
                  ? { type: "spring", stiffness: 320, damping: 15 }
                  : { type: "spring", stiffness: 70, damping: 16 }
              }
              onAnimationComplete={() => {
                if (phaseRef.current === "reforming") {
                  phaseRef.current = "idle";
                  setPhase("idle");
                }
              }}
              style={{ clipPath: LEFT_CLIP }}
            >
              <Image
                src="/images/brand/stone-mark.png"
                alt="Verci Tunisia — hand-carved calligraphy mark"
                width={540}
                height={675}
                priority
                draggable={false}
                className="w-full"
                style={{ filter: "sepia(0.28) saturate(0.9) contrast(1.04)" }}
              />
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              animate={
                phase === "split" || phase === "cinema"
                  ? { x: 46, y: 5, rotate: 7 }
                  : { x: 0, y: 0, rotate: 0 }
              }
              transition={
                phase === "split" || phase === "cinema"
                  ? { type: "spring", stiffness: 320, damping: 15 }
                  : { type: "spring", stiffness: 70, damping: 16 }
              }
              style={{ clipPath: RIGHT_CLIP }}
            >
              <Image
                src="/images/brand/stone-mark.png"
                alt=""
                width={540}
                height={675}
                priority
                draggable={false}
                className="w-full"
                style={{ filter: "sepia(0.28) saturate(0.9) contrast(1.04)" }}
              />
            </motion.div>
          </motion.div>

          {/* Crackling energy arcs around the rim */}
          <svg
            aria-hidden="true"
            viewBox="0 0 540 675"
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
            style={{ filter: "drop-shadow(0 0 5px rgba(190,220,255,0.95))" }}
          >
            {BOLTS.map((b, i) => (
              <motion.path
                key={i}
                d={b.d}
                fill="none"
                stroke="#eaf4ff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: boltOps[i] }}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Photo fades in from transparent over the header gradient — no
          color-matched overlay, so there is no seam to see. */}
      <div
        className="relative -mt-[clamp(60px,10vh,120px)] h-[clamp(240px,40vh,440px)]"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.8) 58%, #000 78%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.8) 58%, #000 78%)",
        }}
      >
        <Image
          src="/images/tunisia-076.jpg"
          alt="Questers on the dunes of the Sahara"
          fill
          priority
          className="object-cover object-[center_62%]"
          style={{ filter: "sepia(0.32) saturate(0.92) contrast(0.98) brightness(1.04)" }}
        />
      </div>

      <motion.span
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-3.5 left-1/2 z-[3] -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.3em] text-[#fdf8ea]"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
      >
        Begin the journey ↓
      </motion.span>

      {/* iOS haptic hack: Safari 17.4+ fires a native haptic tick when a
          switch-style checkbox toggles — even programmatically. Hidden
          visually (not display:none, which suppresses the haptic). */}
      <input
        ref={switchRef}
        type="checkbox"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        {...{ switch: "" }}
      />

      {/* Cinema — the site dims and the film reveals itself.
          Swap the placeholder <div> for a <video> when the film is ready. */}
      <AnimatePresence>
        {phase === "cinema" && (
          <motion.div
            key="cinema"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            onClick={closeCinema}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(8,9,12,0.93)] px-4 backdrop-blur-[4px]"
          >
            <button
              onClick={closeCinema}
              className="absolute right-5 top-5 font-sans text-[10px] uppercase tracking-[0.26em] text-sand transition-opacity hover:opacity-70"
            >
              ✕ &nbsp;Close
            </button>
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.2, 0.8, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-[min(880px,94vw)]"
            >
              <div
                className="flex aspect-video w-full flex-col items-center justify-center gap-5 bg-black"
                style={{ border: "1px solid rgba(196,167,125,0.35)" }}
              >
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(196,167,125,0.5)]"
                >
                  <span className="ml-1 text-[1.2rem] text-sand">▶</span>
                </motion.div>
                <p className="font-serif text-[clamp(1.1rem,2.4vw,1.5rem)] italic text-sand">
                  The film — coming soon
                </p>
                <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[rgba(196,167,125,0.55)]">
                  You broke the stone. You&rsquo;ve earned a first look.
                </p>
              </div>
              <div className="mt-3 flex items-baseline justify-between font-serif text-[0.9rem] italic text-[rgba(196,167,125,0.7)]">
                <span>VERCI in Tunisia — the film</span>
                <span>October 2026</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
