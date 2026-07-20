"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ImageBreak({
  src,
  alt,
  text,
}: {
  src: string;
  alt: string;
  text?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className="relative h-[60vh] w-full overflow-hidden md:h-[80vh]">
      <motion.div style={{ y }} className="absolute inset-0 -top-[20%] h-[120%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/30" />
      {text && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="px-8 text-center font-serif text-[clamp(2rem,5vw,4rem)] italic leading-tight text-white/70">
            {text}
          </p>
        </div>
      )}
    </div>
  );
}
