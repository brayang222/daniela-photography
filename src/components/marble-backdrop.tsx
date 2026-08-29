import Image from "next/image";

// Textura tomada del portafolio anterior (danizuluaga.my.canva.site): mármol
// azul marino en las esquinas. Se usa como fondo completo de sección a baja
// opacidad, nunca en Proyectos, que conserva su propia paleta.
export function MarbleBackdrop({ opacity = 12 }: { opacity?: number }) {
  return (
    <Image
      src="/marble.png"
      alt=""
      fill
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 object-cover"
      style={{ opacity: opacity / 100 }}
    />
  );
}
