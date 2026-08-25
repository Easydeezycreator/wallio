import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createListing, getListings, listingInputSchema } from "@/lib/listings";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const transactionType = searchParams.get("transactionType") || undefined;
  const propertyType = searchParams.get("propertyType") || undefined;
  const city = searchParams.get("city") || undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const results = await getListings({
    transactionType,
    propertyType,
    city,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  return NextResponse.json(results);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Debes iniciar sesión" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = listingInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
  }

  const listing = await createListing(session.userId, parsed.data);
  return NextResponse.json(listing, { status: 201 });
}
