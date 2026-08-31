import Image from "next/image";
import Link from "next/link";
import { getAdminProjects } from "@/lib/admin/projects";

export default async function AdminDashboard() {
  const projects = await getAdminProjects();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[24px] font-black tracking-[-0.01em] uppercase">Proyectos</h1>
        <Link
          href="/admin/proyectos/nuevo"
          className="bg-accent px-4 py-2.5 text-[13px] font-bold tracking-[0.06em] text-paper uppercase transition-opacity hover:opacity-85"
        >
          + Nuevo proyecto
        </Link>
      </div>
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/admin/proyectos/${project.id}`}
            className="group border border-paper/15 p-3 transition-colors hover:border-accent"
          >
            <div className="mb-3 aspect-[3/4] overflow-hidden bg-night">
              <Image
                src={project.coverSrc}
                alt={project.title}
                width={300}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="text-[13px] font-bold tracking-[0.04em] uppercase">{project.title}</div>
            <div className="mt-1 text-[11px] text-paper/50">{project.category}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
