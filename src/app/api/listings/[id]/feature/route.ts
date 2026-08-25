import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { featureListing, getListingById } from "@/lib/listings";
import { FEATURED_DAYS } from "@/lib/constants";

// TODO(pagos): este endpoint activa el destacado directamente, sin cobrar.
// Cuando se conecte Stripe, aquí se debe:
//   1. Crear una sesión de Stripe Checkout por FEATURED_PRICE_EUR.
//   2. Redirigir al usuario a esa sesión en vez de activar de inmediato.
//   3. Activar el destacado solo cuando Stripe confirme el pago (webhook).
export async function POST(_req: Request, ctx: RouteContext<"/api/listings/[id]/feature">) {
  const { id } = await ctx.params;
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Debes iniciar sesión" }, { status: 401 });
  }

  const listing = await getListingById(id);
  if (!listing) {
    return NextResponse.json({ error: "Anuncio no encontrado" }, { status: 404 });
  }
  if (listing.ownerId !== session.userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const featuredUntil = await featureListing(id, FEATURED_DAYS);
  return NextResponse.json({ ok: true, featuredUntil });
}
