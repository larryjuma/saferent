import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { fetchProperties } from '../api/api';
import '../styles/properties.css';

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const res = await fetchProperties();
        setProperties(res.data);
      } catch (err) {
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (loading) return <p className="page-state">Loading properties...</p>;
  if (error) return <p className="page-state error">{error}</p>;

  return (
    <section className="properties-wrapper">
      <header className="properties-hero">
        <h1>Available Properties</h1>
        <p>Browse verified rentals across trusted locations</p>
      </header>

      <div className="properties-container glass">
        {properties.length === 0 ? (
          <p className="page-state">No properties available.</p>
        ) : (
          <div className="properties-grid">
            {properties.map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Properties;
