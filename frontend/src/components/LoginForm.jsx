import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/auth/signin`, formData);

      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="figma-auth-wrapper">
      {/* LEFT ILLUSTRATION PANEL */}
      <div className="figma-auth-left">
        <div className="figma-shape shape-1"></div>
        <div className="figma-shape shape-2"></div>
        <div className="figma-shape shape-3"></div>

        <div className="figma-left-content">
          <h1>Welcome Back</h1>
          <p>
            Manage your groceries, track orders and enjoy fresh delivery
            every day.
          </p>
        </div>
      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="figma-auth-right">
        <div className="figma-login-card">
          <h2>Login Now</h2>
          <p className="subtitle">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="figma-input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="figma-input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="figma-login-btn">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
