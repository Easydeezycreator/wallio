"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CURRENCIES, PROPERTY_TYPES, TRANSACTION_TYPES } from "@/lib/constants";

type InitialData = {
  id?: string;
  title?: string;
  description?: string;
  transactionType?: string;
  propertyType?: string;
  price?: number;
  currency?: string;
  city?: string;
  neighborhood?: string | null;
  address?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaM2?: number | null;
  furnished?: boolean;
  utilitiesIncluded?: boolean;
  privateBathroom?: boolean | null;
  petsAllowed?: boolean;
  amenities?: string | null;
  images?: { url: string }[];
};

export default function ListingForm({ initial }: { initial?: InitialData }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [propertyType, setPropertyType] = useState(initial?.propertyType ?? "CASA");
  const [imagesText, setImagesText] = useState(
    (initial?.images ?? []).map((i) => i.url).join("\n")
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isRoom = propertyType === "CUARTO";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const images = imagesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: form.get("title"),
      description: form.get("description"),
      transactionType: form.get("transactionType"),
      propertyType: form.get("propertyType"),
      price: form.get("price"),
      currency: form.get("currency"),
      city: form.get("city"),
      neighborhood: form.get("neighborhood") || undefined,
      address: form.get("address") || undefined,
      bedrooms: isRoom ? undefined : form.get("bedrooms") || undefined,
      bathrooms: isRoom ? undefined : form.get("bathrooms") || undefined,
      areaM2: form.get("areaM2") || undefined,
      furnished: form.get("furnished") === "on",
      utilitiesIncluded: form.get("utilitiesIncluded") === "on",
      privateBathroom: isRoom ? form.get("privateBathroom") === "on" : undefined,
      petsAllowed: form.get("petsAllowed") === "on",
      amenities: form.get("amenities") || undefined,
      availableFrom: form.get("availableFrom") || undefined,
      images,
    };

    const res = await fetch(
      isEdit ? `/api/listings/${initial!.id}` : "/api/listings",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Ocurrió un error, revisa los datos");
      return;
    }

    router.push(isEdit ? `/anuncios/${initial!.id}` : `/anuncios/${data.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Título del anuncio
          </label>
          <input
            name="title"
            required
            defaultValue={initial?.title}
            placeholder="Ej. Cuarto amueblado cerca de la universidad"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Operación
          </label>
          <select
            name="transactionType"
            defaultValue={initial?.transactionType ?? "RENTA"}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          >
            {TRANSACTION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Tipo de propiedad
          </label>
          <select
            name="propertyType"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {isRoom && (
            <p className="mt-1 text-xs text-brand">
              Publicarás un cuarto dentro de una casa o apartamento compartido.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Precio</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="price"
              required
              min={0}
              step="0.01"
              defaultValue={initial?.price}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
            <select
              name="currency"
              defaultValue={initial?.currency ?? "EUR"}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Ciudad</label>
          <input
            name="city"
            required
            defaultValue={initial?.city}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Barrio / Zona (opcional)
          </label>
          <input
            name="neighborhood"
            defaultValue={initial?.neighborhood ?? undefined}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Dirección (opcional, no se muestra públicamente)
          </label>
          <input
            name="address"
            defaultValue={initial?.address ?? undefined}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>

        {!isRoom && (
          <>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Habitaciones
              </label>
              <input
                type="number"
                name="bedrooms"
                min={0}
                defaultValue={initial?.bedrooms ?? undefined}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Baños
              </label>
              <input
                type="number"
                name="bathrooms"
                min={0}
                step="0.5"
                defaultValue={initial?.bathrooms ?? undefined}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Área (m², opcional)
          </label>
          <input
            type="number"
            name="areaM2"
            min={0}
            defaultValue={initial?.areaM2 ?? undefined}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Disponible desde (opcional)
          </label>
          <input
            type="date"
            name="availableFrom"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 p-4">
        <p className="text-sm font-semibold text-neutral-800 mb-3">
          {isRoom ? "Detalles del cuarto compartido" : "Comodidades"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              name="furnished"
              defaultChecked={initial?.furnished}
              className="rounded border-neutral-300"
            />
            Amueblado
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              name="utilitiesIncluded"
              defaultChecked={initial?.utilitiesIncluded}
              className="rounded border-neutral-300"
            />
            Servicios incluidos (luz, agua, internet)
          </label>
          {isRoom && (
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                name="privateBathroom"
                defaultChecked={initial?.privateBathroom ?? undefined}
                className="rounded border-neutral-300"
              />
              Baño privado
            </label>
          )}
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              name="petsAllowed"
              defaultChecked={initial?.petsAllowed}
              className="rounded border-neutral-300"
            />
            Se aceptan mascotas
          </label>
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {isRoom
              ? "Reglas de convivencia / amenidades (cocina, lavandería, etc.)"
              : "Amenidades (opcional)"}
          </label>
          <textarea
            name="amenities"
            defaultValue={initial?.amenities ?? undefined}
            rows={2}
            placeholder={
              isRoom
                ? "Ej. Cocina y lavandería compartida, no fumar, horario flexible…"
                : "Ej. Piscina, garaje, seguridad 24h…"
            }
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Descripción
        </label>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={initial?.description}
          placeholder="Describe el lugar, el ambiente, quién vive ahí, reglas, etc."
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Fotos — una URL de imagen por línea (opcional)
        </label>
        <textarea
          value={imagesText}
          onChange={(e) => setImagesText(e.target.value)}
          rows={3}
          placeholder="https://ejemplo.com/foto1.jpg"
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Sube tus fotos a un servicio como Imgur o Google Drive (enlace público) y pega
          aquí la URL de cada imagen.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {loading ? "Guardando…" : isEdit ? "Guardar cambios" : "Publicar anuncio"}
      </button>
    </form>
  );
}
