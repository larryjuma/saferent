import { useNavigate } from "react-router-dom";
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="home">
      <div className="home-overlay"></div> {/* For gradient overlay */}
      <div className="home-content glass-card">
        <h1>Find Safe & Trusted Rentals</h1>
        <p>
          SafeRent helps tenants discover verified properties and landlords
          manage rental requests securely. Browse apartments, villas, and more
          — all in one platform.
        </p>

        <div className="home-actions">
          <button className="btn-primary" onClick={() => navigate('/properties')}>
            Browse Properties
          </button>
          <button className="btn-secondary" onClick={() => navigate('/register')}>
            List Your Property
          </button>
        </div>

        <div className="home-highlights">
          <div className="highlight">
            <h3>Verified Listings</h3>
            <p>All properties are verified for trust and safety.</p>
          </div>
          <div className="highlight">
            <h3>Secure Transactions</h3>
            <p>Request and manage rentals safely with full transparency.</p>
          </div>
          <div className="highlight">
            <h3>24/7 Support</h3>
            <p>We’re here to assist tenants and landlords anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
