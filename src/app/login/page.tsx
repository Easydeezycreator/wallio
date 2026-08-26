import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export default async function LoginPage() {
  const locale = await getLocale();
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">
        {t(locale, "auth.loginTitle")}
      </h1>
      <p className="text-sm text-neutral-500 mb-6">
        {t(locale, "auth.loginSubtitle")}
      </p>
      <AuthForm mode="login" locale={locale} />
      <p className="text-sm text-neutral-500 mt-4">
        {t(locale, "auth.noAccount")}{" "}
        <Link href="/registro" className="text-brand font-medium">
          {t(locale, "auth.registerLink")}
        </Link>
      </p>
    </div>
  );
}
