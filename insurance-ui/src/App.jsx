import React, { useState } from "react";
import LoginPage from "./LoginPage";
import UnderwriterDashboard from "./dashboard/UnderwriterDashboard";
import ClaimsAdjusterDashboard from "./dashboard/ClaimsAdjusterDashboard";
import ReinsuranceDashboard from "./dashboard/ReinsuranceDashboard";
import AdminDashboard from "./dashboard/AdminDashboard"; 

function App() {
  const [user, setUser] = useState(null);


  const handleLogin = async (email, password) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Store token and user info
    localStorage.setItem("token", data.token);
    setUser({ username: data.username, role: data.role });
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const handleLogout = () => {
  localStorage.removeItem("token");
  setUser(null);
};


  switch (user.role) {
    case "UNDERWRITER":
      return <UnderwriterDashboard user={user} onLogout={handleLogout} />;
    case "CLAIMS_ADJUSTER":
      return <ClaimsAdjusterDashboard user={user} onLogout={handleLogout} />;
    case "REINSURANCE_MANAGER":
      return <ReinsuranceDashboard user={user} onLogout={handleLogout} />;
    case "ADMIN":
      return <AdminDashboard user={user} onLogout={handleLogout} />;
    default:
      return <div>Unauthorized</div>;
  }

}

export default App;
