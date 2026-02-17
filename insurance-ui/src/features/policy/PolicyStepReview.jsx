import React from "react";
import PolicyStatusBadge from "./PolicyStatusBadge";

function PolicyStepReview({ data }) {
  return (
    <div>
      <h3>Step 3: Review</h3>
      <p><strong>Insured Name:</strong> {data.insuredName}</p>
      <p><strong>Sum Insured:</strong> {data.sumInsured}</p>
      <p><strong>Line of Business:</strong> {data.lineOfBusiness}</p>
      <PolicyStatusBadge status="DRAFT" />
    </div>
  );
}

export default PolicyStepReview;
