"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function loginAction(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    // signIn usa un redirect interno para llevarte a redirectTo cuando el
    // login sí funciona — ese throw especial de Next.js no es un error real
    // y hay que dejarlo pasar, o el usuario nunca sale de esta página.
    if (error instanceof AuthError) {
      return "Correo o contraseña incorrectos.";
    }
    throw error;
  }
}
