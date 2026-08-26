import { TRANSACTION_TYPES_I18N, PROPERTY_TYPES_I18N, t, type Locale } from "@/lib/i18n";

export default function SearchFilters({
  searchParams,
  locale,
}: {
  searchParams: Record<string, string | undefined>;
  locale: Locale;
}) {
  const transactionTypes = TRANSACTION_TYPES_I18N(locale);
  const propertyTypes = PROPERTY_TYPES_I18N(locale);

  return (
    <form
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
      method="get"
    >
      <div className="col-span-2 lg:col-span-2">
        <label className="block text-xs font-medium text-neutral-500 mb-1">
          {t(locale, "filters.city")}
        </label>
        <input
          name="city"
          defaultValue={searchParams.city}
          placeholder={t(locale, "filters.cityPlaceholder")}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1">
          {t(locale, "filters.operation")}
        </label>
        <select
          name="transactionType"
          defaultValue={searchParams.transactionType ?? ""}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
        >
          <option value="">{t(locale, "filters.all")}</option>
          {transactionTypes.map((tItem) => (
            <option key={tItem.value} value={tItem.value}>
              {tItem.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1">
          {t(locale, "filters.type")}
        </label>
        <select
          name="propertyType"
          defaultValue={searchParams.propertyType ?? ""}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
        >
          <option value="">{t(locale, "filters.allTypes")}</option>
          {propertyTypes.map((tItem) => (
            <option key={tItem.value} value={tItem.value}>
              {tItem.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-neutral-500 mb-1">
          {t(locale, "filters.minPrice")}
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
          {t(locale, "filters.maxPrice")}
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
          {t(locale, "filters.clear")}
        </a>
        <button
          type="submit"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
        >
          {t(locale, "filters.search")}
        </button>
      </div>
    </form>
  );
}
