import Link from "next/link";
import { getSession } from "@/lib/auth";
import { isPlatformOwner } from "@/lib/admin";
import LogoutButton from "./LogoutButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { t, type Locale } from "@/lib/i18n";

export default async function Header({ locale }: { locale: Locale }) {
  const session = await getSession();
  const owner = session ? await isPlatformOwner(session.userId) : false;

  return (
    <header className="border-b border-neutral-200/70 bg-white/80 backdrop-blur-md sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-lg tracking-tight text-neutral-900">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white text-sm shadow-sm">
            H
          </span>
          {t(locale, "nav.brand")}
        </Link>

        <nav className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} />

          <Link
            href="/anuncios/nuevo"
            className="hidden sm:inline-block rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark transition-colors"
          >
            {t(locale, "nav.publish")}
          </Link>

          {session ? (
            <>
              {owner && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-neutral-600 hover:text-brand transition-colors"
                >
                  {t(locale, "nav.admin")}
                </Link>
              )}
              <Link
                href="/mi-cuenta"
                className="text-sm font-medium text-neutral-600 hover:text-brand transition-colors"
              >
                {t(locale, "nav.myAccount")}
              </Link>
              <LogoutButton label={t(locale, "nav.logout")} />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-600 hover:text-brand transition-colors"
              >
                {t(locale, "nav.login")}
              </Link>
              <Link
                href="/registro"
                className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
              >
                {t(locale, "nav.register")}
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="sm:hidden border-t border-neutral-100 px-4 py-2">
        <Link
          href="/anuncios/nuevo"
          className="block text-center rounded-full bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          {t(locale, "nav.publish")}
        </Link>
      </div>
    </header>
  );
}
