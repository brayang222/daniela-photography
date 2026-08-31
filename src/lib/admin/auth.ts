import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// proxy.ts ya bloquea la navegación a /admin sin sesión, pero las Server
// Actions se postean a la ruta donde se renderizó el formulario — si el
// matcher del proxy cambia algún día, una acción sin esta guarda seguiría
// mutando datos sin pedir sesión. Se llama al inicio de cada acción que
// escribe, no solo en las páginas.
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/login");
  return session;
}
