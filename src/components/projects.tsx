import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ViewTransition } from "react";
import { Skyline } from "@/components/skyline";
import { getProjects, type Project, type ProjectPhoto } from "@/lib/projects";

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

// Con solo un puñado de proyectos, una sola vuelta se ve corta — cada uno
// aparece dos veces en el carrusel, siempre con la misma foto principal
// (nunca una "segunda foto" inventada): es el mismo proyecto ocupando más
// espacio, no dos proyectos distintos.
function buildTrack(projects: Project[]): TrackItem[] {
  const round: TrackItem[] = projects.map((project) => ({
    key: `${project.slug}-a`,
    slug: project.slug,
    title: project.title,
    year: project.year,
    rot: project.rot,
    photo: project.cover,
    shareTransition: true,
  }));
  // Se duplica el recorrido completo para el loop infinito: ninguna copia del
  // segundo giro comparte `name` de ViewTransition (ya lo hizo el primero).
  return [
    ...round,
    ...round.map((item, i) => ({ ...item, key: `loop-${i}`, shareTransition: false })),
  ];
}

function ProjectCard({ item }: { item: TrackItem }) {
  const width = cardWidth(item.photo);
  const photo = (
    <Image
      src={item.photo.src}
      alt={item.title}
      width={item.photo.w}
      height={item.photo.h}
      className="block object-cover transition-transform duration-500 group-hover:scale-105"
      style={{ width, height: CARD_HEIGHT }}
    />
  );

  return (
    <Link
      href={`/proyectos/${item.slug}`}
      transitionTypes={["nav-forward"]}
      data-cursor="Ver"
      className="group z-2 flex cursor-none flex-col items-center px-[22px]"
    >
      <div
        className="flex flex-col items-center [transform-origin:top_center] [transform:rotate(var(--rot))]"
        style={{ "--rot": `${item.rot}deg` } as CSSProperties}
      >
        <div className="relative z-1 -mb-0.5 bg-paper px-3 py-1.5 text-[11px] font-bold tracking-[0.13em] whitespace-nowrap text-ink">
          {item.title}
        </div>
        <div className="h-4 w-[9px] shrink-0 bg-paper" />
        <div className="border-3 border-paper p-1.5">
          <div className="overflow-hidden border border-accent" style={{ width }}>
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
      <div className="mt-3.5 text-[10px] tracking-[0.18em] text-paper/50 uppercase">
        {item.year}
      </div>
    </Link>
  );
}

export async function Projects() {
  const projects = await getProjects();
  const track = buildTrack(projects);

  return (
    <section id="work" className="relative overflow-hidden bg-night py-22 pb-[110px]">
      <Skyline />

      <div className="relative z-2 mb-18 flex flex-col gap-4 px-12 md:flex-row md:items-end md:justify-between md:gap-0">
        <div>
          <div className="mb-3.5 text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            Trabajo Seleccionado
          </div>
          <div className="text-[clamp(40px,5.5vw,88px)] leading-none font-black tracking-[-0.025em] text-paper uppercase">
            Proyectos
          </div>
        </div>
        <div className="text-[10px] leading-[2.4] tracking-[0.2em] text-paper/50 uppercase md:text-right">
          <div>{projects.length} Series</div>
          <div>2024</div>
        </div>
      </div>

      <div className="relative z-2">
        <div className="absolute inset-x-0 top-5 z-1 h-0.5 bg-paper/18" />
        <div className="flex w-max animate-projects-scroll items-start">
          {track.map((item) => (
            <ProjectCard key={item.key} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
