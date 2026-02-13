// src/pages/TenantDashboard.jsx
import { useEffect, useState } from "react";
import { fetchProperties, createRentalRequest } from "../api/api";
import "../styles/dashboard.css";
import PropertyCard from "../components/PropertyCard";

function TenantDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const { data } = await fetchProperties();
        setProperties(data);
      } catch (err) {
        setError("Failed to load properties.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const handleRequest = async (propertyId) => {
    try {
      await createRentalRequest(propertyId);
      alert("Rental request sent!");
    } catch (err) {
      alert(err.response?.data?.message || "Request failed");
    }
  };

  if (loading) return <p className="dashboard-loading">Loading properties...</p>;
  if (error) return <p className="dashboard-error">{error}</p>;

  return (
    <div className="dashboard-page tenant-dashboard">
      <h1>Welcome to your Tenant Dashboard</h1>
      <div className="dashboard-grid">
        {properties.map((property) => (
          <div key={property._id} className="dashboard-property-card">
            <PropertyCard property={property} />
            <button
              className="request-btn"
              onClick={() => handleRequest(property._id)}
            >
              Request Rental
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TenantDashboard;
