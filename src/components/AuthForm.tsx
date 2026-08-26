"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { t, type Locale } from "@/lib/i18n";

export default function AuthForm({
  mode,
  locale,
}: {
  mode: "login" | "register";
  locale: Locale;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload =
      mode === "register"
        ? {
            name: form.get("name"),
            email: form.get("email"),
            password: form.get("password"),
            phone: form.get("phone") || undefined,
          }
        : {
            email: form.get("email"),
            password: form.get("password"),
          };

    const res = await fetch(`/api/auth/${mode === "register" ? "register" : "login"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || t(locale, "auth.genericError"));
      return;
    }

    router.push("/mi-cuenta");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "register" && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {t(locale, "auth.fullName")}
          </label>
          <input
            name="name"
            required
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {t(locale, "auth.email")}
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {mode === "register" && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {t(locale, "auth.phone")}
          </label>
          <input
            name="phone"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {t(locale, "auth.password")}
        </label>
        <input
          type="password"
          name="password"
          required
          minLength={6}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {loading
          ? t(locale, "auth.loading")
          : mode === "register"
          ? t(locale, "auth.registerButton")
          : t(locale, "auth.loginButton")}
      </button>
    </form>
  );
}
