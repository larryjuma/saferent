import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "tenant"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await registerUser(formData);

      // ✅ Normalize user object
      const user = data.user
        ? data.user
        : {
            name: formData.name,
            email: formData.email,
            role: formData.role
          };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect by role
      if (user.role === "landlord") {
        navigate("/landlord-dashboard");
      } else {
        navigate("/tenant-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Sign up to SafeRent</p>

        {error && <div className="auth-error">{error}</div>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="tenant">Tenant</option>
          <option value="landlord">Landlord</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Register;
