"use client";

import { useEffect, useState } from "react";

// Sigue al mouse y crece con una etiqueta sobre cualquier elemento marcado
// con data-cursor="Etiqueta". Solo en desktop (pointer: fine) — en touch
// no hay hover real, así que se queda oculto.
export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function onMove(event: MouseEvent) {
      setPos({ x: event.clientX, y: event.clientY });
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    }
    function onLeave() {
      setVisible(false);
    }
    function onEnter() {
      setVisible(true);
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-100 hidden items-center justify-center bg-accent text-[11px] font-bold tracking-[0.08em] text-paper uppercase transition-[width,height,opacity] duration-200 ease-out md:flex"
      style={{
        left: pos.x,
        top: pos.y,
        width: label ? 72 : 0,
        height: label ? 72 : 0,
        opacity: visible && label ? 1 : 0,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {label}
    </div>
  );
}
