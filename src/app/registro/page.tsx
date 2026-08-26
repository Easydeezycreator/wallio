import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export default async function RegisterPage() {
  const locale = await getLocale();
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">
        {t(locale, "auth.registerTitle")}
      </h1>
      <p className="text-sm text-neutral-500 mb-6">
        {t(locale, "auth.registerSubtitle")}
      </p>
      <AuthForm mode="register" locale={locale} />
      <p className="text-sm text-neutral-500 mt-4">
        {t(locale, "auth.hasAccount")}{" "}
        <Link href="/login" className="text-brand font-medium">
          {t(locale, "auth.loginLink")}
        </Link>
      </p>
    </div>
  );
}
