import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/Sidebar";  // Import the Sidebar component
import Dashboard from "../../components/Dashboard";  // Import the Dashboard component

function FinalPaymentAuthorizerHome() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Fetch the user role from localStorage (or wherever you store it)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setRole(user.role); // Set the role from localStorage
    }
  }, []);

  // Conditionally render content based on user role
  return (
    <div className="home-container" style={{ display: 'flexbox' }}>
      <Sidebar />  {/* Sidebar on the left side */}

      <div className="content" style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        {role ? (
          <>
            <h2>Welcome, {role}</h2>
            <Dashboard />  {/* This will show the dashboard with tabs */}
            
            {/* Conditional content for Initiator role */}
            {role === 'initiator' && (
              <div className="initiator-content">
                <p>This is specific content for Final Payment Authorizer.</p>
              </div>
            )}
            
            {/* You can add more conditional content for other roles if needed */}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default FinalPaymentAuthorizerHome;