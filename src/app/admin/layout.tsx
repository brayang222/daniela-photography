import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { signOut } from "@/auth";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="min-h-dvh bg-night text-paper">
      <header className="flex items-center justify-between border-b border-paper/15 px-8 py-5">
        <Link href="/admin" className="text-[13px] font-bold tracking-[0.1em] uppercase">
          Panel · Daniela Photography
        </Link>
        <div className="flex items-center gap-6 text-[12px] text-paper/60">
          <span>{session.user.email}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button type="submit" className="uppercase tracking-[0.08em] hover:text-paper">
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>
      <main className="px-8 py-10">{children}</main>
    </div>
  );
}
