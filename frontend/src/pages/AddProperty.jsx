import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProperty,
  updateProperty,
  fetchPropertyById
} from "../api/api";
import "../styles/addProperty.css";

function AddProperty() {
  const navigate = useNavigate();
  const { id } = useParams(); // optional id for edit mode

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    isAvailable: true,
    image: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // Load property if editing
  useEffect(() => {
    if (id) {
      fetchPropertyById(id).then(({ data }) => {
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price,
          location: data.location,
          propertyType: data.propertyType,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          isAvailable: data.isAvailable,
          image: null
        });
        setImagePreview(data.image);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) data.append(key, formData[key]);
      }

      if (id) {
        await updateProperty(id, data);
        alert("Property updated successfully!");
      } else {
        await createProperty(data);
        alert("Property created successfully!");
      }

      navigate("/landlord-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-container">
      <form className="add-property-card" onSubmit={handleSubmit}>
        <h2>{id ? "Edit Property" : "Add New Property"}</h2>

        {error && <p className="form-error">{error}</p>}

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="add-property-image-preview"
          />
        )}

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (KES)"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
        >
          <option value="apartment">Apartment</option>
          <option value="bedsitter">Bedsitter</option>
          <option value="house">House</option>
        </select>

        <div className="bed-bath-row">
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            min={1}
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            min={1}
          />
        </div>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

   <button
  className="edit-btn"
  onClick={() => navigate(`/landlord/edit-property/${property._id}`)}
>
  Add
</button>

      </form>
    </div>
  );
}

export default AddProperty;
