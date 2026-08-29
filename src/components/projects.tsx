import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ViewTransition } from "react";
import { PROJECTS, type ProjectPhoto } from "@/lib/projects";

const CARD_HEIGHT = 290;

function cardWidth(photo: ProjectPhoto) {
  return Math.round(CARD_HEIGHT * (photo.w / photo.h));
}

type TrackItem = {
  key: string;
  slug: string;
  title: string;
  year: string;
  rot: number;
  photo: ProjectPhoto;
  shareTransition: boolean;
};

function buildTrack(): TrackItem[] {
  const round: TrackItem[] = PROJECTS.flatMap((project) => {
    const second = project.gallery.find((photo) => photo.src !== project.cover.src) ?? project.cover;
    return [
      {
        key: `${project.slug}-cover`,
        slug: project.slug,
        title: project.title,
        year: project.year,
        rot: project.rot,
        photo: project.cover,
        shareTransition: true,
      },
      {
        key: `${project.slug}-second`,
        slug: project.slug,
        title: project.title,
        year: project.year,
        rot: -project.rot * 0.7,
        photo: second,
        shareTransition: false,
      },
    ];
  });
  // Se duplica el recorrido completo para el loop infinito: ninguna copia del
  // segundo giro comparte `name` de ViewTransition (ya lo hizo el primero).
  return [
    ...round,
    ...round.map((item, i) => ({ ...item, key: `loop-${i}`, shareTransition: false })),
  ];
}

const PROJECT_TRACK = buildTrack();

function ProjectCard({ item }: { item: TrackItem }) {
  const width = cardWidth(item.photo);
  const photo = (
    <Image
      src={item.photo.src}
      alt={item.title}
      width={item.photo.w}
      height={item.photo.h}
      className="block object-cover grayscale"
      style={{ width, height: CARD_HEIGHT }}
    />
  );

  return (
    <Link href={`/proyectos/${item.slug}`} className="z-2 flex flex-col items-center px-[22px]">
      <div
        className="flex flex-col items-center [transform-origin:top_center] [transform:rotate(var(--rot))]"
        style={{ "--rot": `${item.rot}deg` } as CSSProperties}
      >
        <div className="relative z-1 -mb-0.5 bg-paper px-3 py-1.5 text-[11px] font-bold tracking-[0.13em] whitespace-nowrap text-ink">
          {item.title}
        </div>
        <div className="h-4 w-[9px] shrink-0 bg-paper" />
        <div className="border-3 border-paper p-1.5">
          <div className="border border-accent" style={{ width }}>
            {item.shareTransition ? (
              <ViewTransition name={`project-${item.slug}`} share="morph" default="none">
                {photo}
              </ViewTransition>
            ) : (
              photo
            )}
          </div>
        </div>
      </div>
      <div className="mt-3.5 text-[10px] tracking-[0.18em] text-paper/28 uppercase">
        {item.year}
      </div>
    </Link>
  );
}

function Skyline() {
  return (
    <svg
      className="absolute inset-0 z-0 h-full w-full opacity-40"
      viewBox="0 0 1280 500"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <g fill="none" className="stroke-paper" strokeWidth="1.2">
        <ellipse cx="160" cy="60" rx="52" ry="17" />
        <ellipse cx="1040" cy="42" rx="42" ry="14" />
        <ellipse cx="620" cy="26" rx="32" ry="11" />
        <rect x="0" y="230" width="90" height="270" />
        <rect x="90" y="190" width="74" height="310" />
        <rect x="200" y="250" width="104" height="250" />
        <rect x="330" y="160" width="68" height="340" />
        <rect x="430" y="215" width="90" height="285" />
        <rect x="550" y="175" width="60" height="325" />
        <rect x="640" y="245" width="120" height="255" />
        <rect x="790" y="150" width="68" height="350" />
        <rect x="890" y="225" width="98" height="275" />
        <rect x="1020" y="185" width="74" height="315" />
        <rect x="1130" y="240" width="150" height="260" />
        <line x1="0" y1="230" x2="1280" y2="230" />
      </g>
    </svg>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative overflow-hidden bg-night py-22 pb-[110px]">
      <Skyline />

      <div className="relative z-2 mb-18 flex items-end justify-between px-12">
        <div>
          <div className="mb-3.5 text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            Trabajo Seleccionado
          </div>
          <div className="text-[clamp(40px,5.5vw,88px)] leading-none font-black tracking-[-0.025em] text-paper uppercase">
            Proyectos
          </div>
        </div>
        <div className="text-right text-[10px] leading-[2.4] tracking-[0.2em] text-paper/28 uppercase">
          <div>{PROJECTS.length} Series</div>
          <div>2024</div>
        </div>
      </div>

      <div className="relative z-2">
        <div className="absolute inset-x-0 top-5 z-1 h-0.5 bg-paper/18" />
        <div className="flex w-max animate-projects-scroll items-start">
          {PROJECT_TRACK.map((item) => (
            <ProjectCard key={item.key} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
