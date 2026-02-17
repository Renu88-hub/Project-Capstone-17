import React from "react";

const dummyHistory = [
  { date: "2026-02-10", action: "Created Draft", by: "Underwriter" },
  { date: "2026-02-11", action: "Edited Coverage", by: "Underwriter" },
];

function PolicyHistory({ policy }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Policy History</h3>
      <ul>
        {dummyHistory.map((h, idx) => (
          <li key={idx}>
            {h.date}: {h.action} by {h.by}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PolicyHistory;