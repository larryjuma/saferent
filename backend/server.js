// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Load environment variables first
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// File upload middleware (only needed for property images)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// CORS configuration
// Allow localhost for dev and Netlify frontend for production

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.100.9:5173",
  process.env.FRONTEND_URL // set in Render dashboard
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const landlordRoutes = require("./routes/landlordRoutes");
const adminRoutes = require("./routes/adminRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const rentalRequestRoutes = require("./routes/rentalRequestRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tenant", tenantRoutes);
app.use("/api/landlord", landlordRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/rental-requests", rentalRequestRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("SafeRent API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});