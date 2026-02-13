import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPropertyById, createRentalRequest } from "../api/api";
import "../styles/property.css";

function Property() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [requestStatus, setRequestStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  // Load property details
  useEffect(() => {
    const loadProperty = async () => {
      try {
        const res = await fetchPropertyById(id);
        setProperty(res.data);
      } catch (err) {
        console.error("Failed to load property:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [id]);

  if (loading) return <p className="page-state">Loading property...</p>;
  if (!property) return null;

  const images =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images.slice(0, 3)
      : [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",
          "https://images.unsplash.com/photo-1598928506311-c55dedf7a4d2?w=1600",
          "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1600",
        ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleRequest = async () => {
    if (!token) {
      setRequestStatus("Please login to request this property.");
      return;
    }

    try {
      setSubmitting(true);
      await createRentalRequest(property._id);
      setRequestStatus("✅ Request sent successfully!");
    } catch (error) {
      setRequestStatus(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="prop-page">
      {/* HERO CAROUSEL */}
      <div className="prop-hero">
        <div
          className="prop-slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div className="prop-slide" key={index}>
              <img src={img} alt="Property" className="prop-image" />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button className="prop-arrow left" onClick={prevSlide}>
              &#10094;
            </button>
            <button className="prop-arrow right" onClick={nextSlide}>
              &#10095;
            </button>
          </>
        )}

        <div className="prop-overlay">
          <h1>{property.title}</h1>
          <p>{property.location}</p>
        </div>
      </div>

      {/* THUMBNAILS */}
      <div className="prop-thumbnails">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="thumb"
            className={`prop-thumb ${currentIndex === index ? "active-thumb" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* DETAILS SECTION */}
      <div className="prop-container">
        <div className="prop-info glass">
          <h2>Property Details</h2>

          <p className="prop-price" style={{ color: "#e63946" }}>
            KES {property.price.toLocaleString()} / month
          </p>

          <div className="prop-meta">
            <div>
              <strong>{property.bedrooms}</strong>
              <span>Bedrooms</span>
            </div>
            <div>
              <strong>{property.bathrooms}</strong>
              <span>Bathrooms</span>
            </div>
            <div>
              <strong>{property.propertyType}</strong>
              <span>Type</span>
            </div>
          </div>

          <p className="prop-description">{property.description}</p>

          <button
            className="prop-request-btn"
            onClick={handleRequest}
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Request to Rent"}
          </button>

          {requestStatus && (
            <p style={{ marginTop: "1rem", color: requestStatus.includes("successfully") ? "green" : "red" }}>
              {requestStatus}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Property;
