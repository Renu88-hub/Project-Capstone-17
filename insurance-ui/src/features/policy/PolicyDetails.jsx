import React from "react";
import PolicyActions from "./PolicyActions";
import PolicyHistory from "./PolicyHistory";

function PolicyDetails({ policy }) {
  return (
    <div>
      <h2>Policy Details: {policy.policyNumber}</h2>
      <section>
        <h3>General Info</h3>
        <p><strong>Insured Name:</strong> {policy.insuredName}</p>
        <p><strong>Line of Business:</strong> {policy.lineOfBusiness}</p>
        <p><strong>Status:</strong> {policy.status}</p>
      </section>

      {policy?.status == "DRAFT" && (
        <section>
        <h3>Actions</h3>
        <PolicyActions policy={policy}/>
      </section>
      )}
     
    </div>
  );
}

export default PolicyDetails;
