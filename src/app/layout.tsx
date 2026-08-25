import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Habita — Anuncios de vivienda, venta y renta de cuartos",
  description:
    "Publica y encuentra casas, apartamentos y cuartos en renta o venta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-500">
            Habita — plataforma de anuncios de vivienda. Venta, renta y
            renta de cuartos.
          </div>
        </footer>
      </body>
    </html>
  );
}
