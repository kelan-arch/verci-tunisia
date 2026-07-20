export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-8 py-16 md:px-[8vw]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between">
        {/* Logos / names */}
        <div className="flex items-center gap-6">
          <span className="font-sans text-sm tracking-[0.2em] uppercase text-white/30">
            Verci
          </span>
          <span className="text-white/15">&times;</span>
          <span className="font-sans text-sm tracking-[0.2em] uppercase text-white/30">
            WanderQuest
          </span>
        </div>

        {/* Contact */}
        <div className="text-center md:text-right">
          <p className="font-sans text-xs text-white/20">
            Questions? Reach out at{" "}
            <a
              href="mailto:ami@verci.com"
              className="text-sand/40 transition-colors hover:text-sand/70"
            >
              ami@verci.com
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl text-center">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/10">
          &copy; 2026 Verci. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
