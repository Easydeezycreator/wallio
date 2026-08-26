import Link from "next/link";
import { formatPrice } from "@/lib/constants";
import { isCurrentlyFeatured } from "@/lib/listings";
import { t, transactionLabel, propertyLabel, type Locale } from "@/lib/i18n";

type ListingCardData = {
  id: string;
  title: string;
  price: number;
  currency: string;
  transactionType: string;
  propertyType: string;
  city: string;
  neighborhood?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  images: { url: string }[];
  isFeatured: boolean;
  featuredUntil: Date | null;
};

export default function ListingCard({
  listing,
  locale,
}: {
  listing: ListingCardData;
  locale: Locale;
}) {
  const isRoom = listing.propertyType === "CUARTO";
  const cover = listing.images[0]?.url;
  const featured = isCurrentlyFeatured(listing);

  return (
    <Link
      href={`/anuncios/${listing.id}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200/70 bg-white card-shadow card-shadow-hover transition-shadow duration-300"
    >
      <div className="aspect-[4/3] w-full bg-neutral-100 overflow-hidden relative">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={listing.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-400 text-sm">
            {locale === "en" ? "No photos" : "Sin fotos"}
          </div>
        )}
        <span
          className={`badge absolute top-2 left-2 ${
            listing.transactionType === "RENTA"
              ? "bg-brand text-white"
              : "bg-amber-500 text-white"
          }`}
        >
          {transactionLabel(locale, listing.transactionType)}
        </span>
        {isRoom && (
          <span className="badge absolute top-2 right-2 bg-white/90 text-neutral-800 border border-neutral-200">
            {t(locale, "card.room")}
          </span>
        )}
        {featured && (
          <span className="badge absolute bottom-2 left-2 bg-accent text-white">
            {t(locale, "card.featured")}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-semibold text-neutral-900 truncate group-hover:text-brand transition-colors">
          {listing.title}
        </p>
        <p className="text-sm text-neutral-500 truncate">
          {listing.neighborhood ? `${listing.neighborhood}, ` : ""}
          {listing.city}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-brand font-extrabold text-lg">
            {formatPrice(listing.price, listing.currency, locale)}
            {listing.transactionType === "RENTA" && (
              <span className="text-xs font-medium text-neutral-500">
                {t(locale, "card.perMonth")}
              </span>
            )}
          </span>
          <span className="text-xs font-medium text-neutral-500 bg-neutral-100 rounded-full px-2 py-1">
            {propertyLabel(locale, listing.propertyType)}
          </span>
        </div>
        {!isRoom && (listing.bedrooms || listing.bathrooms) && (
          <p className="mt-2 text-xs text-neutral-500">
            {listing.bedrooms
              ? `${listing.bedrooms} ${locale === "en" ? "bed." : "hab."} `
              : ""}
            {listing.bathrooms
              ? `${listing.bathrooms} ${locale === "en" ? "bath" : "baños"}`
              : ""}
          </p>
        )}
      </div>
    </Link>
  );
}
