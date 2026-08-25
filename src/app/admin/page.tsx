import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getPlatformStats, getRecentUsers, isPlatformOwner } from "@/lib/admin";

export default async function AdminPage() {
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
      <h1 className="text-2xl font-bold text-neutral-900">Panel de administrador</h1>
      <p className="text-sm text-neutral-500 mt-1">
        Vista general de Habita — solo visible para el dueño de la plataforma.
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Usuarios registrados" value={stats.userCount} />
        <StatCard label="Anuncios publicados" value={stats.listingCount} />
        <StatCard label="Anuncios activos" value={stats.activeListingCount} />
        <StatCard label="Mensajes de contacto" value={stats.messageCount} />
      </div>

      <section className="mt-10">
        <h2 className="font-semibold text-neutral-900 mb-3">
          Últimos usuarios registrados
        </h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-neutral-500">
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Correo</th>
                <th className="px-3 py-2">Teléfono</th>
                <th className="px-3 py-2">Registrado</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.id} className="border-b border-neutral-100 last:border-0">
                  <td className="px-3 py-2 font-medium text-neutral-900">
                    {u.name}
                    {u.isPlatformOwner && (
                      <span className="ml-2 badge bg-brand/10 text-brand">Dueño</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-neutral-600">{u.email}</td>
                  <td className="px-3 py-2 text-neutral-600">{u.phone ?? "—"}</td>
                  <td className="px-3 py-2 text-neutral-500">
                    {new Date(u.createdAt).toLocaleDateString("es-MX")}
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
