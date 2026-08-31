import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    { url: SITE_URL, priority: 1 },
    ...projects.map((project) => ({
      url: `${SITE_URL}/proyectos/${project.slug}`,
      priority: 0.8,
    })),
  ];
}
