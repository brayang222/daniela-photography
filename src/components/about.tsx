import Image from "next/image";

const STATS = [
  { value: "8+", label: "Años" },
  { value: "200+", label: "Proyectos" },
  { value: "12", label: "Publicaciones" },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[32px] font-black tracking-[-0.03em]">{value}</div>
      <div className="mt-[5px] text-[10px] tracking-[0.18em] text-ink/42 uppercase">
        {label}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="bg-paper px-12 py-26">
      <div className="border-t-2 border-ink pt-16">
        <div className="grid items-start gap-[clamp(48px,6vw,96px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          {/* pendiente: reemplazar por una foto real de Daniela para esta sección */}
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1554151228-14d9def656e4?w=700&h=900&fit=crop&q=80"
              alt="Daniela Zuluaga"
              width={700}
              height={900}
              className="h-[clamp(400px,60vh,700px)] w-full object-cover grayscale"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-6 py-5">
              <div className="text-[10px] tracking-[0.2em] text-white/60 uppercase">
                Daniela Zuluaga — Bogotá, Colombia
              </div>
            </div>
          </div>

          <div className="pt-1">
            <div className="mb-5 text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
              Sobre Mí
            </div>
            <h2 className="mb-7 text-[clamp(30px,3.8vw,60px)] leading-[1.05] font-black tracking-[-0.025em] text-ink uppercase">
              Capturando
              <br />
              Momentos
              <br />
              Que Perduran
            </h2>
            <div className="mb-7 h-0.5 w-10 bg-accent" />
            <p className="mb-[18px] max-w-[460px] text-base leading-[1.78] text-pretty">
              Daniela Zuluaga es una fotógrafa colombiana radicada en Bogotá,
              especializada en retrato, editorial y fotografía documental. Su
              trabajo explora la identidad, la cultura y la conexión humana.
            </p>
            <p className="max-w-[460px] text-[15px] leading-[1.78] text-ink/52 text-pretty">
              Con más de 8 años de trayectoria, ha colaborado con
              publicaciones y marcas líderes en Latinoamérica y Europa,
              aportando un lenguaje visual propio a cada proyecto.
            </p>
            <div className="mt-13 flex gap-10 border-t border-ink/11 pt-8">
              {STATS.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
