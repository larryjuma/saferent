import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/* Attach JWT token automatically */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ========== AUTH ========== */
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);

/* ========== PROPERTIES ========== */
export const fetchProperties = () => API.get('/properties');
export const fetchPropertyById = (id) => API.get(`/properties/${id}`);

/* LANDLORD ONLY */
export const fetchMyProperties = () => API.get('/properties/my');
export const createProperty = (data) => API.post('/properties', data);
export const updateProperty = (id, data) => API.put(`/properties/${id}`, data);
export const deleteProperty = (id) => API.delete(`/properties/${id}`);

/* ========== RENTAL REQUESTS ========== */
export const createRentalRequest = (propertyId) =>
  API.post(`/rental-requests/${propertyId}`);

export default API;
