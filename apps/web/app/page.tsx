const pharmacies = [
  {
    name: 'Pharmacie Centrale',
    status: 'Ouverte',
    distance: '350 m',
    openUntil: '22:00',
    badge: 'green',
  },
  {
    name: 'Pharmacie de Garde',
    status: 'De garde',
    distance: '680 m',
    openUntil: '08:00',
    badge: 'gold',
  },
  {
    name: 'Pharmacie El Amel',
    status: '24h/24',
    distance: '1.2 km',
    openUntil: 'Toujours',
    badge: 'blue',
  },
  {
    name: 'Pharmacie Santé',
    status: 'Fermée',
    distance: '2.1 km',
    openUntil: '18:30',
    badge: 'red',
  },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Bordj Menaïel</p>
          <h1>Pharma BM</h1>
          <p className="subtitle">
            Trouvez rapidement la pharmacie ouverte la plus proche de vous.
          </p>

          <div className="search-box">
            <span>🔍</span>
            <input type="text" placeholder="Rechercher une pharmacie..." aria-label="Rechercher une pharmacie" />
            <button>Rechercher</button>
          </div>

          <div className="stats-row">
            <div>
              <strong>07</strong>
              <span>Ouvertes</span>
            </div>
            <div>
              <strong>01</strong>
              <span>De garde</span>
            </div>
            <div>
              <strong>01</strong>
              <span>24h/24</span>
            </div>
          </div>
        </div>

        <div className="map-panel">
          <div className="map-header">
            <span>Carte</span>
            <button>📍 Ma position</button>
          </div>
          <div className="map-surface">
            <div className="marker user">Vous</div>
            <div className="marker green">Open</div>
            <div className="marker gold">Garde</div>
            <div className="marker blue">24h</div>
            <div className="marker red">Closed</div>
          </div>
        </div>
      </section>

      <section className="list-section">
        <div className="list-header">
          <h2>Pharmacies près de moi</h2>
          <button className="secondary-btn">Filtrer</button>
        </div>

        <div className="pharmacy-list">
          {pharmacies.map((pharmacy) => (
            <article className="pharmacy-card" key={pharmacy.name}>
              <div className={`status-badge ${pharmacy.badge}`}>{pharmacy.status}</div>
              <h3>{pharmacy.name}</h3>
              <p>{pharmacy.distance} · Bordj Menaïel</p>
              <div className="meta-row">
                <span>🕐 Ferme à {pharmacy.openUntil}</span>
              </div>
              <div className="card-actions">
                <button className="primary-btn">📞 Appeler</button>
                <button className="secondary-btn">🧭 Itinéraire</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
