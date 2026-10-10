import { ArrowUpRight, Clock3 } from "lucide-react";
import type { Offer } from "../types/offer";
export const soles = (amount: number) => `S/ ${amount.toFixed(2)}`;
export function OfferCard({
  offer,
  onSelect,
}: {
  offer: Offer;
  onSelect: (offer: Offer) => void;
}) {
  const discount = Math.round((1 - offer.price / offer.originalPrice) * 100);
  return (
    <article className="offer-card">
      <button
        className="offer-photo"
        onClick={() => onSelect(offer)}
        aria-label={`Ver detalles de ${offer.name}`}
      >
        <img src={offer.image} alt={offer.imageAlt} loading="lazy" />
        <span className="discount">−{discount}%</span>
        <span className="photo-note">Foto ilustrativa</span>
      </button>
      <div className="offer-content">
        <div className="card-meta">
          <span>{offer.category}</span>
          <span>DEMO</span>
        </div>
        <h3>{offer.name}</h3>
        <p className="pickup">
          <Clock3 size={15} /> Recojo de ejemplo · {offer.pickup}
        </p>
        <div className="card-bottom">
          <div>
            <del>{soles(offer.originalPrice)}</del>
            <strong>{soles(offer.price)}</strong>
          </div>
          <button
            className="round-button"
            onClick={() => onSelect(offer)}
            aria-label={`Explorar ${offer.name}`}
          >
            <ArrowUpRight size={22} />
          </button>
        </div>
      </div>
    </article>
  );
}
