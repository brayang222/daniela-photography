import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage(props: PageProps<"/proyectos/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const nextProject = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];

  return (
    <main className="bg-night">
      <section className="relative h-dvh overflow-hidden">
        <Link
          href="/#work"
          className="absolute top-8 left-8 z-10 text-[13px] tracking-[0.1em] text-paper/80 uppercase"
        >
          ← Volver
        </Link>

        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <Image
            src={project.cover.src}
            alt={project.title}
            fill
            priority
            className="object-cover grayscale"
          />
        </ViewTransition>

        <div className="absolute inset-0 bg-linear-to-t from-night via-night/10 to-transparent" />

        <div className="absolute inset-x-8 bottom-10 z-10 flex animate-fade-up items-end justify-between text-paper [animation-delay:200ms]">
          <div>
            <div className="mb-2 text-[11px] tracking-[0.2em] text-accent uppercase">
              {project.category}
            </div>
            <h1 className="text-[clamp(32px,5.5vw,80px)] leading-none font-black tracking-[-0.02em] uppercase">
              {project.title}
            </h1>
          </div>
          <span className="text-[11px] tracking-[0.18em] text-paper/50 uppercase">
            {project.year}
          </span>
        </div>
      </section>

      <section className="animate-fade-up px-12 py-20 [animation-delay:300ms]">
        <div className="grid gap-16 [grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr))]">
          <div>
            {project.concept ? (
              <div className="mb-6 text-[11px] tracking-[0.2em] text-accent uppercase">
                {project.concept}
              </div>
            ) : null}
            <p className="max-w-[62ch] text-[17px] leading-[1.8] text-paper/80">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <div className="mb-4 text-[11px] tracking-[0.2em] text-paper/40 uppercase">
                Mi rol
              </div>
              <ul className="flex flex-col gap-2">
                {project.role.map((task) => (
                  <li key={task} className="text-[14px] text-paper/75">
                    {task}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[11px] tracking-[0.2em] text-paper/40 uppercase">
                Herramientas
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border border-paper/20 px-3 py-1 text-[12px] tracking-[0.04em] text-paper/70"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="columns-2 gap-4 px-12 pb-24 md:columns-3">
        {project.gallery.map((photo, i) => (
          <div
            key={photo.src}
            className="mb-4 break-inside-avoid overflow-hidden border border-paper/10"
          >
            <Image
              src={photo.src}
              alt={`${project.title} ${i + 1}`}
              width={photo.w}
              height={photo.h}
              className="block w-full object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
            />
          </div>
        ))}
      </section>

      <Link
        href={`/proyectos/${nextProject.slug}`}
        className="group flex items-center justify-between border-t border-paper/18 px-12 py-10"
      >
        <span className="text-[11px] tracking-[0.2em] text-paper/40 uppercase">
          Siguiente proyecto
        </span>
        <span className="text-[15px] font-bold tracking-[0.04em] text-paper uppercase transition-opacity group-hover:opacity-60">
          {nextProject.title} →
        </span>
      </Link>
    </main>
  );
}
