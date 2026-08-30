// Fallback a localhost en dev; en producción, define NEXT_PUBLIC_SITE_URL
// con el dominio real (Vercel u otro host no lo adivinan por ti).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const INSTAGRAM_URL = "https://instagram.com/danielazuluaga_fotografa";
export const WHATSAPP_URL = "https://wa.me/573003415846";
