import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getListingsByOwner, getMessagesForOwner } from "@/lib/listings";
import { formatPrice } from "@/lib/constants";
import { t, transactionLabel, propertyLabel } from "@/lib/i18n";
import DeleteListingButton from "@/components/DeleteListingButton";
import { getLocale } from "@/lib/locale";

export default async function MyAccountPage() {
  const locale = await getLocale();
  const session = await getSession();
  if (!session) {
    redirect("/login?next=/mi-cuenta");
  }

  const [myListings, messages] = await Promise.all([
    getListingsByOwner(session.userId),
    getMessagesForOwner(session.userId),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">
        {t(locale, "account.title")}
      </h1>
      <p className="text-sm text-neutral-500 mt-1">
        {t(locale, "account.hello").replace("{name}", session.name)}
      </p>

      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-neutral-900">
            {t(locale, "account.myListings")} ({myListings.length})
          </h2>
          <Link
            href="/anuncios/nuevo"
            className="rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            {t(locale, "account.newListing")}
          </Link>
        </div>

        {myListings.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 text-sm">
            {t(locale, "account.noListings")}
          </div>
        ) : (
          <div className="space-y-2">
            {myListings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-white p-3"
              >
                <div className="min-w-0">
                  <Link
                    href={`/anuncios/${listing.id}`}
                    className="font-medium text-neutral-900 hover:text-brand truncate block"
                  >
                    {listing.title}
                  </Link>
                  <p className="text-xs text-neutral-500">
                    {transactionLabel(locale, listing.transactionType)} ·{" "}
                    {propertyLabel(locale, listing.propertyType)} · {listing.city} ·{" "}
                    {formatPrice(listing.price, listing.currency, locale)}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/anuncios/${listing.id}/editar`}
                    className="text-sm font-medium text-neutral-600 hover:text-brand"
                  >
                    {t(locale, "button.edit")}
                  </Link>
                  <DeleteListingButton listingId={listing.id} locale={locale} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-semibold text-neutral-900 mb-3">
          {t(locale, "account.myMessages")} ({messages.length})
        </h2>

        {messages.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 text-sm">
            {t(locale, "account.noMessages")}
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className="rounded-lg border border-neutral-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-neutral-900">{msg.name}</p>
                  <p className="text-xs text-neutral-400">
                    {new Date(msg.createdAt).toLocaleDateString(
                      locale === "en" ? "en-GB" : "es-ES"
                    )}
                  </p>
                </div>
                <p className="text-xs text-neutral-500 mb-1">
                  {t(locale, "account.about")}:{" "}
                  <Link href={`/anuncios/${msg.listingId}`} className="text-brand">
                    {msg.listingTitle}
                  </Link>
                </p>
                <p className="text-sm text-neutral-700">{msg.message}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  {msg.email}
                  {msg.phone ? ` · ${msg.phone}` : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
