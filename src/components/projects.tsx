import Image from "next/image";
import type { CSSProperties } from "react";

const PLACEHOLDER_SRCS = [
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=550&fit=crop&q=80",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&h=340&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=550&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551292831-023188e78222?w=400&h=550&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=520&h=350&fit=crop&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=420&h=280&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=360&h=500&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=550&fit=crop&q=80",
];

// pendientes: fotos reales del portafolio — hoy son placeholders de Unsplash,
// tal como venían en el diseño original.
const PROJECT_DEFS = [
  { title: "PORTRAIT SERIES", year: "2024", rot: -1.5, w: 218, h: 298 },
  { title: "URBAN LANDSCAPES", year: "2024", rot: 1.0, w: 316, h: 210 },
  { title: "EDITORIAL", year: "2023", rot: -0.5, w: 196, h: 286 },
  { title: "DOCUMENTARY", year: "2023", rot: 2.0, w: 210, h: 286 },
  { title: "FINE ART", year: "2022", rot: -1.0, w: 236, h: 316 },
  { title: "ARCHITECTURE", year: "2024", rot: 0.5, w: 306, h: 200 },
];

const PROJECT_TRACK = [...PROJECT_DEFS, ...PROJECT_DEFS].map((project, i) => ({
  ...project,
  src: PLACEHOLDER_SRCS[i % PLACEHOLDER_SRCS.length],
}));

function ProjectCard({
  title,
  year,
  rot,
  w,
  h,
  src,
}: (typeof PROJECT_TRACK)[number]) {
  return (
    <div className="z-2 flex flex-col items-center px-[22px]">
      <div
        className="flex flex-col items-center [transform-origin:top_center] [transform:rotate(var(--rot))]"
        style={{ "--rot": `${rot}deg` } as CSSProperties}
      >
        <div className="relative z-1 -mb-0.5 bg-paper px-2.5 py-1 text-[10px] font-bold tracking-[0.13em] whitespace-nowrap text-ink">
          {title}
        </div>
        <div className="h-4 w-[9px] shrink-0 bg-paper" />
        <div className="overflow-hidden border-2 border-paper" style={{ width: w }}>
          <Image
            src={src}
            alt={title}
            width={w}
            height={h}
            className="block object-cover grayscale"
          />
        </div>
      </div>
      <div className="mt-3.5 text-[10px] tracking-[0.18em] text-paper/28 uppercase">
        {year}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="overflow-hidden bg-night py-22 pb-[110px]">
      <div className="mb-18 flex items-end justify-between px-12">
        <div>
          <div className="mb-3.5 text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            Trabajo Seleccionado
          </div>
          <div className="text-[clamp(40px,5.5vw,88px)] leading-none font-black tracking-[-0.025em] text-paper uppercase">
            Proyectos
          </div>
        </div>
        <div className="text-right text-[10px] leading-[2.4] tracking-[0.2em] text-paper/28 uppercase">
          <div>06 Series</div>
          <div>2022–2025</div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 top-5 z-1 h-0.5 bg-paper/18" />
        <div className="flex w-max animate-projects-scroll items-start">
          {PROJECT_TRACK.map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
