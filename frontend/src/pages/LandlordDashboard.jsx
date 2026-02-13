import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMyProperties,
  deleteProperty
} from "../api/api";
import "../styles/dashboard.css";
import PropertyCard from "../components/PropertyCard";

function LandlordDashboard() {
  const navigate = useNavigate();
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load landlord properties
  useEffect(() => {
    loadMyProperties();
  }, []);

  const loadMyProperties = async () => {
    try {
      const { data } = await fetchMyProperties();
      setMyProperties(data);
    } catch (err) {
      setError("Failed to load your properties.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete property
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await deleteProperty(id);
      setMyProperties((prev) =>
        prev.filter((property) => property._id !== id)
      );
    } catch (err) {
      alert("Failed to delete property");
    }
  };

  if (loading)
    return <p className="dashboard-loading">Loading your properties...</p>;

  if (error)
    return <p className="dashboard-error">{error}</p>;

  return (
    <div className="dashboard-page landlord-dashboard">
      <h1>Your Properties</h1>

      {/* Add Property Button */}
      <div className="dashboard-add-btn-wrapper">
        <button
          className="edit-btn"
          onClick={() => navigate("/landlord/add-property")}
        >
          + Add Property
        </button>
      </div>

      {myProperties.length === 0 ? (
        <p className="dashboard-empty">
          You haven’t listed any properties yet.
        </p>
      ) : (
        <div className="dashboard-grid">
          {myProperties.map((property) => (
            <div
              key={property._id}
              className="dashboard-property-card"
            >
              <PropertyCard property={property} />

              <div className="landlord-actions">
                {/* EDIT BUTTON */}
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/landlord/edit-property/${property._id}`)
                  }
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LandlordDashboard;
