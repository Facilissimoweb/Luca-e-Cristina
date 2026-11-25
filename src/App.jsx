import React, { useMemo, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { formatNames, formatPrice, menuItems } from "./data/menu.js";
import { useCart } from "./context/CartContext.jsx";

const phone = "+393492384245";
const address = "Corso Camillo Benso Conte di Cavour 48, 62100 Macerata";
const mapSearch = encodeURIComponent(address);

function Icon({ children, className = "" }) {
  return <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>{children}</span>;
}

function SiteLayout() {
  const { count } = useCart();
  const navItems = [
    { to: "/", label: "Home", icon: "home", end: true },
    { to: "/menu", label: "Menu", icon: "local_pizza" },
    { to: "/carrello", label: "Carrello", icon: "shopping_bag" },
    { to: "/dove-siamo", label: "Dove siamo", icon: "map" },
  ];

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="Pizza in Corso, pagina iniziale">
            <span className="brand-mark"><Icon>local_pizza</Icon></span>
            <span><strong>Pizza in Corso</strong><small>MACERATA · SOLO ASPORTO</small></span>
          </Link>
          <nav className="desktop-nav" aria-label="Navigazione principale">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/impasto">Il nostro impasto</NavLink>
            <NavLink to="/orari">Orari</NavLink>
            <NavLink to="/dove-siamo">Dove siamo</NavLink>
          </nav>
          <div className="header-actions">
            <a className="phone-link" href={`tel:${phone}`} aria-label="Chiama Pizza in Corso">
              <Icon>call</Icon><span>349 238 4245</span>
            </a>
            <Link className="cart-shortcut" to="/carrello" aria-label={`Apri carrello, ${count} articoli`}>
              <Icon>shopping_bag</Icon><span className="cart-count">{count}</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="page-main"><Outlet /></main>
      <footer className="site-footer">
        <Link className="footer-brand" to="/">Pizza in Corso</Link>
        <span>Corso Cavour 48 · Macerata</span>
        <a href={`tel:${phone}`}>349 238 4245</a>
      </footer>
      <nav className="mobile-nav" aria-label="Navigazione">
        {navItems.map(({ to, label, icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>
            <span className="nav-icon-wrap"><Icon>{icon}</Icon>{label === "Carrello" && count > 0 && <span className="nav-count">{count}</span>}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

function HomePage() {
  const featured = ["emiliana", "patatosa", "primavera"]
    .map((id) => menuItems.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <div className="content">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="status-dot" /> PINSERIA E PIZZA AL TAGLIO · MACERATA</span>
          <h1>La pinsa buona<br />ha il suo <em>corso.</em></h1>
          <p>Impasto a lunga lievitazione, ingredienti scelti e tutto il gusto della pizza romana. Da ritirare calda in Corso Cavour.</p>
          <div className="button-row">
            <Link className="button button-primary" to="/menu"><Icon>restaurant_menu</Icon> Guarda il menu</Link>
            <a className="button button-secondary" href={`tel:${phone}`}><Icon>call</Icon> Chiama e ordina</a>
          </div>
          <div className="hero-meta"><span><Icon>takeout_dining</Icon> Solo asporto</span><span><Icon>schedule</Icon> Mar–Dom · 16:00–21:00</span></div>
        </div>
        <div className="hero-art" role="img" aria-label="Pinsa appena sfornata">
          <div className="hero-art-label"><Icon>local_fire_department</Icon> Appena sfornata</div>
          <div className="hero-art-circle">72<small>ORE</small></div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="eyebrow">DAL NOSTRO BANCO</span><h2>Le più amate</h2></div>
          <Link className="text-link" to="/menu">Tutto il menu <Icon>arrow_forward</Icon></Link>
        </div>
        <div className="product-grid">
          {featured.map((item) => <ProductCard key={item.id} item={item} />)}
        </div>
      </section>

      <section className="home-info-grid">
        <InfoTile icon="bakery_dining" title="Impasto lento" text="Maturazione naturale di 72 ore: fuori croccante, dentro morbido." to="/impasto" link="Scopri come lo facciamo" />
        <InfoTile icon="near_me" title="Ci trovi in centro" text="Ritiro da asporto in Corso Cavour 48, nel cuore di Macerata." to="/dove-siamo" link="Indicazioni stradali" />
        <InfoTile icon="schedule" title="Ordina in anticipo" text="Chiamaci per concordare il ritiro e trovare la pinsa appena pronta." to="/orari" link="Orari e contatti" />
      </section>
    </div>
  );
}

function InfoTile({ icon, title, text, to, link }) {
  return <article className="info-tile"><Icon>{icon}</Icon><h3>{title}</h3><p>{text}</p><Link className="text-link" to={to}>{link} <Icon>arrow_forward</Icon></Link></article>;
}

function ProductCard({ item }) {
  const { addItem } = useCart();
  const formats = Object.keys(item.prices);
  return (
    <article className="product-card">
      <div className={`product-art art-${item.id}`}><span className="pizza-emoji" aria-hidden="true">🍕</span>{item.badge && <span className="product-badge">{item.badge}</span>}</div>
      <div className="product-info">
        <Link className="product-title" to={`/pizza/${item.id}`}>{item.name}</Link>
        <p>{item.description}</p>
        <div className="product-prices">
          {formats.map((format) => (
            <button key={format} className="price-action" type="button" onClick={() => addItem(item.id, format)}>
              <span>{formatNames[format]}</span><strong>{formatPrice(item.prices[format])}</strong><Icon>add</Icon>
            </button>
          ))}
        </div>
        <Link className="details-link" to={`/pizza/${item.id}`}>Dettagli <Icon>arrow_forward</Icon></Link>
      </div>
    </article>
  );
}

function MenuPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("tutte");
  const categories = [
    ["tutte", "Tutte"], ["intera", "Pinsa intera"], ["taglio", "Al taglio"],
    ["bianche", "Bianche"], ["speciali", "Speciali"],
  ];
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("it");
    return menuItems.filter((item) => {
      const matchesText = !normalized || `${item.name} ${item.description} ${item.ingredients}`.toLocaleLowerCase("it").includes(normalized);
      return matchesText && (category === "tutte" || item.tags.includes(category));
    });
  }, [query, category]);

  return (
    <div className="content inner-page">
      <PageIntro eyebrow="FATTO CON CURA, ORDINATO FACILE" title="Il menu" text="Scegli una specialità, il formato e aggiungila al carrello. Puoi poi inviarci l'ordine su WhatsApp." />
      <div className="menu-tools">
        <label className="search-field"><Icon>search</Icon><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cerca pizza o ingrediente" aria-label="Cerca nel menu" /></label>
        <div className="category-list" role="group" aria-label="Filtra per categoria">
          {categories.map(([key, label]) => <button key={key} type="button" className={`chip ${category === key ? "selected" : ""}`} onClick={() => setCategory(key)}>{label}</button>)}
        </div>
      </div>
      {filtered.length ? <div className="product-grid">{filtered.map((item) => <ProductCard key={item.id} item={item} />)}</div> : <div className="empty-panel"><Icon>search_off</Icon><h2>Nessun risultato</h2><p>Prova a cercare un altro ingrediente o rimuovi il filtro.</p></div>}
      <p className="menu-note">I prezzi e la disponibilità possono variare: chiamaci per confermare il tuo ordine.</p>
    </div>
  );
}

function PageIntro({ eyebrow, title, text }) {
  return <div className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>;
}

function PizzaPage() {
  const { pizzaId } = useParams();
  const item = menuItems.find((candidate) => candidate.id === pizzaId);
  if (!item) return <Navigate to="/menu" replace />;
  return <PizzaDetails key={item.id} item={item} />;
}

function PizzaDetails({ item }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const formats = Object.keys(item.prices);
  const [format, setFormat] = useState(formats[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const add = () => {
    addItem(item.id, format, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="content inner-page">
      <Link to="/menu" className="back-link"><Icon>arrow_back</Icon> Torna al menu</Link>
      <section className="detail-layout">
        <div className={`detail-art art-${item.id}`}><span className="pizza-emoji" aria-hidden="true">🍕</span></div>
        <div className="detail-copy">
          <span className="eyebrow">PIZZA IN CORSO · FATTA A MANO</span>
          <h1>{item.name}</h1>
          <p className="detail-description">{item.description}</p>
          <div className="detail-facts"><span><Icon>schedule</Icon> Lievitazione 72 ore</span><span><Icon>takeout_dining</Icon> Solo asporto</span></div>
          <h2>Scegli il formato</h2>
          <div className="format-options">
            {formats.map((option) => (
              <label key={option} className={`format-option ${format === option ? "chosen" : ""}`}>
                <input type="radio" name="format" value={option} checked={format === option} onChange={() => setFormat(option)} />
                <span><strong>{formatNames[option]}</strong><small>{option === "taglio" ? "Una porzione, perfetta per uno spuntino" : "La teglia intera da condividere"}</small></span>
                <b>{formatPrice(item.prices[option])}</b>
              </label>
            ))}
          </div>
          <div className="add-row">
            <div className="stepper">
              <button type="button" aria-label="Diminuisci quantità" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Icon>remove</Icon></button>
              <span>{quantity}</span>
              <button type="button" aria-label="Aumenta quantità" onClick={() => setQuantity((value) => value + 1)}><Icon>add</Icon></button>
            </div>
            <button className="button button-primary add-button" type="button" onClick={add}><Icon>{added ? "check" : "shopping_bag"}</Icon>{added ? "Aggiunta al carrello" : `Aggiungi · ${formatPrice(item.prices[format] * quantity)}`}</button>
          </div>
          {added && <p className="success-message" role="status">{quantity} × {item.name} aggiunta al carrello. <button type="button" onClick={() => navigate("/carrello")}>Vai al carrello</button></p>}
          <p className="small-note">Per informazioni su ingredienti e allergeni, contattaci prima di ordinare.</p>
        </div>
      </section>
    </div>
  );
}

function CartPage() {
  const { items, setQuantity, clearCart, count } = useCart();
  const [pickup, setPickup] = useState("Prima possibile");
  const cartItems = items.map((cartItem) => ({
    ...cartItem,
    product: menuItems.find((item) => item.id === cartItem.productId),
  })).filter((item) => item.product);
  const total = cartItems.reduce((sum, item) => sum + item.product.prices[item.format] * item.quantity, 0);
  const orderLines = cartItems.map((item) => `${item.quantity} × ${item.product.name} (${formatNames[item.format]}) — ${formatPrice(item.product.prices[item.format] * item.quantity)}`);
  const message = `Ciao Pizza in Corso! Vorrei ordinare da asporto per il ritiro ${pickup.toLocaleLowerCase("it")}:\n${orderLines.join("\n")}\nTotale: ${formatPrice(total)}.`;
  const whatsappUrl = `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(message)}`;

  return (
    <div className="content inner-page">
      <PageIntro eyebrow="IL TUO ORDINE DA ASPORTO" title="Il carrello" text="Controlla quantità e formati. Per confermare, invia il riepilogo al nostro numero WhatsApp." />
      {cartItems.length === 0 ? (
        <div className="empty-panel"><Icon>shopping_bag</Icon><h2>Il carrello è vuoto</h2><p>Le tue pizze preferite ti aspettano nel menu.</p><Link className="button button-primary" to="/menu">Vai al menu <Icon>arrow_forward</Icon></Link></div>
      ) : (
        <div className="cart-layout">
          <section className="cart-list" aria-label="Articoli nel carrello">
            <div className="cart-heading"><h2>Articoli <span className="count-pill">{count}</span></h2><button className="quiet-button" type="button" onClick={clearCart}>Svuota carrello</button></div>
            {cartItems.map(({ product, format, quantity }) => (
              <article className="cart-item" key={`${product.id}:${format}`}>
                <div className={`cart-thumb art-${product.id}`} aria-hidden="true">🍕</div>
                <div className="cart-product"><Link to={`/pizza/${product.id}`}>{product.name}</Link><span>{formatNames[format]}</span><small>{formatPrice(product.prices[format])} cad.</small></div>
                <div className="cart-controls"><div className="stepper compact"><button type="button" aria-label={`Rimuovi una unità di ${product.name}`} onClick={() => setQuantity(product.id, format, quantity - 1)}><Icon>remove</Icon></button><span>{quantity}</span><button type="button" aria-label={`Aggiungi una unità di ${product.name}`} onClick={() => setQuantity(product.id, format, quantity + 1)}><Icon>add</Icon></button></div><strong>{formatPrice(product.prices[format] * quantity)}</strong></div>
              </article>
            ))}
            <Link className="text-link continue-link" to="/menu"><Icon>arrow_back</Icon> Continua gli acquisti</Link>
          </section>
          <aside className="order-summary">
            <h2>Riepilogo</h2>
            <label className="pickup-select">Quando vuoi ritirare?
              <select value={pickup} onChange={(event) => setPickup(event.target.value)}>
                <option>Prima possibile</option><option>Tra circa 30 minuti</option><option>Tra circa un'ora</option>
              </select>
            </label>
            <div className="summary-line"><span>Articoli</span><span>{count}</span></div>
            <div className="summary-line total-line"><strong>Totale</strong><strong>{formatPrice(total)}</strong></div>
            <p className="small-note">Il pagamento avviene al ritiro. L'ordine sarà confermato dopo averci contattato.</p>
            <a className="button button-primary full-button" href={whatsappUrl} target="_blank" rel="noreferrer"><Icon>chat</Icon> Invia ordine su WhatsApp</a>
            <a className="call-order" href={`tel:${phone}`}><Icon>call</Icon> Oppure chiama 349 238 4245</a>
          </aside>
        </div>
      )}
    </div>
  );
}

function LocationPage() {
  const [copyMessage, setCopyMessage] = useState("");
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopyMessage("Indirizzo copiato.");
    } catch (error) {
      console.error("Impossibile copiare l'indirizzo.", error);
      setCopyMessage("Copia non disponibile: seleziona l'indirizzo qui sopra.");
    }
  };

  return (
    <div className="content inner-page">
      <PageIntro eyebrow="PASSA A TROVARCI" title="Dove siamo" text="Pizza in Corso è in Corso Cavour, nel centro di Macerata. Prepariamo ordini esclusivamente da asporto." />
      <section className="location-layout">
        <div className="map-frame"><iframe title="Mappa di Pizza in Corso, Macerata" src={`https://maps.google.com/maps?q=${mapSearch}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        <div className="location-card">
          <span className="location-icon"><Icon>storefront</Icon></span><span className="eyebrow">PUNTO RITIRO</span>
          <h2>Pizza in Corso</h2><p>{address}</p>
          <div className="button-stack">
            <a className="button button-primary full-button" href={`https://www.google.com/maps/search/?api=1&query=${mapSearch}`} target="_blank" rel="noreferrer"><Icon>directions</Icon> Apri indicazioni</a>
            <button className="button button-secondary full-button" type="button" onClick={copyAddress}><Icon>content_copy</Icon> Copia indirizzo</button>
            <a className="call-order" href={`tel:${phone}`}><Icon>call</Icon> 349 238 4245</a>
          </div>
          <p className="small-note" role="status">{copyMessage || "Solo ritiro in negozio; chiama per concordare l'orario."}</p>
        </div>
      </section>
      <div className="location-tip"><Icon>lightbulb</Icon><p><strong>Un consiglio:</strong> chiamaci prima di partire, così prepariamo il tuo ordine e riduci l'attesa al banco.</p><Link className="text-link" to="/menu">Scegli cosa ordinare <Icon>arrow_forward</Icon></Link></div>
    </div>
  );
}

function DoughPage() {
  return (
    <div className="content inner-page">
      <PageIntro eyebrow="IL SEGRETO È IL TEMPO" title="Un impasto fatto con calma" text="La nostra pinsa nasce da un impasto ad alta idratazione e da una lunga maturazione: lavorazione artigianale, pensata per portare in tavola una base fragrante e leggera." />
      <section className="dough-feature"><div className="dough-number">72<span>ore</span></div><div><span className="eyebrow">MATURAZIONE LENTA</span><h2>Fuori croccante,<br />dentro morbida.</h2><p>Prepariamo l'impasto con una miscela di farine e lo lasciamo maturare a freddo. Il risultato è una pinsa con alveolatura evidente e una consistenza piacevole, pronta da gustare appena sfornata.</p><Link className="button button-primary" to="/menu">Assaggia dal menu <Icon>arrow_forward</Icon></Link></div></section>
      <div className="home-info-grid"><InfoTile icon="bakery_dining" title="Lavorazione artigianale" text="Impasto preparato e lavorato con cura nel nostro laboratorio." to="/menu" link="Scopri le specialità" /><InfoTile icon="takeout_dining" title="Sempre da asporto" text="Ritira il tuo ordine caldo al banco, senza servizio al tavolo." to="/dove-siamo" link="Dove ritirare" /></div>
    </div>
  );
}

function HoursPage() {
  return (
    <div className="content inner-page">
      <PageIntro eyebrow="ORGANIZZA IL TUO RITIRO" title="Orari e contatti" text="Siamo qui per aiutarti a scegliere e ritirare la tua pizza. Per disponibilità e orari aggiornati, chiamaci prima di passare." />
      <section className="hours-card">
        <div className="hours-row"><Icon>schedule</Icon><span><strong>Orario riportato sul menu</strong><small>Da martedì a domenica · 16:00–21:00</small></span><span className="hours-badge">Verifica per telefono</span></div>
        <div className="hours-row"><Icon>call</Icon><span><strong>Ordini e informazioni</strong><small>349 238 4245</small></span><a className="button button-primary" href={`tel:${phone}`}>Chiama</a></div>
        <div className="hours-row"><Icon>pin_drop</Icon><span><strong>Ritiro da asporto</strong><small>Corso Cavour 48 · Macerata</small></span><Link className="button button-secondary" to="/dove-siamo">Apri mappa</Link></div>
      </section>
      <p className="menu-note">Gli orari possono cambiare in base alla giornata e alle disponibilità del forno. La telefonata è il modo più sicuro per confermare l'apertura e prenotare.</p>
    </div>
  );
}

function NotFoundPage() {
  return <div className="content inner-page"><div className="empty-panel"><Icon>travel_explore</Icon><h1>Pagina non trovata</h1><p>Il link potrebbe essere vecchio o non corretto.</p><Link className="button button-primary" to="/">Torna alla home</Link></div></div>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="pizza/:pizzaId" element={<PizzaPage />} />
        <Route path="carrello" element={<CartPage />} />
        <Route path="dove-siamo" element={<LocationPage />} />
        <Route path="impasto" element={<DoughPage />} />
        <Route path="orari" element={<HoursPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
