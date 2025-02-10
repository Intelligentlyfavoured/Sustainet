import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../../App.css";
import logo from "./logo.png"; // Replace with actual path

const users = {
  "admin@example.com": { password: "admin123", role: "admin" },
  "initiator@example.com": { password: "initiator123", role: "initiator" },
  "authorizer@example.com": { password: "authorizer123", role: "authorizer" },
  "reviewer@example.com": { password: "reviewer123", role: "reviewer" },
  "payment_initiator@example.com": { password: "payment123", role: "payment_initiator" },
  "final_payment_authorizer@example.com": { password: "final123", role: "final_payment_authorizer" },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  


    const navigate = useNavigate();
  

    const handleLogin = (e) => {
      e.preventDefault();
  
      if (users[email] && users[email].password === password) {
        const role = users[email].role;
  
        localStorage.setItem("user", JSON.stringify({ email, role }));
        localStorage.setItem("authToken", "secure_token"); // Auth token
    
        // Prevent Back Button After Login
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
          navigate("/dashboard", { replace: true });
        };

      const roleRoutes = {
        admin: "/AdminHome",
        initiator: "/InitiatorHome",
        authorizer: "/AuthorizerHome",
        reviewer: "/ReviewerHome",
        payment_initiator: "/payment-initiator-home",
        final_payment_authorizer: "/final-payment-authorizer-home",
      };

      navigate(roleRoutes[role] || "/");
    } else {
      setError("Invalid email or password");
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
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}
