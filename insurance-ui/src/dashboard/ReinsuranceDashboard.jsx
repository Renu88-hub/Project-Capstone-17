import React, { useState, useEffect } from "react";
import TreatyList from "../features/reinsurance/TreatyList";
import TreatyForm from "../features/reinsurance/TreatyForm";
import RiskAllocationView from "../features/reinsurance/RiskAllocationView";
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend as ReLegend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import API from "../api/reinsuranceAPI"; 

const statusColors = { ACTIVE: "#27ae60", INACTIVE: "#c0392b" };
const typeColors = { "Quota Share": "#2980b9", "Excess of Loss": "#f39c12", "Stop Loss": "#8e44ad" };

function ReinsuranceDashboard({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [treaties, setTreaties] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchTreaties = async () => {
      try {
        const response = await API.get("/treaties");
        setTreaties(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching treaties");
        setLoading(false);
      }
    };
    fetchTreaties();
  }, []); 


  const totalTreaties = treaties.length;
  const totalRiskAllocated = treaties.reduce((sum, t) => sum + t.riskAllocated, 0);
  const statusCounts = treaties.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const pieDataStatus = Object.keys(statusCounts).map(key => ({ name: key, value: statusCounts[key] }));
  const pieDataType = Object.keys(typeColors).map(type => ({
    name: type,
    value: treaties.filter(t => t.type === type).length
  }));

  const barData = Object.keys(typeColors).map(type => {
    const total = treaties
      .filter(t => t.type === type)
      .reduce((sum, t) => sum + t.riskAllocated, 0);
    return { type, riskAllocated: total };
  });

  const Card = ({ title, value }) => (
    <div
      style={{
        flex: 1,
        background: "#f4f6f8",
        padding: 20,
        borderRadius: 8,
        textAlign: "center",
        border: "1px solid #ddd",
        boxSizing: "border-box",
        minWidth: 150,
        margin: 5,
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}>{title}</h4>
      <h2 style={{ margin: 0 }}>{value}</h2>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        <h3 style={{ fontWeight: "bold", marginBottom: 20 }}>Reinsurance Panel</h3>
        <button
          onClick={() => { setPage("dashboard"); setShowCreateForm(false); }}
          style={{
            backgroundColor: "#0b6aff",
            border: "none",
            color: "white",
            padding: "10px 20px",
            marginBottom: 10,
            cursor: "pointer",
            borderRadius: 3,
            width: "100%",
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => { setPage("treaties"); setShowCreateForm(false); }}
          style={{
            backgroundColor: "#0b6aff",
            border: "none",
            color: "white",
            padding: "10px 20px",
            marginBottom: 10,
            cursor: "pointer",
            borderRadius: 3,
            width: "100%",
          }}
        >
          Treaty List
        </button>
        <button
          onClick={() => { setPage("allocation"); setShowCreateForm(false); }}
          style={{
            backgroundColor: "#0b6aff",
            border: "none",
            color: "white",
            padding: "10px 20px",
            marginBottom: 10,
            cursor: "pointer",
            borderRadius: 3,
            width: "100%",
          }}
        >
          Risk Allocation
        </button>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: "#0b6aff",
            border: "none",
            color: "white",
            padding: "10px 20px",
            marginTop: 20,
            cursor: "pointer",
            borderRadius: 3,
            width: "100%",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 20, boxSizing: "border-box", overflowY: "auto", background: "#f9fafb" }}>
        {page === "dashboard" && (
          <>
            <h1 style={{ fontWeight: "bold" }}>Reinsurance Dashboard</h1>

            {/* Summary Cards */}
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
              <Card title="Total Treaties" value={totalTreaties} />
              <Card title="Total Risk Allocated ₹" value={totalRiskAllocated.toLocaleString("en-IN")} />
            </div>

            {/* Pie Chart: Status */}
            <div style={{ marginTop: 40, width: "100%", height: 300 }}>
              <h3 style={{ fontWeight: "bold" }}>Treaties by Status</h3>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieDataStatus} dataKey="value" nameKey="name" outerRadius={100} label>
                    {pieDataStatus.map((entry, index) => (
                      <Cell key={index} fill={statusColors[entry.name]} />
                    ))}
                  </Pie>
                  <ReTooltip />
                  <ReLegend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart: Type */}
            <div style={{ marginTop: 40, width: "100%", height: 300 }}>
              <h3 style={{ fontWeight: "bold" }}>Treaties by Type</h3>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieDataType} dataKey="value" nameKey="name" outerRadius={100} label>
                    {pieDataType.map((entry, index) => (
                      <Cell key={index} fill={typeColors[entry.name]} />
                    ))}
                  </Pie>
                  <ReTooltip />
                  <ReLegend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart: Risk Allocation */}
            <div style={{ marginTop: 40, width: "100%", height: 300 }}>
              <h3 style={{ fontWeight: "bold" }}>Risk Allocation by Treaty Type</h3>
              <ResponsiveContainer>
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <ReTooltip />
                  <ReLegend />
                  <Bar dataKey="riskAllocated" fill="#2980b9" name="Risk Allocated ₹" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {page === "treaties" && (
          <>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              style={{
                marginBottom: 20,
                backgroundColor: "#0b6aff",
                color: "#fff",
                border: "none",
                padding: "10px 15px",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              {showCreateForm ? "Hide Create Treaty" : "Create New Treaty"}
            </button>

            {showCreateForm && <TreatyForm />}

            <TreatyList />
          </>
        )}

        {page === "allocation" && <RiskAllocationView />}
      </div>
    </div>
  );
}

export default ReinsuranceDashboard;
