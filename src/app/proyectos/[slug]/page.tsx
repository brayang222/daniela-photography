import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ProjectGallery } from "@/components/project-gallery";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/proyectos/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.cover.src, width: project.cover.w, height: project.cover.h }],
    },
  };
}

export default async function ProjectPage(props: PageProps<"/proyectos/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const nextProject = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];

  const directional = {
    "nav-forward": "nav-forward",
    "nav-back": "nav-back",
    default: "none",
  } as const;

  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      <main className="bg-night">
        <div className="px-8 pt-8 md:px-12">
          <Link
            href="/#work"
            transitionTypes={["nav-back"]}
            className="text-[13px] tracking-[0.1em] text-paper/70 uppercase transition-colors hover:text-paper"
          >
            ← Volver
          </Link>
        </div>

        <section className="flex animate-fade-up flex-col items-center px-6 pt-10 pb-8 md:px-12">
          <div className="mb-3 text-[11px] tracking-[0.2em] text-accent uppercase">
            {project.category}
          </div>
          <h1 className="mb-10 max-w-[20ch] text-center text-[clamp(28px,5vw,64px)] leading-[1.05] font-black tracking-[-0.02em] text-paper uppercase">
            {project.title}
          </h1>

          <div className="border-3 border-paper p-1.5 shadow-2xl">
            <div className="border border-accent">
              <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
                <Image
                  src={project.cover.src}
                  alt={project.title}
                  width={project.cover.w}
                  height={project.cover.h}
                  priority
                  className="block max-h-[58vh] w-auto object-contain md:max-h-[64vh]"
                />
              </ViewTransition>
            </div>
          </div>

          <span className="mt-6 text-[11px] tracking-[0.18em] text-paper/50 uppercase">
            {project.year}
          </span>
        </section>

        <section className="animate-fade-up px-12 pt-6 pb-16 [animation-delay:150ms]">
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
                <div className="mb-4 text-[11px] tracking-[0.2em] text-paper/55 uppercase">
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
                <div className="mb-4 text-[11px] tracking-[0.2em] text-paper/55 uppercase">
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

        <ProjectGallery title={project.title} photos={project.gallery} />

        <Link
          href={`/proyectos/${nextProject.slug}`}
          transitionTypes={["nav-forward"]}
          className="group flex items-center justify-between border-t border-paper/18 px-12 py-10"
        >
          <span className="text-[11px] tracking-[0.2em] text-paper/55 uppercase">
            Siguiente proyecto
          </span>
          <span className="text-[15px] font-bold tracking-[0.04em] text-paper uppercase transition-opacity group-hover:opacity-60">
            {nextProject.title} →
          </span>
        </Link>
      </main>
    </ViewTransition>
  );
}
