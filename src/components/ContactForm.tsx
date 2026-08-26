"use client";

import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";

export default function ContactForm({
  listingId,
  locale,
}: {
  listingId: string;
  locale: Locale;
}) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await fetch(`/api/listings/${listingId}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone") || undefined,
        message: form.get("message"),
      }),
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error || t(locale, "contact.error"));
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3">
        {t(locale, "contact.sent")}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        required
        placeholder={t(locale, "contact.name")}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <input
        type="email"
        name="email"
        required
        placeholder={t(locale, "contact.email")}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <input
        name="phone"
        placeholder={t(locale, "contact.phone")}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <textarea
        name="message"
        required
        rows={3}
        defaultValue={t(locale, "contact.defaultMessage")}
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {loading ? t(locale, "contact.sending") : t(locale, "contact.send")}
      </button>
    </form>
  );
}
