"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FEATURED_DAYS, FEATURED_PRICE_EUR } from "@/lib/constants";
import { t, type Locale } from "@/lib/i18n";

export default function FeatureListingButton({
  listingId,
  locale,
}: {
  listingId: string;
  locale: Locale;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleActivate() {
    setLoading(true);
    await fetch(`/api/listings/${listingId}/feature`, { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  const description = t(locale, "feature.description")
    .replace("{days}", String(FEATURED_DAYS))
    .replace("{price}", String(FEATURED_PRICE_EUR));

  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
      <p className="font-semibold text-amber-900">{t(locale, "feature.title")}</p>
      <p className="mt-1 text-sm text-amber-800">{description}</p>
      <button
        onClick={handleActivate}
        disabled={loading}
        className="mt-3 rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
      >
        {loading ? t(locale, "feature.activating") : t(locale, "feature.activate")}
      </button>
      <p className="mt-2 text-xs text-amber-700">{t(locale, "feature.note")}</p>
    </div>
  );
}
