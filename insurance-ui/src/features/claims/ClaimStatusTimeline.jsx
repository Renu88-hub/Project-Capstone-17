import React from "react";

const steps = ["SUBMITTED", "IN_REVIEW", "APPROVED", "SETTLED", "REJECTED"];

export default function ClaimStatusTimeline({ status }) {
  return (
    <div style={{ display: "flex", marginBottom: 20 }}>
      {steps.map(step => (
        <div key={step} style={{
          flex: 1,
          padding: 10,
          background: step === status ? "#2ecc71" : "#eee",
          textAlign: "center"
        }}>
          {step}
        </div>
      ))}
    </div>
  );
}
