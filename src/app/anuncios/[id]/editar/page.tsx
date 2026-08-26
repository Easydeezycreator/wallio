import { notFound, redirect } from "next/navigation";
import { getListingById } from "@/lib/listings";
import { getSession } from "@/lib/auth";
import ListingForm from "@/components/ListingForm";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export default async function EditListingPage(
  props: PageProps<"/anuncios/[id]/editar">
) {
  const locale = await getLocale();
  const { id } = await props.params;
  const session = await getSession();
  if (!session) {
    redirect(`/login?next=/anuncios/${id}/editar`);
  }

  const listing = await getListingById(id);
  if (!listing) notFound();
  if (listing.ownerId !== session.userId) {
    redirect(`/anuncios/${id}`);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">
        {t(locale, "form.editListingTitle")}
      </h1>
      <p className="text-sm text-neutral-500 mb-6">
        {t(locale, "form.editListingSubtitle")}
      </p>
      <ListingForm
        locale={locale}
        initial={{
          id: listing.id,
          title: listing.title,
          description: listing.description,
          transactionType: listing.transactionType,
          propertyType: listing.propertyType,
          price: listing.price,
          currency: listing.currency,
          city: listing.city,
          neighborhood: listing.neighborhood,
          address: listing.address,
          bedrooms: listing.bedrooms,
          bathrooms: listing.bathrooms,
          areaM2: listing.areaM2,
          furnished: listing.furnished,
          utilitiesIncluded: listing.utilitiesIncluded,
          privateBathroom: listing.privateBathroom,
          petsAllowed: listing.petsAllowed,
          amenities: listing.amenities,
          images: listing.images,
        }}
      />
    </div>
  );
}
