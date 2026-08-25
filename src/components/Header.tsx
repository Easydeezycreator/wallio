import Link from "next/link";
import { getSession } from "@/lib/auth";
import { isPlatformOwner } from "@/lib/admin";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const session = await getSession();
  const owner = session ? await isPlatformOwner(session.userId) : false;

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-brand">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white text-sm">
            H
          </span>
          Habita
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/anuncios/nuevo"
            className="hidden sm:inline-block rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Publicar anuncio
          </Link>

          {session ? (
            <>
              {owner && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-neutral-700 hover:text-brand"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/mi-cuenta"
                className="text-sm font-medium text-neutral-700 hover:text-brand"
              >
                Mi cuenta
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-700 hover:text-brand"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                className="text-sm font-medium text-neutral-700 hover:text-brand"
              >
                Crear cuenta
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="sm:hidden border-t border-neutral-100 px-4 py-2">
        <Link
          href="/anuncios/nuevo"
          className="block text-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Publicar anuncio
        </Link>
      </div>
    </header>
  );
}
