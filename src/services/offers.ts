import { demoOffers } from "../data/offers";
import type { OfferRepository } from "../types/offer";
// Replace this adapter with a Supabase implementation when real offers are available.
// UI components depend on OfferRepository rather than a database client.
export const offerRepository: OfferRepository = {
  async list() {
    return demoOffers;
  },
};
