import React, { useState } from "react";

const role = "CLAIMS_ADJUSTER"; 
export default function ClaimActionPanel({ claim, onUpdate }) {
  const [confirmAction, setConfirmAction] = useState(null);

  const updateStatus = (status) => {
    const token = localStorage.getItem('token'); 

    fetch(`http://localhost:5000/api/claims/${claim._id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then((updatedClaim) => {

        onUpdate(updatedClaim); 
        setConfirmAction(null);
      })
      .catch((error) => {
        console.error("Error updating claim status:", error);
        setConfirmAction(null); 
      });
  };

  const askConfirm = (status) => setConfirmAction(status);

  return (
    <div style={{ marginTop: 20 }}>
      {role === "CLAIMS_ADJUSTER" && claim.status === "SUBMITTED" && (
        <button onClick={() => askConfirm("IN_REVIEW")}>Move to Review</button>
      )}

      {role === "CLAIMS_ADJUSTER" && claim.status === "IN_REVIEW" && (
        <>
          <button onClick={() => askConfirm("APPROVED")}>Approve</button>
          <button onClick={() => askConfirm("REJECTED")}>Reject</button>
        </>
      )}

      {claim.status === "APPROVED" && (
        <button onClick={() => askConfirm("SETTLED")}>Settle</button>
      )}

      {confirmAction && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}
        >
          <div style={{ background: "white", padding: 20, borderRadius: 6, textAlign: "center" }}>
            <p>Are you sure you want to {confirmAction.replace("_", " ").toLowerCase()} this claim?</p>
            <button onClick={() => updateStatus(confirmAction)} style={{ marginRight: 10 }}>
              Yes
            </button>
            <button onClick={() => setConfirmAction(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
