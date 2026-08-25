import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  deleteListing,
  getListingById,
  listingInputSchema,
  updateListing,
} from "@/lib/listings";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/listings/[id]">) {
  const { id } = await ctx.params;
  const listing = await getListingById(id);
  if (!listing) {
    return NextResponse.json({ error: "Anuncio no encontrado" }, { status: 404 });
  }
  return NextResponse.json(listing);
}

export async function PATCH(req: NextRequest, ctx: RouteContext<"/api/listings/[id]">) {
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

  const body = await req.json().catch(() => null);
  const parsed = listingInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
  }

  await updateListing(id, parsed.data);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/listings/[id]">) {
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

  await deleteListing(id);
  return NextResponse.json({ ok: true });
}
