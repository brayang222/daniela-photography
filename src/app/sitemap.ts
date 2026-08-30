import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/proyectos/${project.slug}`,
      priority: 0.8,
    })),
  ];
}
