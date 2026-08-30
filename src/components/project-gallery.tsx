"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);

  const open = useCallback((index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpenIndex(index);
  }, []);

  // Al abrir, el foco entra al diálogo; al cerrar, vuelve a la miniatura
  // que lo abrió — un lector de pantalla o usuario de teclado nunca debe
  // perder de vista dónde quedó parado.
  useEffect(() => {
    if (openIndex === null) {
      triggerRef.current?.focus();
      return;
    }
    dialogRef.current?.focus();
  }, [openIndex]);

  // Sin esto, la página de fondo sigue scrolleando detrás del overlay
  // fijo y el usuario aterriza en otra posición al cerrar el modal.
  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, close, next, prev]);

  return (
    <>
      <section className="columns-2 gap-4 px-12 pb-24 md:columns-3">
        {photos.map((photo, i) => (
          <div key={photo.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={(event) => open(i, event.currentTarget)}
              data-cursor="Ampliar"
              className="block w-full cursor-none overflow-hidden border border-paper/10"
            >
              <Image
                src={photo.src}
                alt={`${title} ${i + 1}`}
                width={photo.w}
                height={photo.h}
                className="block w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </button>
            {photo.caption ? (
              <p className="mt-2 text-[11px] tracking-[0.04em] text-paper/50">{photo.caption}</p>
            ) : null}
          </div>
        ))}
      </section>

      {openIndex !== null ? (
        <div
          ref={dialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-50 flex animate-fade-up items-center justify-center overflow-hidden p-6 outline-none [animation-duration:250ms]"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}, foto ${openIndex + 1} de ${photos.length}`}
        >
          {/* Fondo atmosférico: capa sólida primero (nunca deja ver la
              página de atrás), la foto atenuada encima solo aporta color.
              Sin filter:blur a propósito — combinado con position:fixed
              rompe el compositing en algunos navegadores (fugas al fondo). */}
          <div className="absolute inset-0 bg-night" />
          <Image
            key={`backdrop-${photos[openIndex].src}`}
            src={photos[openIndex].src}
            alt=""
            fill
            aria-hidden
            sizes="100vw"
            className="object-cover opacity-25"
          />

          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute top-6 right-6 z-10 text-paper/70 transition-colors hover:text-paper"
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
                className="absolute left-4 z-10 text-paper/70 transition-colors hover:text-paper md:left-8"
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
                className="absolute right-4 z-10 text-paper/70 transition-colors hover:text-paper md:right-8"
              >
                <Icon name="next" size={32} />
              </button>
            </>
          ) : null}

          <div
            className="relative z-10 max-h-[92vh] max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={photos[openIndex].src}
              src={photos[openIndex].src}
              alt={`${title} ${openIndex + 1}`}
              width={photos[openIndex].w}
              height={photos[openIndex].h}
              className="block max-h-[92vh] max-w-[92vw] w-auto object-contain shadow-2xl"
            />
          </div>

          <div className="absolute bottom-6 z-10 flex flex-col items-center gap-1.5 text-center">
            {photos[openIndex].caption ? (
              <span className="text-[12px] tracking-[0.04em] text-paper/70">
                {photos[openIndex].caption}
              </span>
            ) : null}
            <span className="text-[12px] tracking-[0.14em] text-paper/50 uppercase">
              {openIndex + 1} / {photos.length}
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}
