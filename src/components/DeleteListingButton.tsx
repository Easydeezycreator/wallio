"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteListingButton({ listingId }: { listingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("¿Seguro que quieres eliminar este anuncio? Esta acción no se puede deshacer.")) {
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
      {loading ? "Eliminando…" : "Eliminar"}
    </button>
  );
}
