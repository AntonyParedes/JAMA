import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Croissant,
  CakeSlice,
  Cookie,
  Search,
  ShoppingBag,
  Footprints,
  Leaf,
  ShieldCheck,
  Heart,
  Store,
  Home,
  Sparkles,
  Info,
} from "lucide-react";
import { offerRepository } from "./services/offers";
import type { Category, Offer } from "./types/offer";
import { OfferCard } from "./components/OfferCard";
import { OfferDialog } from "./components/OfferDialog";
import { PartnerForm } from "./components/PartnerForm";
const categories = [
  { name: "Todas", icon: Sparkles },
  { name: "Tortas", icon: CakeSlice },
  { name: "Panadería", icon: Croissant },
  { name: "Dulces", icon: Cookie },
] as const;
function Logo() {
  return (
    <span className="logo">
      <img src="/images/jama-logo.webp" alt="JAMA" />
    </span>
  );
}
export default function App() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [category, setCategory] = useState<Category>("Todas");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Offer | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    offerRepository
      .list()
      .then((data) => {
        if (active) setOffers(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const shown = offers.filter(
    (offer) =>
      (category === "Todas" || offer.category === category) &&
      offer.name
        .toLocaleLowerCase("es")
        .includes(query.toLocaleLowerCase("es").trim()),
  );
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#inicio" aria-label="JAMA, inicio">
            <Logo />
          </a>
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#ofertas">Explorar ofertas</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#beneficios">Por qué JAMA</a>
          </nav>
          <a className="header-cta" href="#aliados">
            Soy un negocio <ArrowUpRight size={18} />
          </a>
        </div>
      </header>
      <main id="main" className="selection:bg-lime selection:text-navy">
        <section className="hero container" id="inicio">
          <div className="hero-copy">
            <span className="location">
              <MapPin size={15} /> Hecho para Ayacucho{" "}
              <span className="location-dot" />
            </span>
            <h1>
              Comida rica de hoy, <br />
              <span>más barata</span> <br />y cerca de ti.
            </h1>
            <p>
              Tu antojo de siempre, al precio de cierre.
              <br />
              Descubre pan y dulces que merecen otra oportunidad.
            </p>
            <a className="button primary" href="#ofertas">
              Encuentra tu próxima jama <ArrowRight size={20} />
            </a>
            <div className="hero-footnote">
              <span className="small-icon">
                <Leaf size={19} />
              </span>
              <span>
                Bueno para tu bolsillo.
                <br />
                <strong>Mejor para el planeta.</strong>
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              className="hero-image"
              src="/images/bakery.webp"
              alt="Panes artesanales recién horneados en una panadería"
              fetchPriority="high"
            />
            <div className="hero-stamp">
              <Croissant size={25} />
              <span>
                DEL HORNO
                <br />
                <strong>A TU BARRIO</strong>
              </span>
            </div>
            <div className="hero-caption">
              <span>EL ÚLTIMO ANTOJO DEL DÍA</span>
              <p>
                Lo bueno se comparte.
                <br />
                No se desperdicia.
              </p>
              <a href="#ofertas" aria-label="Ver catálogo">
                <ArrowUpRight size={25} />
              </a>
            </div>
          </div>
        </section>
        <div className="trust-strip">
          <div className="container">
            <span>
              <Croissant size={20} /> Producto del mismo día
            </span>
            <span>
              <ShieldCheck size={20} /> Precios claros
            </span>
            <span>
              <MapPin size={20} /> Recojo en tu barrio
            </span>
          </div>
        </div>
        <section className="section container" id="ofertas">
          <div className="section-heading">
            <div>
              <span className="eyebrow">LA JAMA DE HOY</span>
              <h2>
                Un buen antojo.
                <br className="mobile-only" /> Un mejor precio.
              </h2>
              <p>Así se verán las ofertas de cierre de tu barrio.</p>
            </div>
            <span className="area-label">
              <MapPin size={17} /> Ayacucho
            </span>
          </div>
          <div className="catalog-toolbar">
            <div className="filters" aria-label="Filtrar por categoría">
              {categories.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  aria-pressed={category === name}
                  className={category === name ? "filter active" : "filter"}
                  onClick={() => setCategory(name)}
                >
                  <Icon size={18} />
                  {name}
                </button>
              ))}
            </div>
            <label className="search">
              <Search size={19} />
              <input
                aria-label="Buscar ofertas"
                type="search"
                placeholder="¿Qué se te antoja?"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>
          <p className="catalog-disclaimer">
            <Info size={16} /> Catálogo demo · Fotos ilustrativas, productos y
            precios de ejemplo. No hay ofertas reales ni reservas.
          </p>
          <div className="offer-grid" aria-live="polite" aria-busy={loading}>
            {loading ? (
              <p>Cargando ejemplos…</p>
            ) : error ? (
              <p role="alert">
                No pudimos cargar el catálogo. Intenta recargar la página.
              </p>
            ) : shown.length ? (
              shown.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onSelect={setSelected}
                />
              ))
            ) : (
              <div className="empty-state">
                <Search size={30} />
                <h3>No encontramos ese antojo.</h3>
                <p>Prueba otra categoría o búsqueda.</p>
                <button
                  className="button secondary"
                  onClick={() => {
                    setCategory("Todas");
                    setQuery("");
                  }}
                >
                  Ver todos los ejemplos
                </button>
              </div>
            )}
          </div>
        </section>
        <section className="how-section" id="como-funciona">
          <div className="container">
            <div className="center-heading">
              <span className="eyebrow">SIN VUELTAS. CON MUCHO SABOR.</span>
              <h2>Del mostrador a tus manos.</h2>
              <p>Así funcionará JAMA cuando abramos las ofertas reales.</p>
            </div>
            <div className="steps">
              {[
                {
                  icon: Search,
                  title: "Encuentra tu antojo",
                  text: "Mira el producto, su elaboración y el precio de cierre.",
                },
                {
                  icon: ShoppingBag,
                  title: "Elige con confianza",
                  text: "Revisa los detalles. Las reservas llegarán en una próxima etapa.",
                },
                {
                  icon: Footprints,
                  title: "Recoge en el local",
                  text: "En el horario indicado, cerca de ti y sin costo de envío.",
                },
              ].map(({ icon: Icon, title, text }, index) => (
                <article className="step" key={title}>
                  <div className="step-icon">
                    <Icon size={30} />
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section container benefits" id="beneficios">
          <div className="benefits-title">
            <span className="eyebrow">CADA ANTOJO CUENTA</span>
            <h2>
              Aquí nada
              <br />
              bueno se bota<span>.</span>
            </h2>
            <p>Una idea sencilla que le hace bien a todos.</p>
            <a href="#aliados" className="text-link">
              Crezcamos en Ayacucho <ArrowUpRight size={19} />
            </a>
          </div>
          <div className="benefits-list">
            {[
              {
                icon: Heart,
                title: "Más sabor, menos gasto",
                text: "Disfruta lo que te gusta con precios de cierre claros.",
              },
              {
                icon: Leaf,
                title: "Menos desperdicio",
                text: "El producto bueno merece llegar a una mesa.",
              },
              {
                icon: Store,
                title: "Un barrio que crece",
                text: "Apoya a las panaderías y pastelerías de tu comunidad.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <div className="benefit-icon">
                  <Icon size={25} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="partner-section" id="aliados">
          <div className="container partner-layout">
            <div className="partner-copy">
              <span className="eyebrow">PARA PANADERÍAS Y PASTELERÍAS</span>
              <h2>
                Lo que te queda
                <br />
                puede ser el antojo
                <br />
                de alguien más.
              </h2>
              <p>
                Dale una nueva oportunidad a tu producto del día y conecta con
                tu barrio.
              </p>
              <div className="partner-checks">
                <span>
                  <ShieldCheck size={20} /> Tu producto, con toda la
                  transparencia
                </span>
                <span>
                  <Store size={20} /> Recojo directo en tu local
                </span>
                <span>
                  <Heart size={20} /> Una comunidad que compra cerca
                </span>
              </div>
              <span className="pilot-note">
                Proyecto en etapa piloto · Ayacucho, Perú
              </span>
            </div>
            <PartnerForm />
          </div>
        </section>
      </main>
      <footer className="container footer">
        <a href="#inicio" aria-label="Volver al inicio de JAMA">
          <Logo />
        </a>
        <p>
          La jama de hoy, al precio de cierre.
          <br />
          <span>Ayacucho, Perú · Primera versión demostrativa</span>
        </p>
        <a href="#ofertas">
          Explora el catálogo <ArrowUpRight size={16} />
        </a>
      </footer>
      <nav className="bottom-nav" aria-label="Navegación móvil">
        <a href="#inicio">
          <Home size={22} />
          Inicio
        </a>
        <a href="#ofertas">
          <Search size={22} />
          Ofertas
        </a>
        <a href="#como-funciona">
          <Footprints size={22} />
          Cómo funciona
        </a>
        <a href="#aliados">
          <Store size={22} />
          Aliados
        </a>
      </nav>
      {selected && (
        <OfferDialog offer={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
