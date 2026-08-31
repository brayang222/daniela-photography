"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { createProject } from "@/lib/admin/projects";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] tracking-[0.14em] text-paper/60 uppercase">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "border border-paper/25 bg-transparent px-3 py-2 text-[14px] text-paper outline-none focus:border-accent";

export function NewProjectForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleCreate(formData: FormData) {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Selecciona una foto de portada.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const project = await createProject(
        {
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
        },
        file,
      );
      router.push(`/admin/proyectos/${project.id}`);
    });
  }

  return (
    <form action={handleCreate} className="flex max-w-[560px] flex-col gap-5">
      <Field label="Nombre">
        <input name="title" required className={inputClass} />
      </Field>
      <Field label="Categoría">
        <input name="category" required className={inputClass} />
      </Field>
      <div className="flex gap-5">
        <Field label="Año">
          <input name="year" required className={inputClass} />
        </Field>
        <Field label="Concepto (opcional)">
          <input name="concept" className={inputClass} />
        </Field>
      </div>
      <Field label="Descripción">
        <textarea name="description" required rows={4} className={inputClass} />
      </Field>
      <Field label="Mi rol (una línea por ítem)">
        <textarea name="role" rows={5} className={inputClass} />
      </Field>
      <Field label="Herramientas (una línea por ítem)">
        <textarea name="tools" rows={3} className={inputClass} />
      </Field>
      <Field label="Foto de portada">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          required
          className="text-[13px] text-paper/70"
        />
      </Field>

      {error ? <p className="text-[13px] text-accent">{error}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="self-start bg-accent px-4 py-2.5 text-[13px] font-bold tracking-[0.06em] text-paper uppercase transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {isPending ? "Creando…" : "Crear proyecto"}
      </button>
    </form>
  );
}
