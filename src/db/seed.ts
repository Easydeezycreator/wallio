import "dotenv/config";
import { db } from "./index";
import { users, listings, listingImages } from "./schema";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Sembrando datos de ejemplo…");

  const passwordHash = await bcrypt.hash("demo1234", 10);

  const [demoUser] = await db
    .insert(users)
    .values({
      name: "Ana Demo",
      email: "demo@habita.com",
      passwordHash,
      phone: "612345678",
    })
    .returning();

  const sampleListings = [
    {
      title: "Casa de 3 habitaciones con jardín",
      description:
        "Amplia casa familiar en zona tranquila, con jardín, garaje para dos coches y cerca de colegios y supermercados.",
      transactionType: "VENTA",
      propertyType: "CASA",
      price: 385000,
      currency: "EUR",
      city: "Madrid",
      neighborhood: "Las Rozas",
      bedrooms: 3,
      bathrooms: 2.5,
      areaM2: 180,
      furnished: false,
      utilitiesIncluded: false,
      petsAllowed: true,
      amenities: "Jardín, garaje para 2 coches, trastero.",
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      ],
    },
    {
      title: "Piso moderno cerca del centro",
      description:
        "Piso de una habitación totalmente reformado, a 5 minutos andando del centro histórico. Ideal para profesionales.",
      transactionType: "RENTA",
      propertyType: "APARTAMENTO",
      price: 950,
      currency: "EUR",
      city: "Barcelona",
      neighborhood: "Gràcia",
      bedrooms: 1,
      bathrooms: 1,
      areaM2: 55,
      furnished: true,
      utilitiesIncluded: true,
      petsAllowed: false,
      amenities: "Ascensor, lavandería en el edificio, seguridad 24h.",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      ],
    },
    {
      title: "Habitación amueblada cerca de la universidad",
      description:
        "Habitación amplia y luminosa en piso compartido con 2 estudiantes más. Ambiente tranquilo, ideal para estudiantes.",
      transactionType: "RENTA",
      propertyType: "CUARTO",
      price: 380,
      currency: "EUR",
      city: "Valencia",
      neighborhood: "Cerca de la Universitat de València",
      furnished: true,
      utilitiesIncluded: true,
      privateBathroom: false,
      petsAllowed: false,
      amenities: "Cocina y salón compartidos, lavandería, wifi incluido, no fumadores.",
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      ],
    },
    {
      title: "Habitación con baño privado, piso compartido",
      description:
        "Habitación con baño privado dentro de piso compartido con 3 personas más, ambiente profesional y respetuoso.",
      transactionType: "RENTA",
      propertyType: "CUARTO",
      price: 450,
      currency: "EUR",
      city: "Sevilla",
      neighborhood: "Nervión",
      furnished: true,
      utilitiesIncluded: true,
      privateBathroom: true,
      petsAllowed: false,
      amenities: "Cocina compartida, zona de trabajo común, plaza de aparcamiento.",
      images: [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
      ],
    },
    {
      title: "Estudio pequeño y práctico",
      description:
        "Estudio compacto, perfecto para una persona. Cerca del transporte público y zonas comerciales.",
      transactionType: "RENTA",
      propertyType: "ESTUDIO",
      price: 650,
      currency: "EUR",
      city: "Málaga",
      neighborhood: "Centro",
      areaM2: 32,
      furnished: true,
      utilitiesIncluded: false,
      petsAllowed: true,
      amenities: "Cocina equipada, armario amplio.",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      ],
    },
  ];

  for (const item of sampleListings) {
    const { images, ...data } = item;
    const [listing] = await db
      .insert(listings)
      .values({ ...data, ownerId: demoUser.id })
      .returning();

    if (images.length > 0) {
      await db.insert(listingImages).values(
        images.map((url, order) => ({ url, order, listingId: listing.id }))
      );
    }
  }

  console.log("Listo. Usuario de prueba: demo@habita.com / demo1234");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
