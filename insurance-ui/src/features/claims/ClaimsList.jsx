import React, { useState, useEffect } from "react";
import ClaimDetails from "./ClaimDetails";
import ClaimCreateForm from "./ClaimCreateForm";
import StatusBadge from "../../shared/StatusBadge";

export default function ClaimsList() {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null); // This is used for displaying ClaimDetails
  const [showCreate, setShowCreate] = useState(false);

  const fetchClaims = () => {
    fetch("http://localhost:5000/api/claims", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setClaims(data))
      .catch((error) => console.error("Error fetching claims:", error));
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const addClaim = (newClaim) => {
    fetch("http://localhost:5000/api/claims", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newClaim),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchClaims(); // Re-fetch claims after adding new claim
        setShowCreate(false); // Close the create form
      })
      .catch((error) => console.error("Error adding claim:", error));
  };

  const updateClaim = (updatedClaim) => {
    // After updating the claim status, reset selectedClaim to hide ClaimDetails panel
    fetch("http://localhost:5000/api/claims", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClaims(data); 
        setSelectedClaim(null); 
      })
      .catch((error) => console.error("Error re-fetching claims:", error));
  };


  return (
    <div>
      <button onClick={() => setShowCreate(true)}>+ Create Claim</button>
      {showCreate && <ClaimCreateForm addClaim={addClaim} />} 

      <table border="1" cellPadding="10" width="100%" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Claim</th>
            <th>Policy</th>
            <th>Insured</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr
              key={claim._id}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedClaim(claim)} 
            >
              <td>{claim.claimNumber}</td>
              <td>{claim.policyNumber}</td>
              <td>{claim.insuredName}</td>
              <td>₹{claim.claimAmount}</td>
              <td>
                <StatusBadge status={claim.status} />
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>

      {selectedClaim && <ClaimDetails claim={selectedClaim} updateClaim={updateClaim} />}
    </div>
  );
}
