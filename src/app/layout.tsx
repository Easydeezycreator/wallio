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
          <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-bold text-neutral-800">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-dark text-white text-xs">
                H
              </span>
              Habita
            </div>
            <p className="text-sm text-neutral-500 text-center sm:text-right">
              Plataforma de anuncios de vivienda — venta, renta y renta de
              cuartos.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
