import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { CustomCursor } from "@/components/custom-cursor";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Daniela Photography",
    template: "%s · Daniela Photography",
  },
  description: "Portafolio de Daniela Zuluaga, fotógrafa en Medellín.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={archivo.variable}>
      <body>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
