import "server-only";
import { prisma } from "@/lib/db";
import type { Project as ProjectRow } from "@/generated/prisma/client";

export type ProjectPhoto = { src: string; w: number; h: number; caption?: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  concept?: string;
  description: string;
  role: string[];
  tools: string[];
  rot: number;
  cover: ProjectPhoto;
  gallery: ProjectPhoto[];
};

// Puramente decorativo (la leve inclinación de cada tarjeta en el
// carrusel) — no vive en la base de datos porque al admin no le interesa
// editarlo, solo se deriva de la posición del proyecto.
const ROTATIONS = [-1.5, 1.0, -0.5, 2.0, -1.0, 1.5];

function toProject(row: ProjectRow, index: number): Project {
  const gallery = row.gallery as unknown as ProjectPhoto[];
  const cover = gallery.find((photo) => photo.src === row.coverSrc) ?? gallery[0];

  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    year: row.year,
    concept: row.concept ?? undefined,
    description: row.description,
    role: row.role,
    tools: row.tools,
    rot: ROTATIONS[index % ROTATIONS.length],
    cover,
    gallery,
  };
}

export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return rows.map(toProject);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const row = await prisma.project.findUnique({ where: { slug } });
  if (!row) return undefined;
  const rows = await prisma.project.findMany({ orderBy: { order: "asc" }, select: { slug: true } });
  const index = rows.findIndex((r) => r.slug === slug);
  return toProject(row, index === -1 ? 0 : index);
}
