import { z } from "zod";
import { db } from "@/db";
import { listings, listingImages, users, contactMessages } from "@/db/schema";
import { and, desc, eq, gte, like, lte } from "drizzle-orm";

export const listingInputSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres").max(120),
  description: z.string().min(20, "Describe el lugar con al menos 20 caracteres"),
  transactionType: z.enum(["VENTA", "RENTA"]),
  propertyType: z.enum([
    "CASA",
    "APARTAMENTO",
    "CUARTO",
    "ESTUDIO",
    "OFICINA",
    "LOCAL",
    "TERRENO",
  ]),
  price: z.coerce.number().positive("El precio debe ser mayor a 0"),
  currency: z.enum(["EUR"]).default("EUR"),
  city: z.string().min(2, "La ciudad es requerida"),
  neighborhood: z.string().optional(),
  address: z.string().optional(),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().nonnegative().optional(),
  areaM2: z.coerce.number().positive().optional(),
  furnished: z.coerce.boolean().default(false),
  utilitiesIncluded: z.coerce.boolean().default(false),
  privateBathroom: z.coerce.boolean().optional(),
  petsAllowed: z.coerce.boolean().default(false),
  amenities: z.string().optional(),
  availableFrom: z.string().optional(),
  images: z.array(z.string().url()).max(10).default([]),
});

export type ListingInput = z.infer<typeof listingInputSchema>;

export type ListingFilters = {
  transactionType?: string;
  propertyType?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
};

export async function getListings(filters: ListingFilters = {}) {
  const conditions = [eq(listings.isActive, true)];

  if (filters.transactionType) {
    conditions.push(eq(listings.transactionType, filters.transactionType));
  }
  if (filters.propertyType) {
    conditions.push(eq(listings.propertyType, filters.propertyType));
  }
  if (filters.city) {
    conditions.push(like(listings.city, `%${filters.city}%`));
  }
  if (filters.minPrice !== undefined) {
    conditions.push(gte(listings.price, filters.minPrice));
  }
  if (filters.maxPrice !== undefined) {
    conditions.push(lte(listings.price, filters.maxPrice));
  }

  const results = await db.query.listings.findMany({
    where: and(...conditions),
    orderBy: desc(listings.createdAt),
    with: { images: true },
  });

  return sortWithFeaturedFirst(results);
}

export function isCurrentlyFeatured(listing: {
  isFeatured: boolean;
  featuredUntil: Date | null;
}) {
  return Boolean(
    listing.isFeatured && listing.featuredUntil && listing.featuredUntil.getTime() > Date.now()
  );
}

function sortWithFeaturedFirst<T extends { isFeatured: boolean; featuredUntil: Date | null; createdAt: Date }>(
  items: T[]
) {
  return [...items].sort((a, b) => {
    const aFeatured = isCurrentlyFeatured(a) ? 1 : 0;
    const bFeatured = isCurrentlyFeatured(b) ? 1 : 0;
    if (aFeatured !== bFeatured) return bFeatured - aFeatured;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

export async function getListingById(id: string) {
  return db.query.listings.findFirst({
    where: eq(listings.id, id),
    with: {
      images: { orderBy: (img, { asc }) => asc(img.order) },
      owner: { columns: { id: true, name: true, phone: true, email: true } },
    },
  });
}

export async function getListingsByOwner(ownerId: string) {
  const results = await db.query.listings.findMany({
    where: eq(listings.ownerId, ownerId),
    orderBy: desc(listings.createdAt),
    with: { images: true },
  });
  return sortWithFeaturedFirst(results);
}

export async function featureListing(id: string, days: number) {
  const featuredUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  await db
    .update(listings)
    .set({ isFeatured: true, featuredUntil })
    .where(eq(listings.id, id));
  return featuredUntil;
}

export async function createListing(ownerId: string, input: ListingInput) {
  const [listing] = await db
    .insert(listings)
    .values({
      title: input.title,
      description: input.description,
      transactionType: input.transactionType,
      propertyType: input.propertyType,
      price: input.price,
      currency: input.currency,
      city: input.city,
      neighborhood: input.neighborhood || null,
      address: input.address || null,
      bedrooms: input.bedrooms ?? null,
      bathrooms: input.bathrooms ?? null,
      areaM2: input.areaM2 ?? null,
      furnished: input.furnished,
      utilitiesIncluded: input.utilitiesIncluded,
      privateBathroom: input.privateBathroom ?? null,
      petsAllowed: input.petsAllowed,
      amenities: input.amenities || null,
      availableFrom: input.availableFrom ? new Date(input.availableFrom) : null,
      ownerId,
    })
    .returning();

  if (input.images.length > 0) {
    await db.insert(listingImages).values(
      input.images.map((url, order) => ({ url, order, listingId: listing.id }))
    );
  }

  return listing;
}

export async function updateListing(id: string, input: ListingInput) {
  await db
    .update(listings)
    .set({
      title: input.title,
      description: input.description,
      transactionType: input.transactionType,
      propertyType: input.propertyType,
      price: input.price,
      currency: input.currency,
      city: input.city,
      neighborhood: input.neighborhood || null,
      address: input.address || null,
      bedrooms: input.bedrooms ?? null,
      bathrooms: input.bathrooms ?? null,
      areaM2: input.areaM2 ?? null,
      furnished: input.furnished,
      utilitiesIncluded: input.utilitiesIncluded,
      privateBathroom: input.privateBathroom ?? null,
      petsAllowed: input.petsAllowed,
      amenities: input.amenities || null,
      availableFrom: input.availableFrom ? new Date(input.availableFrom) : null,
      updatedAt: new Date(),
    })
    .where(eq(listings.id, id));

  await db.delete(listingImages).where(eq(listingImages.listingId, id));
  if (input.images.length > 0) {
    await db.insert(listingImages).values(
      input.images.map((url, order) => ({ url, order, listingId: id }))
    );
  }
}

export async function deleteListing(id: string) {
  await db.delete(listings).where(eq(listings.id, id));
}

export async function getUserById(id: string) {
  return db.query.users.findFirst({ where: eq(users.id, id) });
}

export async function getMessagesForOwner(ownerId: string) {
  const rows = await db
    .select({
      id: contactMessages.id,
      name: contactMessages.name,
      email: contactMessages.email,
      phone: contactMessages.phone,
      message: contactMessages.message,
      createdAt: contactMessages.createdAt,
      listingId: listings.id,
      listingTitle: listings.title,
    })
    .from(contactMessages)
    .innerJoin(listings, eq(contactMessages.listingId, listings.id))
    .where(eq(listings.ownerId, ownerId))
    .orderBy(desc(contactMessages.createdAt));

  return rows;
}
