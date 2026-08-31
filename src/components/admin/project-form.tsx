"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import {
  deleteProjectPhoto,
  setCoverPhoto,
  updateProjectDetails,
  uploadProjectPhoto,
} from "@/lib/admin/projects";
import type { ProjectPhoto } from "@/lib/projects";

type ProjectData = {
  id: string;
  title: string;
  category: string;
  year: string;
  concept: string;
  description: string;
  role: string[];
  tools: string[];
  coverSrc: string;
  gallery: ProjectPhoto[];
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] tracking-[0.14em] text-paper/60 uppercase">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "border border-paper/25 bg-transparent px-3 py-2 text-[14px] text-paper outline-none focus:border-accent";

export function ProjectForm({ project }: { project: ProjectData }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [uploadCaption, setUploadCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSaveDetails(formData: FormData) {
    startTransition(async () => {
      await updateProjectDetails(project.id, {
        title: String(formData.get("title") ?? ""),
        category: String(formData.get("category") ?? ""),
        year: String(formData.get("year") ?? ""),
        concept: String(formData.get("concept") ?? ""),
        description: String(formData.get("description") ?? ""),
        role: String(formData.get("role") ?? "")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        tools: String(formData.get("tools") ?? "")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
      });
      setSavedMessage("Guardado.");
      router.refresh();
    });
  }

  function handleUpload() {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    startTransition(async () => {
      await uploadProjectPhoto(project.id, file, uploadCaption);
      setUploadCaption("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.refresh();
    });
  }

  function handleSetCover(src: string) {
    startTransition(async () => {
      await setCoverPhoto(project.id, src);
      router.refresh();
    });
  }

  function handleDelete(src: string) {
    if (!confirm("¿Quitar esta foto del proyecto?")) return;
    startTransition(async () => {
      await deleteProjectPhoto(project.id, src);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-12">
      <form
        action={handleSaveDetails}
        className="flex max-w-[560px] flex-col gap-5"
      >
        <Field label="Nombre">
          <input name="title" defaultValue={project.title} required className={inputClass} />
        </Field>
        <Field label="Categoría">
          <input name="category" defaultValue={project.category} required className={inputClass} />
        </Field>
        <div className="flex gap-5">
          <Field label="Año">
            <input name="year" defaultValue={project.year} required className={inputClass} />
          </Field>
          <Field label="Concepto (opcional)">
            <input name="concept" defaultValue={project.concept} className={inputClass} />
          </Field>
        </div>
        <Field label="Descripción">
          <textarea
            name="description"
            defaultValue={project.description}
            required
            rows={4}
            className={inputClass}
          />
        </Field>
        <Field label="Mi rol (una línea por ítem)">
          <textarea
            name="role"
            defaultValue={project.role.join("\n")}
            rows={5}
            className={inputClass}
          />
        </Field>
        <Field label="Herramientas (una línea por ítem)">
          <textarea
            name="tools"
            defaultValue={project.tools.join("\n")}
            rows={3}
            className={inputClass}
          />
        </Field>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="bg-accent px-4 py-2.5 text-[13px] font-bold tracking-[0.06em] text-paper uppercase transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {isPending ? "Guardando…" : "Guardar cambios"}
          </button>
          {savedMessage ? <span className="text-[13px] text-paper/60">{savedMessage}</span> : null}
        </div>
      </form>

      <div>
        <h2 className="mb-4 text-[16px] font-bold uppercase">Galería</h2>
        <div className="mb-6 grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))]">
          {project.gallery.map((photo) => {
            const isCover = photo.src === project.coverSrc;
            return (
              <div key={photo.src} className="flex flex-col gap-2">
                <div
                  className={`aspect-square overflow-hidden border-2 ${isCover ? "border-accent" : "border-paper/15"}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption ?? project.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-[11px] text-paper/50">{photo.caption}</p>
                <div className="flex gap-2 text-[11px]">
                  <button
                    type="button"
                    disabled={isPending || isCover}
                    onClick={() => handleSetCover(photo.src)}
                    className="uppercase tracking-[0.04em] text-paper/70 hover:text-accent disabled:opacity-40"
                  >
                    {isCover ? "Portada" : "Usar como portada"}
                  </button>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDelete(photo.src)}
                    className="uppercase tracking-[0.04em] text-paper/70 hover:text-accent disabled:opacity-40"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex max-w-[420px] flex-col gap-3 border-t border-paper/15 pt-6">
          <Field label="Descripción breve de la nueva foto">
            <input
              value={uploadCaption}
              onChange={(event) => setUploadCaption(event.target.value)}
              className={inputClass}
            />
          </Field>
          <input ref={fileInputRef} type="file" accept="image/*" className="text-[13px] text-paper/70" />
          <button
            type="button"
            disabled={isPending}
            onClick={handleUpload}
            className="self-start bg-paper/10 px-4 py-2 text-[12px] font-bold tracking-[0.06em] text-paper uppercase transition-colors hover:bg-paper/15 disabled:opacity-50"
          >
            {isPending ? "Subiendo…" : "Subir foto"}
          </button>
        </div>
      </div>
    </div>
  );
}
