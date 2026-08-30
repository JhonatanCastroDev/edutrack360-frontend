/**
 * Plantilla raíz de la aplicación.
 *
 * Next.js envuelve con este componente todas las páginas, así que es el lugar
 * donde se definen una sola vez el idioma del documento, los metadatos que
 * lee el navegador y las fuentes tipográficas.
 *
 * El atributo lang="es" no es decorativo: le indica al navegador y a los
 * lectores de pantalla que el contenido está en español.
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduTrack360",
  description: "Plataforma de gestión educativa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
