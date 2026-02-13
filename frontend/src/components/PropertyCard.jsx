import { useNavigate } from "react-router-dom";
import "../styles/propertyCard.css";

function PropertyCard({ property }) {
  const navigate = useNavigate();
  const images = Array.isArray(property.images) ? property.images : [];
  const coverImage =
    images.length > 0
      ? images[0]
      : "https://via.placeholder.com/400x250?text=No+Image";

  return (
    <div
      className="pc-card"
      onClick={() => navigate(`/property/${property._id}`)}
    >
      {/* IMAGE */}
      <div className="pc-image-wrapper">
        <img
          src={coverImage}
          alt={property.title || "Property image"}
          className="pc-image"
          loading="lazy"
        />
        {images.length > 1 && (
          <span className="pc-image-count">+{images.length - 1} photos</span>
        )}
      </div>

      {/* CONTENT */}
      <div className="pc-content">
        <div className="pc-info">
          <h3 className="pc-title">{property.title}</h3>
          <p className="pc-location">📍 {property.location}</p>
          <div className="pc-meta">
            <span>{property.bedrooms ?? 0} Beds</span>
            <span>{property.bathrooms ?? 0} Baths</span>
          </div>
        </div>

        <div className="pc-footer">
          <span className="pc-price">
            KES {property.price?.toLocaleString()}/mo
          </span>
          <button
            className="pc-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/property/${property._id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
