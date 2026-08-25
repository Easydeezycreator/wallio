import Link from "next/link";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Crear cuenta</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Regístrate para publicar tu casa, apartamento o cuarto en renta.
      </p>
      <AuthForm mode="register" />
      <p className="text-sm text-neutral-500 mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-brand font-medium">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
