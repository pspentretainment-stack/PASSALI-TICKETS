
import { useMemo, useState } from "react";
import {
  ArrowRight, CalendarDays, MapPin, Search, Ticket, Menu, X,
  Music2, PartyPopper, BriefcaseBusiness, Theater, ChevronDown
} from "lucide-react";

type EventItem = {
  id: number;
  title: string;
  category: string;
  city: string;
  country: string;
  date: string;
  price: string;
  image: string;
  tag: string;
};

const events: EventItem[] = [
  {
    id: 1,
    title: "Noites de Verão",
    category: "Música",
    city: "Porto",
    country: "Portugal",
    date: "20 JUN 2027",
    price: "Desde 18 €",
    tag: "Em destaque",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: 2,
    title: "Atlantic Sound Festival",
    category: "Festivais",
    city: "Praia",
    country: "Cabo Verde",
    date: "04 JUL 2027",
    price: "Desde 2.000 CVE",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: 3,
    title: "The Grand Experience",
    category: "Experiências",
    city: "Lisboa",
    country: "Portugal",
    date: "18 JUL 2027",
    price: "Desde 35 €",
    tag: "Experiência premium",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85"
  }
];

const categories = [
  { name: "Concertos", icon: Music2 },
  { name: "Festas", icon: PartyPopper },
  { name: "Conferências", icon: BriefcaseBusiness },
  { name: "Cultura", icon: Theater }
];

function App() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("Todos os destinos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const filteredEvents = useMemo(() => events.filter((event) => {
    const matchesQuery =
      `${event.title} ${event.city} ${event.category}`
        .toLowerCase()
        .includes(query.toLowerCase());

    const matchesCountry =
      country === "Todos os destinos" || event.country === country;

    return matchesQuery && matchesCountry;
  }), [query, country]);

  const showDemoNotice = () => {
    setNotice(
      "Esta é uma demonstração visual. A compra de bilhetes será ligada ao sistema de pagamentos numa fase seguinte."
    );
  };

  return (
    <div className="app-shell">
      <div className="topline">
        UMA NOVA FORMA DE VIVER EVENTOS
        <span>PORTUGAL · CABO VERDE</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#" aria-label="Passali Tickets início">
          <span className="brand-mark">
            <Ticket size={22} strokeWidth={1.8} />
          </span>
          <span className="brand-name">
            PASSALI<span>TICKETS</span>
          </span>
        </a>

        <nav className={menuOpen ? "main-nav open" : "main-nav"}>
          <a href="#eventos" onClick={() => setMenuOpen(false)}>
            Descobrir eventos
          </a>
          <a href="#categorias" onClick={() => setMenuOpen(false)}>
            Categorias
          </a>
          <a href="#organizadores" onClick={() => setMenuOpen(false)}>
            Para organizadores
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="text-button"
            onClick={() => setNotice("A área de autenticação será implementada na próxima fase.")}
          >
            Entrar
          </button>

          <button
            className="header-cta"
            onClick={() => setNotice("O registo de organizadores será disponibilizado numa próxima fase.")}
          >
            Criar conta <ArrowRight size={15} />
          </button>
        </div>

        <button
          className="mobile-menu"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-glow" />

          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              ACESSO A EXPERIÊNCIAS EXTRAORDINÁRIAS
            </div>

            <h1>
              Momentos que<br />
              <em>merecem ser vividos.</em>
            </h1>

            <p className="hero-copy">
              Descobre eventos, encontra novas experiências e garante o teu lugar.
              Tudo num só destino.
            </p>

            <a className="hero-link" href="#eventos">
              Explorar eventos <ArrowRight size={17} />
            </a>
          </div>

          <div className="hero-side-note">
            <span>01 / 03</span>
            <i />
            CURATED EXPERIENCES
          </div>

          <div className="search-panel">
            <label className="search-field">
              <Search size={19} />
              <span>
                <small>O QUE PROCURAS?</small>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nome do evento, artista ou cidade"
                />
              </span>
            </label>

            <label className="search-field destination-field">
              <MapPin size={19} />
              <span>
                <small>DESTINO</small>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option>Todos os destinos</option>
                  <option>Portugal</option>
                  <option>Cabo Verde</option>
                </select>
              </span>
              <ChevronDown className="select-chevron" size={15} />
            </label>

            <a className="search-button" href="#eventos">
              Pesquisar <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <section className="section categories-section" id="categorias">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                ENCONTRA O TEU PRÓXIMO MOMENTO
              </span>
              <h2>Explora por categoria</h2>
            </div>
            <span className="section-count">01 — CATEGORIAS</span>
          </div>

          <div className="category-grid">
            {categories.map(({ name, icon: Icon }) => (
              <button
                className="category-card"
                key={name}
                onClick={() => {
                  setQuery(
                    name === "Concertos" ? "Música" : name
                  );
                  document.getElementById("eventos")?.scrollIntoView({
                    behavior: "smooth"
                  });
                }}
              >
                <span className="category-icon">
                  <Icon size={21} />
                </span>
                <span>{name}</span>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        </section>

        <section className="section events-section" id="eventos">
          <div className="section-heading">
            <div>
              <span className="section-kicker">SELEÇÃO PASSALI</span>
              <h2>Eventos em destaque</h2>
              <p>
                Experiências escolhidas para inspirar os teus próximos planos.
              </p>
            </div>

            <a className="view-all" href="#eventos">
              Ver todos <ArrowRight size={16} />
            </a>
          </div>

          {filteredEvents.length ? (
            <div className="event-grid">
              {filteredEvents.map((event) => (
                <article className="event-card" key={event.id}>
                  <div
                    className="event-image"
                    style={{ backgroundImage: `url(${event.image})` }}
                  >
                    <span className="event-tag">{event.tag}</span>

                    <button
                      className="save-button"
                      aria-label="Guardar evento"
                      onClick={showDemoNotice}
                    >
                      ♡
                    </button>
                  </div>

                  <div className="event-info">
                    <span className="event-category">
                      {event.category}
                    </span>

                    <h3>{event.title}</h3>

                    <div className="event-meta">
                      <span>
                        <CalendarDays size={14} />
                        {event.date}
                      </span>
                      <span>
                        <MapPin size={14} />
                        {event.city}, {event.country}
                      </span>
                    </div>

                    <div className="event-bottom">
                      <strong>{event.price}</strong>

                     <button onClick={() => setSelectedEvent(event)}>
    Ver evento <ArrowRight size={15} />
</button>
                    </div>
                  </div>
                </article>
))}
            </div>
          ) : (
            <div className="empty-state">
              Não encontrámos eventos com estes critérios.
              Experimenta outra pesquisa.
            </div>
      )}
        </section>

        <section className="organizer-banner" id="organizadores">
          <div>
            <span className="section-kicker">
              PARA PROMOTORES E ORGANIZADORES
            </span>

            <h2>
              O teu evento merece<br />
              <em>um palco maior.</em>
            </h2>

            <p>
              Gere inscrições, bilhetes e entradas numa plataforma
              preparada para crescer contigo.
            </p>
          </div>

          <button
            onClick={() => setNotice("O portal de organizadores será desenvolvido na próxima fase.")}
          >
            Conhecer a plataforma <ArrowRight size={17} />
          </button>

          <div className="banner-orbit orbit-one" />
          <div className="banner-orbit orbit-two" />
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">
            <Ticket size={20} />
          </span>
          <span className="brand-name">
            PASSALI<span>TICKETS</span>
          </span>
        </a>

        <span>DISCOVER. BOOK. EXPERIENCE.</span>
        <span className="footer-powered">
          POWERED BY PSP ENTERTAINMENT
        </span>
        <span className="copyright">
          © 2026 Passali Tickets. Todos os direitos reservados.
        </span>
      </footer>
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="event-modal-close"
              onClick={() => setSelectedEvent(null)}
            >
              <X size={22} />
            </button>

            <div
              className="event-modal-image"
              style={{ backgroundImage: `url(${selectedEvent.image})` }}
            />

            <div className="event-modal-content">
              <span className="event-category">
                {selectedEvent.category}
              </span>

              <h2>{selectedEvent.title}</h2>

              <div className="event-meta">
                <span>
                  <CalendarDays size={15} />
                  {selectedEvent.date}
                </span>
                <span>
                  <MapPin size={15} />
                  {selectedEvent.city}, {selectedEvent.country}
                </span>
              </div>

              <div className="event-modal-bottom">
                <strong>{selectedEvent.price}</strong>
                <button onClick={showDemoNotice}>
                  Bilhetes em breve <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {notice && (
        <div className="toast" role="status">
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            aria-label="Fechar aviso"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

