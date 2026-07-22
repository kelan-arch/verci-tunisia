export default function Footer() {
  return (
    <footer className="bg-black px-[4vw] py-14 text-[rgba(255,255,255,0.55)]">
      <div className="mx-auto flex w-[min(1120px,92vw)] flex-wrap items-center justify-between gap-8">
        <span className="font-serif text-[1.15rem] italic text-sand">Verci in Tunisia</span>
        <span className="font-sans text-[0.78rem] tracking-[0.08em]">
          wanderquest × VERCI NYC — a private quest · October 2026
        </span>
        <a
          href="mailto:ami@verci.com"
          className="font-sans text-[0.78rem] tracking-[0.08em] text-[rgba(255,255,255,0.8)] transition-colors hover:text-sand"
        >
          ami@verci.com
        </a>
      </div>
    </footer>
  );
}
