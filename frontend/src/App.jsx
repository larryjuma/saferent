import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Property from "./pages/Property";
import Login from "./pages/Login";
import Register from "./pages/Register";

import TenantDashboard from "./pages/TenantDashboard";
import LandlordDashboard from "./pages/LandlordDashboard";
import AddProperty from "./pages/AddProperty";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<Property />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* TENANT ROUTES */}
        <Route
          path="/tenant-dashboard"
          element={
            <PrivateRoute role="tenant">
              <TenantDashboard />
            </PrivateRoute>
          }
        />

        {/* LANDLORD ROUTES */}
        <Route
          path="/landlord-dashboard"
          element={
            <PrivateRoute role="landlord">
              <LandlordDashboard />
            </PrivateRoute>
          }
        />

        {/* Add property */}
        <Route
          path="/landlord/add-property"
          element={
            <PrivateRoute role="landlord">
              <AddProperty />
            </PrivateRoute>
          }
        />

        {/* Edit property */}
        <Route
          path="/landlord/edit-property/:id"
          element={
            <PrivateRoute role="landlord">
              <AddProperty />
            </PrivateRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
