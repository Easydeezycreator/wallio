import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { anyPlatformOwnerExists, bootstrapOwner } from "@/lib/admin";

// Ruta de un solo uso: convierte a quien esté logueado en dueño de la
// plataforma (acceso a /admin), pero solo si todavía nadie más lo es.
// Se auto-inutiliza después del primer uso exitoso.
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Inicia sesión primero y vuelve a visitar esta URL." },
      { status: 401 }
    );
  }

  const ownerExists = await anyPlatformOwnerExists();
  if (ownerExists) {
    return NextResponse.json(
      { error: "Ya existe un dueño de la plataforma. Esta ruta ya no está disponible." },
      { status: 409 }
    );
  }

  await bootstrapOwner(session.userId);
  return NextResponse.json({
    ok: true,
    message: "Listo, ahora eres el dueño de la plataforma. Ve a /admin",
  });
}
