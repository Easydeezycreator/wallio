import { getListings } from "@/lib/listings";
import ListingCard from "@/components/ListingCard";
import SearchFilters from "@/components/SearchFilters";
import Link from "next/link";

export default async function HomePage({ searchParams }: PageProps<"/">) {
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
      <section className="bg-gradient-to-b from-brand/10 to-transparent border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            Encuentra casa, apartamento o cuarto en renta o venta
          </h1>
          <p className="mt-2 text-neutral-600 max-w-2xl">
            Publica tu propiedad gratis. Espacio especial para quienes rentan
            cuartos y buscan compañeros de casa.
          </p>
          <div className="mt-3 flex gap-2">
            <Link
              href="/anuncios/nuevo"
              className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Publicar mi anuncio
            </Link>
            <Link
              href="/?propertyType=CUARTO"
              className="rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/5"
            >
              Ver cuartos en renta
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <SearchFilters searchParams={params} />

        <div className="mt-6 flex items-center justify-between">
          <h2 className="font-semibold text-neutral-800">
            {listings.length} {listings.length === 1 ? "anuncio encontrado" : "anuncios encontrados"}
          </h2>
          {roomCount > 0 && !params.propertyType && (
            <span className="text-sm text-neutral-500">{roomCount} son cuartos en renta</span>
          )}
        </div>

        {listings.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-neutral-300 p-10 text-center text-neutral-500">
            No hay anuncios que coincidan con tu búsqueda todavía.{" "}
            <Link href="/anuncios/nuevo" className="text-brand font-medium">
              Sé el primero en publicar
            </Link>
            .
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
