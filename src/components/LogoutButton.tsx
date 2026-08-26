"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({ label = "Cerrar sesión" }: { label?: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm font-medium text-neutral-600 hover:text-brand"
    >
      {label}
    </button>
  );
}
