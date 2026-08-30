import type { SVGProps } from "react";

/**
 * Iconos buscados con la extensión "Yes Icon" (VS Code) y embebidos como
 * paths: sin dependencia en runtime ni peticiones a una CDN.
 *
 * Para añadir uno: busca con Yes Icon, copia el `body` del icono (o del json
 * de @iconify-json/<set> en node_modules) y agrega la entrada aquí.
 */
const PATHS = {
  close:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/>',
  prev: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 18l-6-6l6-6"/>',
  next: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18l6-6l-6-6"/>',
} as const satisfies Record<string, string>;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 20,
  ...props
}: { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  const d = PATHS[name];

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
