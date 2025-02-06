import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css'
const users = {
  "admin@example.com": { password: "admin123", role: "admin" },
  "initiator@example.com": { password: "initiator123", role: "initiator" },
  "authorator@example.com": { password: "authorator123", role: "authorator" },
  "reviewer@example.com": { password: "reviewer123", role: "reviewer" },
  "payment_initiator@example.com": { password: "payment123", role: "payment_initiator" },
  "final_payment_authoritator@example.com": { password: "final123", role: "final_payment_authoritator" },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (users[email] && users[email].password === password) {
      const role = users[email].role;
      localStorage.setItem("user", JSON.stringify({ email, role }));
      
      const roleRoutes = {
        admin: "/AdminHome",
        initiator: "/InitiatorHome",
        authorator: "/AuthoratorHome",
        reviewer: "/ReviewerHome",
        payment_initiator: "/payment-initiator-home",
        final_payment_authoritator: "/final-payment-authoritator-home",
      };
      
      navigate(roleRoutes[role] || "/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="login-form">
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
