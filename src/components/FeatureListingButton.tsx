"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FEATURED_DAYS, FEATURED_PRICE_MXN } from "@/lib/constants";

export default function FeatureListingButton({ listingId }: { listingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleActivate() {
    setLoading(true);
    await fetch(`/api/listings/${listingId}/feature`, { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
      <p className="font-semibold text-amber-900">Destaca este anuncio</p>
      <p className="mt-1 text-sm text-amber-800">
        Aparece primero en los resultados de búsqueda durante {FEATURED_DAYS} días
        por ${FEATURED_PRICE_MXN} MXN.
      </p>
      <button
        onClick={handleActivate}
        disabled={loading}
        className="mt-3 rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
      >
        {loading ? "Activando…" : `Activar destacado — modo de prueba`}
      </button>
      <p className="mt-2 text-xs text-amber-700">
        El cobro real con tarjeta todavía no está conectado. Por ahora este botón
        activa el destacado sin cobrar, para que puedas probarlo.
      </p>
    </div>
  );
}
