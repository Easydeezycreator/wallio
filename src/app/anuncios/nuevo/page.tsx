import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import ListingForm from "@/components/ListingForm";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export default async function NewListingPage() {
  const locale = await getLocale();
  const session = await getSession();
  if (!session) {
    redirect("/login?next=/anuncios/nuevo");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">
        {t(locale, "form.newListingTitle")}
      </h1>
      <p className="text-sm text-neutral-500 mb-6">
        {t(locale, "form.newListingSubtitle")}
      </p>
      <ListingForm locale={locale} />
    </div>
  );
}
