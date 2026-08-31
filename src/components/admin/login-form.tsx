"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/admin/login-action";

export function LoginForm() {
  const [error, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <form action={formAction} className="flex w-full max-w-[360px] flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[11px] tracking-[0.14em] text-paper/60 uppercase">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border border-paper/25 bg-transparent px-3 py-2 text-[15px] text-paper outline-none focus:border-accent"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-[11px] tracking-[0.14em] text-paper/60 uppercase">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="border border-paper/25 bg-transparent px-3 py-2 text-[15px] text-paper outline-none focus:border-accent"
        />
      </div>

      {error ? <p className="text-[13px] text-accent">{error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 bg-accent px-4 py-2.5 text-[13px] font-bold tracking-[0.06em] text-paper uppercase transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
