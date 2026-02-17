import React from "react";
import { approvePolicy, rejectPolicy } from "../../api/policyApi";

function PolicyActions({ policy }) {
  const handleApprove = async () => {
  await approvePolicy(policy._id);
  alert("Policy approved");
  };

  const handleReject = async () => {
  await rejectPolicy(policy._id);
  alert("Policy rejected");
};

  return (
    <div style={{ marginTop: "10px" }}>
      {policy.status === "DRAFT" && (
        <>
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleReject}>Reject</button>
        </>
      )}
    </div>
  );
}

export default PolicyActions;
