import { useEffect, useRef } from "react";
import { X, Clock3, Info } from "lucide-react";
import type { Offer } from "../types/offer";
import { soles } from "./OfferCard";
export function OfferDialog({
  offer,
  onClose,
}: {
  offer: Offer;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef(document.activeElement as HTMLElement | null);
  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    return () => {
      dialog.close();
      previousFocus.current?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="offer-dialog"
      aria-labelledby="offer-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Cerrar detalles"
      >
        <X />
      </button>
      <img src={offer.image} alt={offer.imageAlt} />
      <div className="dialog-body">
        <span className="eyebrow">OFERTA DEMOSTRATIVA</span>
        <h2 id="offer-title">{offer.name}</h2>
        <p>{offer.description}</p>
        <div className="dialog-prices">
          <del>{soles(offer.originalPrice)}</del>
          <strong>{soles(offer.price)}</strong>
        </div>
        <p>
          <Clock3 size={18} /> Elaboración de ejemplo: {offer.preparedAt}
          <br />
          Recojo de ejemplo: {offer.pickup}
        </p>
        <div className="demo-note">
          <Info size={20} />
          <span>
            No está a la venta. Las reservas y los pagos todavía no están
            disponibles.
          </span>
        </div>
        <button className="button primary" onClick={onClose}>
          Seguir explorando
        </button>
      </div>
    </dialog>
  );
}
