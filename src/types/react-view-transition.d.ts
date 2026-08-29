// @types/react no cubre `ViewTransition` todavía, aunque el runtime de
// React que usa el App Router (vendorizado por Next) sí lo implementa.
// Ver la guía: node_modules/next/dist/docs/01-app/02-guides/view-transitions.md
declare module "react" {
  type ViewTransitionClassName = string | "none" | "auto" | Record<string, string>;

  interface ViewTransitionProps {
    name?: string;
    default?: ViewTransitionClassName;
    enter?: ViewTransitionClassName;
    exit?: ViewTransitionClassName;
    share?: ViewTransitionClassName;
    update?: ViewTransitionClassName;
    children?: ReactNode;
  }

  export function ViewTransition(props: ViewTransitionProps): ReactElement;
}

export {};
