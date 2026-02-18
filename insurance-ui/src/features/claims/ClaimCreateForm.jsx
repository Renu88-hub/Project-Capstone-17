import React, { useState, useEffect } from "react";

export default function ClaimCreateForm({ addClaim }) {
  const [form, setForm] = useState({
    policyId: "",
    policyNumber: "",
    insuredName: "", 
    claimAmount: "",
    remarks: "",
  });
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [policies, setPolicies] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [insuredName, setInsuredName] = useState(""); 
  const [status, setStatus] = useState("ACTIVE");

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    fetch("http://localhost:5000/api/policies?status=${status}", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const activePolicies = data.filter(policy => policy.status === "ACTIVE");
        setPolicies(activePolicies); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching policies:", error);
        setLoading(false);
      });
  }, []); 

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });

    let fieldError = "";
    if (field === "claimAmount") {
      const num = parseFloat(value);
      if (isNaN(num) || num <= 0) fieldError = "Claim Amount must be greater than 0";
    }

    setErrors({ ...errors, [field]: fieldError });
  };

  const handlePolicyChange = (e) => {
    const selectedPolicyId = e.target.value;

    if (isNaN(selectedPolicyId)) {
      console.error("Invalid policy ID selected:", selectedPolicyId);
      return;
    }

    const selectedPolicy = policies.find(policy => policy._id === parseInt(selectedPolicyId));

    if (selectedPolicy) {
      setForm({
        ...form,
        policyNumber: selectedPolicy.policyNumber,
        policyId: selectedPolicyId, 
      });
      setInsuredName(selectedPolicy.insuredName); 
    }
  };


  const validateForm = () => {
    const newErrors = {};

    if (!form.policyId) newErrors.policyId = "Policy is required";
    if (!form.claimAmount) newErrors.claimAmount = "Claim Amount is required";

    const claimNum = parseFloat(form.claimAmount);
    if (isNaN(claimNum) || claimNum <= 0) newErrors.claimAmount = "Claim Amount must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = () => {
    if (validateForm()) setShowConfirm(true);
  };


  const confirmSubmit = () => {
    const newClaim = {
      policyId: parseInt(form.policyId), 
      policyNumber: form.policyNumber,  
      insuredName: insuredName,
      claimAmount: parseFloat(form.claimAmount),
      approvedAmount: 0,
      status: "SUBMITTED",
      incidentDate: new Date().toISOString().slice(0, 10),
      reportedDate: new Date().toISOString().slice(0, 10),
      remarks: form.remarks,
      notes: [],
      documents: [],
    };


    fetch("http://localhost:5000/api/claims", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newClaim),
    })
      .then((response) => response.json())
      .then((data) => {
        addClaim(data); 
        setShowConfirm(false);
        setForm({ policyId: "", claimAmount: "", remarks: "" });
        setInsuredName("");
        setErrors({});
      })
      .catch((error) => {
        console.error("Error creating claim:", error);
      });
  };

  const fieldStyle = { display: "flex", flexDirection: "column", marginBottom: 10 };
  const errorStyle = { color: "red", minHeight: 18 };

  return (
    <div style={{ border: "1px solid gray", padding: 20, marginTop: 10, maxWidth: 400 }}>
      <h3>Create Claim</h3>

      <div style={fieldStyle}>
        <select
          value={form.policyId}
          onChange={handlePolicyChange}
        >
          <option value="">Select Policy</option>
          {loading ? (
            <option>Loading policies...</option>
          ) : (
            policies.map((policy) => (
              <option key={policy._id} value={policy._id}>
                {policy.policyNumber} - {policy.insuredName}
              </option>
            ))
          )}
        </select>
        <div style={errorStyle}>{errors.policyId || "\u00A0"}</div>
      </div>

      <div style={fieldStyle}>
        <input
          placeholder="Insured Name"
          value={insuredName} 
          disabled 
        />
      </div>

      <div style={fieldStyle}>
        <input
          placeholder="Claim Amount"
          type="number"
          value={form.claimAmount}
          onChange={(e) => handleChange("claimAmount", e.target.value)}
        />
        <div style={errorStyle}>{errors.claimAmount || "\u00A0"}</div>
      </div>

      {/* Remarks */}
      <div style={fieldStyle}>
        <input
          placeholder="Remarks"
          value={form.remarks}
          onChange={(e) => handleChange("remarks", e.target.value)}
        />
      </div>

      <button onClick={handleSubmit} style={{ marginTop: 10 }}>
        Submit
      </button>

      {showConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div style={{ background: "white", padding: 20, borderRadius: 6, textAlign: "center" }}>
            <p>Submit claim for ₹{form.claimAmount}?</p>
            <button onClick={confirmSubmit} style={{ marginRight: 10 }}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
