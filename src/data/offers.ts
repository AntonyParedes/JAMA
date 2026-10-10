import type { Offer } from "../types/offer";
export const demoOffers: Offer[] = [
  {
    id: "torta",
    name: "Torta de chocolate",
    category: "Tortas",
    image: "/images/chocolate.webp",
    imageAlt: "Porción de torta de chocolate, imagen ilustrativa",
    originalPrice: 25,
    price: 15,
    preparedAt: "08:00",
    pickup: "18:00–19:00",
    description:
      "Una porción para endulzar la tarde. Producto y precios de ejemplo; la foto es ilustrativa.",
  },
  {
    id: "pan",
    name: "Combo de pan artesanal",
    category: "Panadería",
    image: "/images/bread.webp",
    imageAlt: "Panadería artesanal",
    originalPrice: 16,
    price: 8,
    preparedAt: "07:00",
    pickup: "18:00–19:00",
    description:
      "Un combo para compartir en casa. Producto y precios de ejemplo; la foto es ilustrativa.",
  },
  {
    id: "dulce",
    name: "Croissants de mantequilla",
    category: "Dulces",
    image: "/images/bakery.webp",
    imageAlt: "Croissants dorados y pan artesanal, imagen ilustrativa",
    originalPrice: 20,
    price: 12,
    preparedAt: "09:00",
    pickup: "18:00–19:00",
    description:
      "Un pequeño gusto para cerrar el día. Producto y precios de ejemplo; la foto es ilustrativa.",
  },
];
