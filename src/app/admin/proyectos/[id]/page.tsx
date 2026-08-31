import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { getAdminProject } from "@/lib/admin/projects";
import type { ProjectPhoto } from "@/lib/projects";

export default async function EditProjectPage(props: PageProps<"/admin/proyectos/[id]">) {
  const { id } = await props.params;
  const project = await getAdminProject(id);
  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-black tracking-[-0.01em] uppercase">{project.title}</h1>
      <ProjectForm
        project={{
          id: project.id,
          title: project.title,
          category: project.category,
          year: project.year,
          concept: project.concept ?? "",
          description: project.description,
          role: project.role,
          tools: project.tools,
          coverSrc: project.coverSrc,
          gallery: project.gallery as unknown as ProjectPhoto[],
        }}
      />
    </div>
  );
}
