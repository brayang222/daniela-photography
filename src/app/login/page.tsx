import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Acceso", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-8 bg-night px-6">
      <span className="text-[13px] font-bold tracking-[0.14em] text-paper uppercase">
        Panel — Daniela Photography
      </span>
      <LoginForm />
    </main>
  );
}
