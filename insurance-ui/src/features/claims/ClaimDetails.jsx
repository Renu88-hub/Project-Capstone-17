import React from "react";
import ClaimStatusTimeline from "./ClaimStatusTimeline";
import ClaimActionPanel from "./ClaimActionPanel"; 

export default function ClaimDetails({ claim, updateClaim }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 20, marginTop: 20 }}>
      <h3>Claim Details - {claim.claimNumber}</h3>
      <ClaimStatusTimeline status={claim.status} />

      <p><b>Policy:</b> {claim.policyNumber}</p>
      <p><b>Insured:</b> {claim.insuredName}</p>
      <p><b>Claim Amount:</b> ₹{claim.claimAmount}</p>
      <p><b>Status:</b> {claim.status}</p>

      <ClaimActionPanel claim={claim} onUpdate={updateClaim} />
    </div>
  );
}
