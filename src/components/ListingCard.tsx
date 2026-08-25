import Link from "next/link";
import { formatPrice, propertyLabel, transactionLabel } from "@/lib/constants";
import { isCurrentlyFeatured } from "@/lib/listings";

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

export default function ListingCard({ listing }: { listing: ListingCardData }) {
  const isRoom = listing.propertyType === "CUARTO";
  const cover = listing.images[0]?.url;
  const featured = isCurrentlyFeatured(listing);

  return (
    <Link
      href={`/anuncios/${listing.id}`}
      className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white hover:shadow-md transition-shadow"
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
            Sin fotos
          </div>
        )}
        <span
          className={`badge absolute top-2 left-2 ${
            listing.transactionType === "RENTA"
              ? "bg-brand text-white"
              : "bg-amber-500 text-white"
          }`}
        >
          {transactionLabel(listing.transactionType)}
        </span>
        {isRoom && (
          <span className="badge absolute top-2 right-2 bg-white/90 text-neutral-800 border border-neutral-200">
            Cuarto
          </span>
        )}
        {featured && (
          <span className="badge absolute bottom-2 left-2 bg-amber-500 text-white">
            ★ Destacado
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="font-semibold text-neutral-900 truncate">{listing.title}</p>
        <p className="text-sm text-neutral-500 truncate">
          {listing.neighborhood ? `${listing.neighborhood}, ` : ""}
          {listing.city}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-brand font-bold">
            {formatPrice(listing.price, listing.currency)}
            {listing.transactionType === "RENTA" && (
              <span className="text-xs font-normal text-neutral-500">/mes</span>
            )}
          </span>
          <span className="text-xs text-neutral-500">
            {propertyLabel(listing.propertyType)}
          </span>
        </div>
        {!isRoom && (listing.bedrooms || listing.bathrooms) && (
          <p className="mt-1 text-xs text-neutral-500">
            {listing.bedrooms ? `${listing.bedrooms} rec. ` : ""}
            {listing.bathrooms ? `${listing.bathrooms} baños` : ""}
          </p>
        )}
      </div>
    </Link>
  );
}
