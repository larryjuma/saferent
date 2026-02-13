const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const fileUpload = require('express-fileupload');


// initialize express app
const app = express();


// file upload middleware
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// enable CORS
app.use(cors({
  origin: '*', // dev only
  credentials: true,
}));


// load environment variables
dotenv.config();

// connect to database
connectDB();

// middleware to parse JSON requests
app.use(express.json());

// ! import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const tenantRoutes = require("./routes/tenantRoutes");
const landlordRoutes = require("./routes/landlordRoutes");
const adminRoutes = require("./routes/adminRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const rentalRequestRoutes = require("./routes/rentalRequestRoutes");

// ! use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/tenant", tenantRoutes);
app.use("/api/landlord", landlordRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/rental-requests", rentalRequestRoutes);


// ! basic route
app.get('/', (req, res) => {
  res.send('SafeRent API is running...');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
})