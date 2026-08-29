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

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-night">
      <Link
        href="/#work"
        className="absolute top-8 left-8 z-10 text-[13px] tracking-[0.1em] text-paper/80 uppercase"
      >
        ← Volver
      </Link>

      <ViewTransition name={`project-${project.slug}`}>
        <Image
          src={project.src}
          alt={project.title}
          fill
          priority
          className="object-cover grayscale"
        />
      </ViewTransition>

      <div className="absolute inset-x-8 bottom-8 z-10 flex items-end justify-between text-paper">
        <h1 className="text-[13px] font-bold tracking-[0.13em] uppercase">
          {project.title}
        </h1>
        <span className="text-[11px] tracking-[0.18em] text-paper/50 uppercase">
          {project.year}
        </span>
      </div>
    </main>
  );
}
