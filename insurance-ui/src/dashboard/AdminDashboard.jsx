import React, { useState } from "react";
import AdminRoutes from "../features/admin/AdminRoutes";

const AdminDashboard = ({ user, onLogout }) => {
  const [page, setPage] = useState("users"); // users | roles | permissions | treaties | thresholds | auditLogs

  const tabs = [
    { id: "users", label: "User Management" },
    { id: "roles", label: "Role Matrix" },
    { id: "permissions", label: "Permission Editor" },
    { id: "treaties", label: "Treaty Configuration" },
    { id: "thresholds", label: "Threshold Config" },
    { id: "auditLogs", label: "Audit Logs" },
  ];

  // Example cards for dashboard stats (replace with real data)
  const cards = [
    { title: "Total Users", value: 120 },
    { title: "Active Roles", value: 15 },
    { title: "Permissions Configured", value: 48 },
    { title: "Treaties Active", value: 8 },
  ];

  const Card = ({ title, value }) => (
    <div
      style={{
        flex: "1 1 200px",
        background: "#f4f6f8",
        padding: 20,
        borderRadius: 8,
        textAlign: "center",
        border: "1px solid #ddd",
        margin: 5,
        minWidth: 150,
        boxSizing: "border-box",
      }}
    >
      <h4 style={{ marginBottom: 10 }}>{title}</h4>
      <h2 style={{ margin: 0 }}>{value}</h2>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 220,
          background: "#f5f7fa",
          borderRight: "1px solid #ddd",
          padding: 20,
          boxSizing: "border-box",
          color: "#000",
        }}
      >
        <h3 style={{ fontWeight: "bold", marginBottom: 20 }}>Admin Panel</h3>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPage(tab.id)}
            style={{
              backgroundColor: page === tab.id ? "#0b6aff" : "#f0f0f0",
              border: "none",
              color: page === tab.id ? "white" : "black",
              padding: "10px 20px",
              marginBottom: 10,
              cursor: "pointer",
              borderRadius: 3,
              width: "100%",
              textAlign: "left",
            }}
          >
            {tab.label}
          </button>
        ))}

        <button
          onClick={onLogout}
          style={{
            backgroundColor: "#e74c3c",
            border: "none",
            color: "white",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: 3,
            width: "100%",
            marginTop: 20,
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: 20,
          boxSizing: "border-box",
          overflowY: "auto",
          minWidth: 0,
          background: "#f9fafb",
        }}
      >
        {/* Dashboard Cards */}
        {page === "users" && (
          <>
            <h1 style={{ fontWeight: "bold" }}>Admin Dashboard</h1>
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
              {cards.map((card) => (
                <Card key={card.title} title={card.title} value={card.value} />
              ))}
            </div>
          </>
        )}

        {/* Admin Routes */}
        <AdminRoutes currentTab={page} />
      </div>
    </div>
  );
};

export default AdminDashboard;
