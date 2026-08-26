"use client";

import { useTransition } from "react";
import { setLocale } from "@/lib/actions";
import type { Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale || isPending) return;
    startTransition(() => {
      setLocale(next);
    });
  }

  return (
    <div className="flex items-center rounded-full border border-neutral-300 p-0.5 text-xs font-semibold">
      <button
        type="button"
        onClick={() => switchTo("es")}
        className={`rounded-full px-2 py-1 transition-colors ${
          locale === "es"
            ? "bg-brand text-white"
            : "text-neutral-500 hover:text-neutral-800"
        }`}
        aria-pressed={locale === "es"}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`rounded-full px-2 py-1 transition-colors ${
          locale === "en"
            ? "bg-brand text-white"
            : "text-neutral-500 hover:text-neutral-800"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
