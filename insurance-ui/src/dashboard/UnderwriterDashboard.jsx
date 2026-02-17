import React, { useState, useEffect } from "react";
import { Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import PolicyList from "../features/policy/PolicyList";
import PolicyDetails from "../features/policy/PolicyDetails";
import CreatePolicyWizard from "../features/policy/CreatePolicyWizard";
import { fetchPolicies } from "../api/policyApi";


const statusList = ["DRAFT", "ACTIVE", "SUSPENDED", "EXPIRED"];
const statusColors = {
  DRAFT: "#f39c12",
  ACTIVE: "#27ae60"
};

const LOBs = ["HEALTH", "MOTOR", "LIFE", "PROPERTY"];

export default function UnderwriterDashboard({ user, onLogout }) {
  const [policiesList, setPolicies] = useState([]);
  const [page, setPage] = useState("dashboard"); 
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    fetchPolicies().then((res) => setPolicies(res.data));
  }, []);

  const handleSelectPolicy = (policy) => {
    setSelectedPolicy(policy);
    setPage("policyDetails");
  };

  // Counts by status
  const counts = statusList.reduce((acc, status) => {
    acc[status] = policiesList.filter((p) => p.status === status).length;
    return acc;
  }, {});

  const totalPolicies = policiesList.length;


  // Stacked bar chart data
  const stackedBarData = LOBs.map((lob) => {
    const policiesByLOB = policiesList.filter((p) => p.lineOfBusiness === lob);
    const data = { LOB: lob };
    statusList.forEach((status) => {
      data[status] = policiesByLOB.filter((p) => p.status === status).length;
    });
    return data;
  });

  // Card component
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
        <h3 style={{ fontWeight: "bold", marginBottom: 20 }}>Underwriter Panel</h3>
        <button
          onClick={() => {
            setPage("dashboard");
            setSelectedPolicy(null);
          }}
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
          onClick={() => {
            setPage("policies");
            setSelectedPolicy(null);
          }}
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
          Policy List
        </button>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: "#0b6aff",
            border: "none",
            color: "white",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: 3,
            width: "100%",
          }}
        >
          Logout
        </button>
      </div>

      {/* Content */}
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
        {/* Dashboard */}
        {page === "dashboard" && (
          <>
            <h1 style={{ fontWeight: "bold" }}>Underwriter Dashboard</h1>

            {/* Cards */}
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
              <Card title="Total Policies" value={totalPolicies} />
              <Card title="Active Policies" value={counts.ACTIVE} />
              <Card title="Draft Policies" value={counts.DRAFT} />
              <Card title="Suspended Policies" value={counts.SUSPENDED} />
            </div>

            {/* Policies by Status */}
            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontWeight: "bold" }}>Policies by Status</h3>
              {statusList.map((status) => {
                const count = counts[status];
                return (
                  <div key={status} style={{ marginBottom: 15 }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: 5,
                        color: "#333",
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: 300,
                      }}
                    >
                      <span>{status}</span>
                      <span>{count}</span>
                    </div>
                    <div
                      style={{
                        height: 20,
                        width: "100%",
                        backgroundColor: "#e0e0e0",
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${(count / totalPolicies) * 100}%`,
                          height: "100%",
                          backgroundColor: statusColors[status],
                          transition: "width 0.5s ease-in-out",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>          

            {/* Stacked Bar Chart */}
            <div style={{ marginTop: 40, width: "100%", height: 300 }}>
              <h3 style={{ fontWeight: "bold" }}>Policies by LOB and Status</h3>
              <ResponsiveContainer>
                <BarChart data={stackedBarData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="LOB" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {statusList.map((status) => (
                    <Bar key={status} dataKey={status} stackId="a" fill={statusColors[status]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Policy List */}
        {page === "policies" && (
          <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <PolicyList onSelectPolicy={handleSelectPolicy} onCreatePolicy={() => setPage("create")} />
          </div>
        )}

        {/* Policy Details */}
        {page === "policyDetails" && selectedPolicy && (
          <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <PolicyDetails policy={selectedPolicy} />
          </div>
        )}

        {/* Create Policy Wizard */}
        {page === "create" && (
          <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <CreatePolicyWizard />
          </div>
        )}
      </div>
    </div>
  );
}
