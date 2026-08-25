"use client";

import { useState } from "react";

export default function ContactForm({ listingId }: { listingId: string }) {
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
      setError(data.error || "No se pudo enviar el mensaje");
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3">
        ¡Mensaje enviado! El anunciante podrá contactarte pronto.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        required
        placeholder="Tu nombre"
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Tu correo"
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <input
        name="phone"
        placeholder="Tu teléfono (opcional)"
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      <textarea
        name="message"
        required
        rows={3}
        defaultValue="Hola, me interesa este anuncio. ¿Sigue disponible?"
        className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {loading ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
