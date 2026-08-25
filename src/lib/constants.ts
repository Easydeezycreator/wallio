export const TRANSACTION_TYPES = [
  { value: "VENTA", label: "Venta" },
  { value: "RENTA", label: "Renta" },
] as const;

export const PROPERTY_TYPES = [
  { value: "CASA", label: "Casa" },
  { value: "APARTAMENTO", label: "Apartamento" },
  { value: "CUARTO", label: "Cuarto en renta" },
  { value: "ESTUDIO", label: "Estudio" },
  { value: "OFICINA", label: "Oficina" },
  { value: "LOCAL", label: "Local comercial" },
  { value: "TERRENO", label: "Terreno" },
] as const;

export const CURRENCIES = ["EUR"] as const;

// Plan de "anuncio destacado": precio y duración.
// TODO(pagos): cuando se conecte Stripe, este precio se usará para crear la
// sesión de pago (Stripe Checkout) antes de activar el destacado.
export const FEATURED_PRICE_EUR = 9;
export const FEATURED_DAYS = 14;

export type TransactionType = (typeof TRANSACTION_TYPES)[number]["value"];
export type PropertyType = (typeof PROPERTY_TYPES)[number]["value"];

export function transactionLabel(value: string) {
  return TRANSACTION_TYPES.find((t) => t.value === value)?.label ?? value;
}

export function propertyLabel(value: string) {
  return PROPERTY_TYPES.find((t) => t.value === value)?.label ?? value;
}

export function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
