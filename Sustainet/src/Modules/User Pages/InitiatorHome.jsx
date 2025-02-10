import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Dashboard from "../../components/Dashboard";

function InitiatorHome() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setRole(user.role);
    }
  }, []);

  return (
    <div className="home-container" style={{ display: "flex" }}>
      <Sidebar /> {/* Sidebar on the left side */}

      <div className="content" style={{ marginLeft: "250px", padding: "20px", flexGrow: 1 }}>
        {role ? (
          <>
            <h2>Welcome, {role}</h2>
            <Dashboard /> {/* Dashboard with tabs */}
            
            {role === "initiator" && (
              <div className="initiator-content">
                {/* <p>This is specific content for Initiator.</p> */}
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default InitiatorHome;
