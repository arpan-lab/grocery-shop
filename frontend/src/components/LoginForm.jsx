import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${baseURL}/auth/signin`, formData);

    // ✅ Save token
    setToken(res.data.token);

    // ✅ Save user info to localStorage for cart persistence
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success("Logged in successfully!");
    navigate("/"); // redirect to home
  } catch (err) {
    toast.error(err.response?.data?.error || "Login failed");
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-semibold">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          placeholder="you@example.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label fw-semibold">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          placeholder="••••••••"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary w-100 fw-semibold">
        <i className="bi bi-box-arrow-in-right me-2"></i>Login
      </button>
    </form>
  );
};

export default LoginForm;
