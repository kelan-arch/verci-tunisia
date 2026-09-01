"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function InstagramEmbed() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cracking the stone scrolls here and kicks off the film — with sound if
  // the browser lets us, muted otherwise.
  useEffect(() => {
    // Browsers only allow unmuted playback after a real user gesture, and
    // Safari additionally requires play() to have been called during one.
    // So on the first tap/click anywhere we silently "prime" the video
    // (play + pause while muted), which blesses it for unmuted play later.
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
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = 0;
      v.muted = false;
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    };
    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("stone-cracked", onCrack);
    return () => {
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("stone-cracked", onCrack);
    };
  }, []);

  return (
    <section ref={ref} id="ig-video" className="flex min-h-[calc(100dvh/0.9+10rem)] flex-col justify-center bg-paper py-8">
      <div className="mx-auto w-[min(560px,90vw)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center"
        >
          <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.5em] text-ink-soft/50">
            Last retreat
          </p>
          <h2 className="mb-5 font-serif text-[clamp(1.4rem,2.6vw,1.9rem)] italic text-ink">
            Austrian Alps, Winter 2025
          </h2>
          <div className="relative w-[min(880px,94vw)] overflow-hidden rounded-sm">
            <video
              ref={videoRef}
              src="/videos/verci-austria.mp4"
              className="w-full"
              muted
              loop
              playsInline
              controls
              preload="auto"
            />
          </div>

          <p className="mt-8 font-serif text-[clamp(0.9rem,1.3vw,1.1rem)] italic leading-[1.6] text-ink-soft">
            Thirty of us, one hotel, five days.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
