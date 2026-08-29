import type { SVGProps } from "react";

/**
 * Iconos buscados con la extensión "Yes Icon" (VS Code) y embebidos como
 * paths: sin dependencia en runtime ni peticiones a una CDN.
 *
 * Para añadir uno: busca con Yes Icon, copia el `body` del icono (o del json
 * de @iconify-json/<set> en node_modules) y agrega la entrada aquí.
 */
const PATHS = {
  // pendiente: se llena cuando llegue el diseño.
} as const satisfies Record<string, string>;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 20,
  ...props
}: { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  const d: string | undefined = PATHS[name];

  if (!d) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      focusable="false"
      {...props}
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}
