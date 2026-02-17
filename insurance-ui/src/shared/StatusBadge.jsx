import React from "react";

export default function StatusBadge({ status }) {
  const colors = {
    SUBMITTED: "#f39c12",
    IN_REVIEW: "#3498db",
    APPROVED: "#2ecc71",
    REJECTED: "#e74c3c",
    SETTLED: "#9b59b6"
  };
  return (
    <span style={{
      background: colors[status] || "#ccc",
      color: "#fff",
      padding: "3px 8px",
      borderRadius: 5
    }}>
      {status}
    </span>
  );
}
