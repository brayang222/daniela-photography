import Image from "next/image";
import { MarbleBackdrop } from "@/components/marble-backdrop";

const primaryNav = [
  { href: "#about", label: "Historia" },
  { href: "#work", label: "Trabajos" },
  { href: "#contact", label: "Mensaje" },
];

const socialNav = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "TikTok" },
  { href: "#", label: "YouTube" },
];

function NavColumn({ links }: { links: { href: string; label: string }[] }) {
  return (
    <nav className="flex flex-col gap-[3px] text-[13px] text-ink/70">
      {links.map((link) => (
        <a key={link.label} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export function Hero() {
  return (
    <section className="relative h-dvh overflow-hidden bg-white">
      <MarbleBackdrop />

      <header className="absolute inset-x-0 top-0 z-30 flex animate-fade-up items-start justify-between px-12 py-8 [animation-delay:800ms]">
        <a href="#" className="text-[15px] font-bold tracking-[0.02em] text-ink">
          Daniela
        </a>
        <div className="flex items-start gap-[clamp(24px,5vw,64px)]">
          <span className="pt-0.5 text-[13px] text-ink/70">2025</span>
          <NavColumn links={primaryNav} />
          <NavColumn links={socialNav} />
        </div>
      </header>

      {/* Nombre gigante de fondo, en bucle infinito. */}
      <div className="absolute inset-0 z-[5] flex items-center overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="pr-[6vw] text-[15vh] leading-none font-medium tracking-[-0.02em] text-ink/85 md:text-[26vh] md:font-semibold md:text-ink/90"
            >
              Daniela — Zuluaga
            </span>
          ))}
        </div>
      </div>

      <Image
        src="/daniela-portrait.png"
        alt="Retrato de Daniela"
        width={1224}
        height={1285}
        priority
        className="pointer-events-none absolute top-[6%] bottom-0 left-1/2 z-20 h-[79%] w-auto -translate-x-1/2 animate-rise-in object-contain object-bottom [animation-delay:300ms] md:h-[94%]"
      />

      <div className="absolute inset-x-12 bottom-33 z-10 h-px origin-left animate-line-grow bg-ink/20 [animation-delay:1200ms]" />

      <div className="absolute inset-x-12 bottom-10 z-30 flex animate-fade-up justify-between text-[13px] leading-[1.6] text-ink/70 [animation-delay:1400ms]">
        <div>
          <div>Fotógrafa Visual</div>
          <div>Narradora Visual</div>
          <div>Enamorada de la luz natural</div>
        </div>
        <div className="text-right">
          <div>Basada en Medellín</div>
          <div>Portafolio 2025</div>
        </div>
      </div>
    </section>
  );
}
