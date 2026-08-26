"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";

export default function DeleteListingButton({
  listingId,
  locale,
}: {
  listingId: string;
  locale: Locale;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(t(locale, "button.deleteConfirm"))) {
      return;
    }
    setLoading(true);
    await fetch(`/api/listings/${listingId}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-60"
    >
      {loading ? t(locale, "button.deleting") : t(locale, "button.delete")}
    </button>
  );
}
