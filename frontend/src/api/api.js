// frontend/src/api.js
import axios from "axios";

// Base URL from environment variable
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // VITE_API_BASE_URL for both dev & prod
});

// Attach JWT token automatically if exists in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ========== AUTH ========== */
// Note: match backend route prefix (/api/auth)
export const loginUser = (data) => API.post("/api/auth/login", data);
export const registerUser = (data) => API.post("/api/auth/register", data);

/* ========== PROPERTIES ========== */
export const fetchProperties = () => API.get("/api/properties");
export const fetchPropertyById = (id) => API.get(`/api/properties/${id}`);

/* LANDLORD ONLY */
export const fetchMyProperties = () => API.get("/api/properties/my");
export const createProperty = (data) => API.post("/api/properties", data);
export const updateProperty = (id, data) => API.put(`/api/properties/${id}`, data);
export const deleteProperty = (id) => API.delete(`/api/properties/${id}`);

/* ========== RENTAL REQUESTS ========== */
export const createRentalRequest = (propertyId) =>
  API.post(`/api/rental-requests/${propertyId}`);

export default API;