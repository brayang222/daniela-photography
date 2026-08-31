"use server";

import { writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import sharp from "sharp";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/auth";
import type { ProjectPhoto } from "@/lib/projects";

const MAX_WIDTH = 2000;
const PROYECTOS_DIR = path.join(process.cwd(), "public", "proyectos");

function revalidateProjectPages(slug?: string) {
  revalidatePath("/");
  if (slug) revalidatePath(`/proyectos/${slug}`);
}

export async function getAdminProjects() {
  await requireAdmin();
  return prisma.project.findMany({ orderBy: { order: "asc" } });
}

export async function getAdminProject(id: string) {
  await requireAdmin();
  return prisma.project.findUnique({ where: { id } });
}

function slugify(text: string): string {
  const stripped = Array.from(text.normalize("NFD"))
    .filter((ch) => ch.codePointAt(0)! < 0x0300 || ch.codePointAt(0)! > 0x036f)
    .join("");
  return stripped
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(base: string): Promise<string> {
  const root = base || "proyecto";
  let slug = root;
  let suffix = 2;
  while (await prisma.project.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${root}-${suffix}`;
    suffix++;
  }
  return slug;
}

// Un proyecto nuevo nace con su primera foto: coverSrc y gallery no admiten
// vacío, así que crear y subir portada son un solo paso, no dos.
export async function createProject(
  data: {
    title: string;
    category: string;
    year: string;
    concept: string;
    description: string;
    role: string[];
    tools: string[];
  },
  coverFile: File,
) {
  await requireAdmin();

  const slug = await uniqueSlug(slugify(data.title));

  const inputBuffer = Buffer.from(await coverFile.arrayBuffer());
  const oriented = sharp(inputBuffer).rotate();
  const metadata = await oriented.metadata();
  const resized =
    metadata.width && metadata.width > MAX_WIDTH ? oriented.resize({ width: MAX_WIDTH }) : oriented;
  const webpBuffer = await resized.webp({ quality: 84 }).toBuffer();
  const finalMeta = await sharp(webpBuffer).metadata();

  const filename = `${slug}-${Date.now()}.webp`;
  await writeFile(path.join(PROYECTOS_DIR, filename), webpBuffer);

  const photo: ProjectPhoto = { src: `/proyectos/${filename}`, w: finalMeta.width ?? 0, h: finalMeta.height ?? 0 };

  const { _max } = await prisma.project.aggregate({ _max: { order: true } });

  const project = await prisma.project.create({
    data: {
      slug,
      title: data.title,
      category: data.category,
      year: data.year,
      concept: data.concept || null,
      description: data.description,
      role: data.role,
      tools: data.tools,
      coverSrc: photo.src,
      gallery: [photo],
      order: (_max.order ?? -1) + 1,
    },
  });

  revalidateProjectPages(slug);
  return project;
}

export async function updateProjectDetails(
  id: string,
  data: {
    title: string;
    category: string;
    year: string;
    concept: string;
    description: string;
    role: string[];
    tools: string[];
  },
) {
  await requireAdmin();
  const project = await prisma.project.update({
    where: { id },
    data: { ...data, concept: data.concept || null },
  });
  revalidateProjectPages(project.slug);
}

// El archivo llega tal cual lo tomó la cámara/celular — se reorienta según
// EXIF, se limita a un ancho razonable para web, y siempre se guarda en
// WebP para que cada foto del sitio pese y se sirva igual, sin importar el
// formato original.
export async function uploadProjectPhoto(projectId: string, file: File, caption: string) {
  await requireAdmin();

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw new Error("Proyecto no encontrado");

  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const oriented = sharp(inputBuffer).rotate();
  const metadata = await oriented.metadata();
  const resized =
    metadata.width && metadata.width > MAX_WIDTH ? oriented.resize({ width: MAX_WIDTH }) : oriented;
  const webpBuffer = await resized.webp({ quality: 84 }).toBuffer();
  const finalMeta = await sharp(webpBuffer).metadata();

  const filename = `${project.slug}-${Date.now()}.webp`;
  await writeFile(path.join(PROYECTOS_DIR, filename), webpBuffer);

  const photo: ProjectPhoto = {
    src: `/proyectos/${filename}`,
    w: finalMeta.width ?? 0,
    h: finalMeta.height ?? 0,
    caption: caption || undefined,
  };

  const gallery = [...(project.gallery as unknown as ProjectPhoto[]), photo];
  const isFirstPhoto = gallery.length === 1;
  await prisma.project.update({
    where: { id: projectId },
    data: { gallery, coverSrc: isFirstPhoto ? photo.src : project.coverSrc },
  });

  revalidateProjectPages(project.slug);
  return photo;
}

export async function setCoverPhoto(projectId: string, src: string) {
  await requireAdmin();
  const project = await prisma.project.update({
    where: { id: projectId },
    data: { coverSrc: src },
  });
  revalidateProjectPages(project.slug);
}

export async function deleteProjectPhoto(projectId: string, src: string) {
  await requireAdmin();
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) throw new Error("Proyecto no encontrado");

  const gallery = (project.gallery as unknown as ProjectPhoto[]).filter((photo) => photo.src !== src);
  if (gallery.length === 0) throw new Error("Un proyecto necesita al menos una foto.");

  const coverSrc = project.coverSrc === src ? gallery[0].src : project.coverSrc;
  await prisma.project.update({ where: { id: projectId }, data: { gallery, coverSrc } });

  // Solo borra del disco las fotos subidas desde el panel — las que llegaron
  // con el proyecto original no tienen por qué desaparecer del filesystem.
  if (src.startsWith("/proyectos/")) {
    await unlink(path.join(process.cwd(), "public", src)).catch(() => {});
  }

  revalidateProjectPages(project.slug);
}
