import { notFound } from "next/navigation";
import Link from "next/link";
import { getListingById, isCurrentlyFeatured } from "@/lib/listings";
import { getSession } from "@/lib/auth";
import FeatureListingButton from "@/components/FeatureListingButton";
import { formatPrice } from "@/lib/constants";
import { t, transactionLabel, propertyLabel } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";
import { getLocale } from "@/lib/locale";

export default async function ListingDetailPage(
  props: PageProps<"/anuncios/[id]">
) {
  const locale = await getLocale();
  const { id } = await props.params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  const session = await getSession();
  const isOwner = session?.userId === listing.ownerId;
  const isRoom = listing.propertyType === "CUARTO";
  const featured = isCurrentlyFeatured(listing);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4">
        <Link href="/" className="text-sm text-neutral-500 hover:text-brand">
          {t(locale, "detail.backToSearch")}
        </Link>
      </div>

      {listing.images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {listing.images.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.id}
              src={img.url}
              alt={`${listing.title} foto ${i + 1}`}
              className={`rounded-lg object-cover w-full h-40 sm:h-56 ${
                i === 0 ? "col-span-2 sm:col-span-2 sm:row-span-2 h-full" : ""
              }`}
            />
          ))}
        </div>
      ) : (
        <div className="mb-6 flex h-56 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400 text-sm">
          {t(locale, "detail.noPhotos")}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`badge ${
                listing.transactionType === "RENTA"
                  ? "bg-brand text-white"
                  : "bg-amber-500 text-white"
              }`}
            >
              {transactionLabel(locale, listing.transactionType)}
            </span>
            <span className="badge bg-neutral-100 text-neutral-700">
              {propertyLabel(locale, listing.propertyType)}
            </span>
            {featured && (
              <span className="badge bg-amber-500 text-white">
                {t(locale, "card.featured")}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-neutral-900">{listing.title}</h1>
          <p className="text-neutral-500 mt-1">
            {listing.neighborhood ? `${listing.neighborhood}, ` : ""}
            {listing.city}
          </p>

          <p className="text-3xl font-bold text-brand mt-4">
            {formatPrice(listing.price, listing.currency, locale)}
            {listing.transactionType === "RENTA" && (
              <span className="text-base font-normal text-neutral-500">
                {t(locale, "card.perMonth")}
              </span>
            )}
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {!isRoom && listing.bedrooms != null && (
              <Stat label={t(locale, "detail.bedrooms")} value={listing.bedrooms} />
            )}
            {!isRoom && listing.bathrooms != null && (
              <Stat label={t(locale, "detail.bathrooms")} value={listing.bathrooms} />
            )}
            {listing.areaM2 != null && (
              <Stat label={t(locale, "detail.area")} value={`${listing.areaM2} m²`} />
            )}
            {isRoom && listing.privateBathroom != null && (
              <Stat
                label={t(locale, "detail.privateBathroom")}
                value={
                  listing.privateBathroom
                    ? t(locale, "detail.yes")
                    : t(locale, "detail.no")
                }
              />
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {listing.furnished && <Tag label={t(locale, "detail.furnished")} />}
            {listing.utilitiesIncluded && (
              <Tag label={t(locale, "detail.utilities")} />
            )}
            {listing.petsAllowed && <Tag label={t(locale, "detail.petsTag")} />}
          </div>

          <div className="mt-8">
            <h2 className="font-semibold text-neutral-900 mb-2">
              {t(locale, "detail.description")}
            </h2>
            <p className="text-neutral-700 whitespace-pre-line leading-relaxed">
              {listing.description}
            </p>
          </div>

          {listing.amenities && (
            <div className="mt-6">
              <h2 className="font-semibold text-neutral-900 mb-2">
                {isRoom
                  ? t(locale, "detail.livingAmenities")
                  : t(locale, "detail.amenities")}
              </h2>
              <p className="text-neutral-700 whitespace-pre-line leading-relaxed">
                {listing.amenities}
              </p>
            </div>
          )}

          {isOwner && (
            <div className="mt-8 flex gap-3">
              <Link
                href={`/anuncios/${listing.id}/editar`}
                className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                {t(locale, "detail.editListing")}
              </Link>
              <Link
                href="/mi-cuenta"
                className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                {t(locale, "detail.goToAccount")}
              </Link>
            </div>
          )}
        </div>

        <div>
          <div className="rounded-xl border border-neutral-200 p-4 sticky top-20">
            <p className="text-sm text-neutral-500">
              {t(locale, "detail.publishedBy")}
            </p>
            <p className="font-semibold text-neutral-900">{listing.owner?.name}</p>

            {isOwner ? (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-neutral-500">
                  {t(locale, "detail.yourListingNote")}
                </p>
                {featured ? (
                  <p className="text-sm font-medium text-amber-700">
                    {t(locale, "detail.featuredUntil")}{" "}
                    {listing.featuredUntil?.toLocaleDateString(
                      locale === "en" ? "en-GB" : "es-ES"
                    )}
                  </p>
                ) : (
                  <FeatureListingButton listingId={listing.id} locale={locale} />
                )}
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm font-medium text-neutral-700 mb-2">
                  {t(locale, "contact.title")}
                </p>
                <ContactForm listingId={listing.id} locale={locale} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-neutral-50 border border-neutral-200 px-3 py-2">
      <p className="text-neutral-500 text-xs">{label}</p>
      <p className="font-semibold text-neutral-900">{value}</p>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="badge bg-neutral-100 text-neutral-700 border border-neutral-200">
      {label}
    </span>
  );
}
