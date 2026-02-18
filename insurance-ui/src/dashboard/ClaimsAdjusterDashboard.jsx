import React, { useState, useEffect } from "react";
import ClaimsList from "../features/claims/ClaimsList";
import ClaimDetails from "../features/claims/ClaimDetails";
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, Legend as ReLegend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import { fetchClaims } from "../api/claimApi";

export default function ClaimsAdjusterDashboard({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [claims, setClaims] = useState([]);
  
  const statusList = ["SUBMITTED","IN_REVIEW","APPROVED","SETTLED","REJECTED"];
  const statusColors = {
    SUBMITTED: "#f39c12",
    IN_REVIEW: "#2980b9",
    APPROVED: "#27ae60",
    SETTLED: "#8e44ad",
    REJECTED: "#c0392b"
  };

  useEffect(() => {
    // Fetch claims whenever the page is set to "dashboard" or "claims"
    fetchClaims().then((res) => setClaims(res.data));
  }, [page]);  // Fetch data when page changes (on dashboard/claim list change)

  // Calculate summary stats dynamically
  const total = claims.length;

  const counts = statusList.reduce((acc, status) => {
    acc[status] = (claims || []).filter(c => c.status === status).length;
    return acc;
  }, {});

  const totalAmount = (claims || []).reduce((sum, c) => sum + (c.claimAmount || 0), 0);
  const approvedAmount = (claims || []).reduce((sum, c) => sum + (c.approvedAmount || 0), 0);

  const pieData = statusList.map(status => ({ name: status, value: counts[status] }));

  const barData = statusList.map(status => {
    const filtered = (claims || []).filter(c => c.status === status);
    const totalClaim = filtered.reduce((sum, c) => sum + (c.claimAmount || 0), 0);
    const approved = filtered.reduce((sum, c) => sum + (c.approvedAmount || 0), 0);
    return { status, totalClaim, approved };
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

  const handleSelectClaim = (claim) => {
    setSelectedClaim(claim);
    setPage("claimDetails");
  };

  const refreshClaims = () => {
    fetchClaims().then((res) => setClaims(res.data));  // This will refresh claims data on demand
  };

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
        <h3 style={{ fontWeight: "bold", marginBottom: 20 }}>Adjuster Panel</h3>
        <button
          onClick={() => { setPage("dashboard"); setSelectedClaim(null); }}
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
        >Dashboard</button>
        <button
          onClick={() => { setPage("claims"); setSelectedClaim(null); refreshClaims(); }}
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
        >Claim List</button>
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
        >Logout</button>
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
        {/* Dashboard View */}
        {page === "dashboard" && (
          <>
            <h1 style={{ fontWeight: "bold" }}>Claims Adjuster Dashboard</h1>

            {/* Summary Cards */}
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
              <Card title="Total Claims" value={total} />
              <Card title="Submitted" value={counts.SUBMITTED} />
              <Card title="In Review" value={counts.IN_REVIEW} />
              <Card title="Approved" value={counts.APPROVED} />
              <Card title="Settled" value={counts.SETTLED} />
              <Card title="Rejected" value={counts.REJECTED} />
              <Card title="Total Claim ₹" value={totalAmount.toLocaleString("en-IN")} />
            </div>

            {/* Pie Chart */}
            <div style={{ marginTop: 40, width: "100%", height: 300 }}>
              <h3 style={{ fontWeight: "bold" }}>Claims Status Overview</h3>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={statusColors[entry.name]} />
                    ))}
                  </Pie>
                  <ReTooltip />
                  <ReLegend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div style={{ marginTop: 40, width: "100%", height: 300 }}>
              <h3 style={{ fontWeight: "bold" }}>Claims Amount by Status</h3>
              <ResponsiveContainer>
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <ReTooltip />
                  <ReLegend />
                  <Bar dataKey="totalClaim" fill="#2980b9" name="Total Claim" />
                  <Bar dataKey="approved" fill="#27ae60" name="Approved Amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Claim List */}
        {page === "claims" && (
          <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <ClaimsList claims={claims} onSelectClaim={handleSelectClaim} />
          </div>
        )}

        {/* Claim Details */}
        {page === "claimDetails" && selectedClaim && (
          <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <ClaimDetails claim={selectedClaim} />
          </div>
        )}
      </div>
    </div>
  );
}
