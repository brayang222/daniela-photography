import Image from "next/image";
import { MarbleBackdrop } from "@/components/marble-backdrop";

const SPECIALTIES = [
  "Fotografía de Producto",
  "Fotografía Comercial",
  "Fotografía Gastronómica",
  "Dirección de Arte",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-12 py-26">
      <MarbleBackdrop opacity={8} />

      <div className="relative border-t-2 border-ink pt-16">
        <div className="grid items-start gap-[clamp(48px,6vw,96px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          <div className="relative">
            <Image
              src="/daniela-about.webp"
              alt="Daniela Zuluaga"
              width={1066}
              height={1599}
              className="h-[clamp(400px,60vh,700px)] w-full object-cover grayscale"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-6 py-5">
              <div className="text-[10px] tracking-[0.2em] text-white/60 uppercase">
                Daniela Zuluaga — Medellín, Colombia
              </div>
            </div>
          </div>

          <div className="pt-1">
            <div className="mb-5 text-[11px] font-semibold tracking-[0.28em] text-navy uppercase">
              Sobre Mí
            </div>
            <h2 className="mb-7 text-[clamp(30px,3.8vw,60px)] leading-[1.05] font-black tracking-[-0.025em] text-ink uppercase">
              Capturando
              <br />
              Momentos
              <br />
              Que Perduran
            </h2>
            <div className="mb-7 h-0.5 w-10 bg-navy" />
            <p className="mb-[18px] max-w-[460px] text-base leading-[1.78] text-pretty">
              Daniela Zuluaga es estudiante de Producción Fotográfica y
              Tecnología en Diseño Industrial, nacida en Sincelejo y
              radicada en Medellín. Tiene experiencia en fotografía
              comercial, dirección de arte y producción de contenido
              visual para marcas.
            </p>
            <p className="max-w-[460px] text-[15px] leading-[1.78] text-ink/52 text-pretty">
              Le interesa aportar a equipos de marketing y comunicación
              creando contenido visual que fortalezca la identidad de las
              marcas y conecte con su audiencia a través de la fotografía,
              el video y una dirección de arte cuidada.
            </p>
            <div className="mt-13 flex flex-wrap gap-2 border-t border-ink/11 pt-8">
              {SPECIALTIES.map((specialty) => (
                <span
                  key={specialty}
                  className="border border-navy/25 px-3 py-1.5 text-[11px] tracking-[0.04em] text-navy uppercase"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
