import React from "react";

function PolicyStatusBadge({ status }) {
  let color = "#ccc";
  if (status === "ACTIVE") color = "green";
  if (status === "DRAFT") color = "orange";
  if (status === "SUSPENDED") color = "red";

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "4px",
        color: "white",
        backgroundColor: color,
        margin: "5px 0",
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
}

export default PolicyStatusBadge;
