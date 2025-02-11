import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import "../../App.css";
import logo from "./logo.png"; 

const API_URL = "http://197.248.122.31/sustainet_voucher_api/public/api/login"; 
const token = "3|59kxMti9Edfh56Adps9Xp2uwHr7WWnKzDmnBikuy2021ffb0"


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    if (storedUser) {
      console.log('noma sana')
      // window.location.replace( "/AdminHome")
      // navigate("/AdminHome");
     // ⬅️ Avoids re-triggering `useEffect`
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);



  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple requests
    setError(null);
    setLoading(true);
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email, 
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (data.status_code === "1000") { 
        // const { token, data: userData } = data;

        const userData = data.data


  
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("admin", JSON.stringify({ email: userData.email, role: userData.role }));
        window.location.replace( "/AdminHome")
     
      
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
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      {error && <p className="login-error">{error}</p>}

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <IconButton onClick={() => setShowPassword(!showPassword)} className="toggle-password">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
