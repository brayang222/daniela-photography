"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import type { ProjectPhoto } from "@/lib/projects";

export function ProjectGallery({
  title,
  photos,
}: {
  title: string;
  photos: ProjectPhoto[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, close, next, prev]);

  return (
    <>
      <section className="columns-2 gap-4 px-12 pb-24 md:columns-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden border border-paper/10"
          >
            <Image
              src={photo.src}
              alt={`${title} ${i + 1}`}
              width={photo.w}
              height={photo.h}
              className="block w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </button>
        ))}
      </section>

      {openIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex animate-fade-up items-center justify-center bg-night/96 p-6 [animation-duration:250ms]"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}, foto ${openIndex + 1} de ${photos.length}`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute top-6 right-6 text-paper/70 transition-colors hover:text-paper"
          >
            <Icon name="close" size={26} />
          </button>

          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Foto anterior"
                className="absolute left-4 text-paper/70 transition-colors hover:text-paper md:left-8"
              >
                <Icon name="prev" size={32} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Foto siguiente"
                className="absolute right-4 text-paper/70 transition-colors hover:text-paper md:right-8"
              >
                <Icon name="next" size={32} />
              </button>
            </>
          ) : null}

          <div
            className="relative max-h-[85vh] max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[openIndex].src}
              alt={`${title} ${openIndex + 1}`}
              width={photos[openIndex].w}
              height={photos[openIndex].h}
              className="block max-h-[85vh] w-auto object-contain"
            />
          </div>

          <div className="absolute bottom-6 text-[12px] tracking-[0.14em] text-paper/50 uppercase">
            {openIndex + 1} / {photos.length}
          </div>
        </div>
      ) : null}
    </>
  );
}
