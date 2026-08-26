import { getListings } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";
import SearchFilters from "@/components/SearchFilters";
import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const locale = await getLocale();
  const sp = await searchParams;
  const params = {
    city: typeof sp.city === "string" ? sp.city : undefined,
    transactionType: typeof sp.transactionType === "string" ? sp.transactionType : undefined,
    propertyType: typeof sp.propertyType === "string" ? sp.propertyType : undefined,
    minPrice: typeof sp.minPrice === "string" ? sp.minPrice : undefined,
    maxPrice: typeof sp.maxPrice === "string" ? sp.maxPrice : undefined,
  };

  const listings = await getListings({
    city: params.city || undefined,
    transactionType: params.transactionType || undefined,
    propertyType: params.propertyType || undefined,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
  });

  const roomCount = listings.filter((l) => l.propertyType === "CUARTO").length;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-neutral-200/70">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 90% at 15% 0%, var(--brand-light) 0%, transparent 60%), radial-gradient(50% 70% at 100% 10%, rgba(236,106,78,0.10) 0%, transparent 55%), var(--background)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:pt-20 sm:pb-14">
          <span className="badge bg-brand-light text-brand-dark">
            {t(locale, "home.badge")}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 max-w-2xl">
            {t(locale, "home.title1")}{" "}
            <span className="text-brand">{t(locale, "home.title2")}</span>
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-xl">
            {t(locale, "home.subtitle")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/anuncios/nuevo"
              className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark transition-colors"
            >
              {t(locale, "home.publishCta")}
            </Link>
            <Link
              href="/?propertyType=CUARTO"
              className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 hover:border-brand hover:text-brand transition-colors"
            >
              {t(locale, "home.roomsCta")}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 -mt-6 sm:-mt-8 relative z-10">
        <div className="rounded-2xl bg-white card-shadow border border-neutral-200/70 p-4">
          <SearchFilters searchParams={params} locale={locale} />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900">
            {listings.length}{" "}
            {t(
              locale,
              listings.length === 1
                ? "home.resultsFound_one"
                : "home.resultsFound_other"
            )}
          </h2>
          {roomCount > 0 && !params.propertyType && (
            <span className="text-sm text-neutral-500">
              {roomCount} {t(locale, "home.roomsAmong")}
            </span>
          )}
        </div>

        {listings.length === 0 ? (
          <div className="mt-4 mb-12 rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-12 text-center text-neutral-500">
            {t(locale, "home.empty")}{" "}
            <Link href="/anuncios/nuevo" className="text-brand font-semibold">
              {t(locale, "home.emptyCta")}
            </Link>
            .
          </div>
        ) : (
          <div className="mt-4 mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
