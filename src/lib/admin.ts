import { db } from "@/db";
import { users, listings, contactMessages } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export async function isPlatformOwner(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { isPlatformOwner: true },
  });
  return Boolean(user?.isPlatformOwner);
}

export async function anyPlatformOwnerExists() {
  const owner = await db.query.users.findFirst({
    where: eq(users.isPlatformOwner, true),
    columns: { id: true },
  });
  return Boolean(owner);
}

export async function bootstrapOwner(userId: string) {
  await db.update(users).set({ isPlatformOwner: true }).where(eq(users.id, userId));
}

export async function getPlatformStats() {
  const [[userCount], [listingCount], [messageCount], [activeListingCount]] =
    await Promise.all([
      db.select({ value: count() }).from(users),
      db.select({ value: count() }).from(listings),
      db.select({ value: count() }).from(contactMessages),
      db.select({ value: count() }).from(listings).where(eq(listings.isActive, true)),
    ]);

  return {
    userCount: userCount?.value ?? 0,
    listingCount: listingCount?.value ?? 0,
    activeListingCount: activeListingCount?.value ?? 0,
    messageCount: messageCount?.value ?? 0,
  };
}

export async function getRecentUsers(limit = 20) {
  return db.query.users.findMany({
    orderBy: (u, { desc }) => desc(u.createdAt),
    limit,
    columns: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      isPlatformOwner: true,
    },
  });
}
