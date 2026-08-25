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
      phone: "5512345678",
    })
    .returning();

  const sampleListings = [
    {
      title: "Casa de 3 recámaras con jardín",
      description:
        "Amplia casa familiar en zona tranquila, con jardín, cochera para dos autos y cerca de escuelas y supermercados.",
      transactionType: "VENTA",
      propertyType: "CASA",
      price: 2450000,
      currency: "MXN",
      city: "Guadalajara",
      neighborhood: "Providencia",
      bedrooms: 3,
      bathrooms: 2.5,
      areaM2: 180,
      furnished: false,
      utilitiesIncluded: false,
      petsAllowed: true,
      amenities: "Jardín, cochera para 2 autos, cuarto de servicio.",
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      ],
    },
    {
      title: "Apartamento moderno cerca del centro",
      description:
        "Apartamento de una recámara totalmente renovado, a 5 minutos caminando del centro histórico. Ideal para profesionistas.",
      transactionType: "RENTA",
      propertyType: "APARTAMENTO",
      price: 9500,
      currency: "MXN",
      city: "Ciudad de México",
      neighborhood: "Roma Norte",
      bedrooms: 1,
      bathrooms: 1,
      areaM2: 55,
      furnished: true,
      utilitiesIncluded: true,
      petsAllowed: false,
      amenities: "Elevador, lavandería en el edificio, seguridad 24h.",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      ],
    },
    {
      title: "Cuarto amueblado cerca de la universidad",
      description:
        "Cuarto amplio y luminoso en casa compartida con 2 estudiantes más. Ambiente tranquilo, ideal para estudiantes.",
      transactionType: "RENTA",
      propertyType: "CUARTO",
      price: 3800,
      currency: "MXN",
      city: "Puebla",
      neighborhood: "Cerca de la BUAP",
      furnished: true,
      utilitiesIncluded: true,
      privateBathroom: false,
      petsAllowed: false,
      amenities: "Cocina y sala compartidas, lavandería, wifi incluido, no fumar.",
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      ],
    },
    {
      title: "Cuarto con baño privado, casa compartida",
      description:
        "Cuarto con baño privado dentro de casa compartida con 3 personas más, ambiente profesional y respetuoso.",
      transactionType: "RENTA",
      propertyType: "CUARTO",
      price: 5200,
      currency: "MXN",
      city: "Monterrey",
      neighborhood: "San Pedro",
      furnished: true,
      utilitiesIncluded: true,
      privateBathroom: true,
      petsAllowed: false,
      amenities: "Cocina compartida, área de trabajo común, estacionamiento.",
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
      price: 6800,
      currency: "MXN",
      city: "Guadalajara",
      neighborhood: "Chapultepec",
      areaM2: 32,
      furnished: true,
      utilitiesIncluded: false,
      petsAllowed: true,
      amenities: "Cocineta equipada, closet amplio.",
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
