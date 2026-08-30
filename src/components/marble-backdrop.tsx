import Image from "next/image";

// Textura tomada del portafolio anterior (danizuluaga.my.canva.site): mármol
// azul marino en las esquinas. Se usa como fondo completo de sección a baja
// opacidad, nunca en Proyectos, que conserva su propia paleta.
export function MarbleBackdrop({
  opacity = 12,
  priority = false,
}: {
  opacity?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/marble.webp"
      alt=""
      fill
      aria-hidden
      priority={priority}
      sizes="100vw"
      className="pointer-events-none absolute inset-0 z-0 object-cover"
      style={{ opacity: opacity / 100 }}
    />
  );
}
