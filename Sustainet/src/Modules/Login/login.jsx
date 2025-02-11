import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import "../../App.css";
import logo from "./logo.png"; 


const API_URL = "http://197.248.122.31/sustainet_voucher_api/public/api/login"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      navigate("/AdminHome");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.status_code === "1000") {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("admin", JSON.stringify({
          email: data.data.email,
          role: data.data.role
        }));
        navigate("/AdminHome");
      } else {
        setError(data.message || "Invalid login credentials");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-card">
      <div className="logo">
      <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>Welcome Back</h2>
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <IconButton onClick={() => setShowPassword(!showPassword)} className="toggle-password">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Logging in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}