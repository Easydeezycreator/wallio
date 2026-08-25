import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { getListingById } from "@/lib/listings";

const schema = z.object({
  name: z.string().min(2, "Tu nombre es requerido"),
  email: z.string().email("Correo inválido"),
  phone: z.string().optional(),
  message: z.string().min(5, "Escribe un mensaje"),
});

export async function POST(req: NextRequest, ctx: RouteContext<"/api/listings/[id]/contact">) {
  const { id } = await ctx.params;
  const listing = await getListingById(id);
  if (!listing) {
    return NextResponse.json({ error: "Anuncio no encontrado" }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
  }

  const session = await getSession();

  await db.insert(contactMessages).values({
    ...parsed.data,
    phone: parsed.data.phone || null,
    listingId: id,
    senderId: session?.userId ?? null,
  });

  return NextResponse.json({ ok: true });
}
