import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getPlatformStats, getRecentUsers, isPlatformOwner } from "@/lib/admin";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export default async function AdminPage() {
  const locale = await getLocale();
  const session = await getSession();
  if (!session) {
    redirect("/login?next=/admin");
  }

  const owner = await isPlatformOwner(session.userId);
  if (!owner) {
    redirect("/");
  }

  const [stats, recentUsers] = await Promise.all([
    getPlatformStats(),
    getRecentUsers(50),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">
        {t(locale, "admin.title")}
      </h1>
      <p className="text-sm text-neutral-500 mt-1">{t(locale, "admin.subtitle")}</p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label={t(locale, "admin.users")} value={stats.userCount} />
        <StatCard label={t(locale, "admin.listings")} value={stats.listingCount} />
        <StatCard
          label={t(locale, "admin.activeListings")}
          value={stats.activeListingCount}
        />
        <StatCard label={t(locale, "admin.messages")} value={stats.messageCount} />
      </div>

      <section className="mt-10">
        <h2 className="font-semibold text-neutral-900 mb-3">
          {t(locale, "admin.recentUsers")}
        </h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-neutral-500">
                <th className="px-3 py-2">{t(locale, "admin.name")}</th>
                <th className="px-3 py-2">{t(locale, "admin.email")}</th>
                <th className="px-3 py-2">{t(locale, "admin.phone")}</th>
                <th className="px-3 py-2">{t(locale, "admin.registered")}</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.id} className="border-b border-neutral-100 last:border-0">
                  <td className="px-3 py-2 font-medium text-neutral-900">
                    {u.name}
                    {u.isPlatformOwner && (
                      <span className="ml-2 badge bg-brand/10 text-brand">
                        {t(locale, "admin.owner")}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-neutral-600">{u.email}</td>
                  <td className="px-3 py-2 text-neutral-600">{u.phone ?? "—"}</td>
                  <td className="px-3 py-2 text-neutral-500">
                    {new Date(u.createdAt).toLocaleDateString(
                      locale === "en" ? "en-GB" : "es-ES"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <p className="text-2xl font-bold text-neutral-900">{value}</p>
      <p className="text-xs text-neutral-500 mt-1">{label}</p>
    </div>
  );
}
