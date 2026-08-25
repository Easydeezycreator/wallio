import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Iniciar sesión</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Entra a tu cuenta para publicar y administrar tus anuncios.
      </p>
      <AuthForm mode="login" />
      <p className="text-sm text-neutral-500 mt-4">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="text-brand font-medium">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
