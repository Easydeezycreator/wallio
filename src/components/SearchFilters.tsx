import { PROPERTY_TYPES, TRANSACTION_TYPES } from "@/lib/constants";

export default function SearchFilters({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  return (
    <form
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      method="get"
    >
      <div className="col-span-2 lg:col-span-2">
        <label className="block text-xs font-medium text-neutral-500 mb-1">Ciudad</label>
        <input
          name="city"
          defaultValue={searchParams.city}
          placeholder="Ej. Madrid"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1">Operación</label>
        <select
          name="transactionType"
          defaultValue={searchParams.transactionType ?? ""}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
        >
          <option value="">Todas</option>
          {TRANSACTION_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1">Tipo</label>
        <select
          name="propertyType"
          defaultValue={searchParams.propertyType ?? ""}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
        >
          <option value="">Todos</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1">
          Precio mín.
        </label>
        <input
          type="number"
          name="minPrice"
          defaultValue={searchParams.minPrice}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1">
          Precio máx.
        </label>
        <input
          type="number"
          name="maxPrice"
          defaultValue={searchParams.maxPrice}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
        />
      </div>

      <div className="col-span-2 sm:col-span-3 lg:col-span-6 flex justify-end gap-2">
        <a
          href="/"
          className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
        >
          Limpiar
        </a>
        <button
          type="submit"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
