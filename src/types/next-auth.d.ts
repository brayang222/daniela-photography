import type { DefaultSession } from "next-auth";

type Role = "user" | "admin";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  /** authorize() ya devuelve el rol, así el callback jwt no vuelve a consultarlo. */
  interface User {
    role?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
  }
}
