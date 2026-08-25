import {
  pgTable,
  text,
  integer,
  doublePrecision,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

function id() {
  return text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());
}

export const users = pgTable("users", {
  id: id(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  phone: text("phone"),
  isPlatformOwner: boolean("is_platform_owner").notNull().default(false),
  createdAt: timestamp("created_at")
    .notNull()
    .$defaultFn(() => new Date()),
});

// transactionType: "VENTA" | "RENTA"
// propertyType: "CASA" | "APARTAMENTO" | "CUARTO" | "ESTUDIO" | "OFICINA" | "LOCAL" | "TERRENO"
export const listings = pgTable("listings", {
  id: id(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  transactionType: text("transaction_type").notNull(),
  propertyType: text("property_type").notNull(),
  price: doublePrecision("price").notNull(),
  currency: text("currency").notNull().default("MXN"),
  city: text("city").notNull(),
  neighborhood: text("neighborhood"),
  address: text("address"),
  bedrooms: integer("bedrooms"),
  bathrooms: doublePrecision("bathrooms"),
  areaM2: doublePrecision("area_m2"),
  furnished: boolean("furnished").notNull().default(false),
  utilitiesIncluded: boolean("utilities_included").notNull().default(false),
  privateBathroom: boolean("private_bathroom"),
  petsAllowed: boolean("pets_allowed").notNull().default(false),
  amenities: text("amenities"),
  availableFrom: timestamp("available_from"),
  isActive: boolean("is_active").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  featuredUntil: timestamp("featured_until"),
  createdAt: timestamp("created_at")
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$defaultFn(() => new Date()),
  ownerId: text("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const listingImages = pgTable("listing_images", {
  id: id(),
  url: text("url").notNull(),
  order: integer("order").notNull().default(0),
  listingId: text("listing_id")
    .notNull()
    .references(() => listings.id, { onDelete: "cascade" }),
});

export const contactMessages = pgTable("contact_messages", {
  id: id(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .$defaultFn(() => new Date()),
  listingId: text("listing_id")
    .notNull()
    .references(() => listings.id, { onDelete: "cascade" }),
  senderId: text("sender_id").references(() => users.id, { onDelete: "set null" }),
});

export const usersRelations = relations(users, ({ many }) => ({
  listings: many(listings),
  sentMessages: many(contactMessages),
}));

export const listingsRelations = relations(listings, ({ one, many }) => ({
  owner: one(users, { fields: [listings.ownerId], references: [users.id] }),
  images: many(listingImages),
  messages: many(contactMessages),
}));

export const listingImagesRelations = relations(listingImages, ({ one }) => ({
  listing: one(listings, { fields: [listingImages.listingId], references: [listings.id] }),
}));

export const contactMessagesRelations = relations(contactMessages, ({ one }) => ({
  listing: one(listings, { fields: [contactMessages.listingId], references: [listings.id] }),
  sender: one(users, { fields: [contactMessages.senderId], references: [users.id] }),
}));
