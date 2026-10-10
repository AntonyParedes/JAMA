export type Category = "Todas" | "Tortas" | "Panadería" | "Dulces";
export interface Offer {
  id: string;
  name: string;
  category: Exclude<Category, "Todas">;
  image: string;
  imageAlt: string;
  originalPrice: number;
  price: number;
  preparedAt: string;
  pickup: string;
  description: string;
}
export interface OfferRepository {
  list(): Promise<Offer[]>;
}
