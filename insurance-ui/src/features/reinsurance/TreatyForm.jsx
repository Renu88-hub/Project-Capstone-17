import React, { useState } from "react";

const TreatyForm = () => {
  const [formData, setFormData] = useState({
    treatyName: "",
    treatyType: "QUOTA_SHARE",
    reinsurer: "",
    sharePercentage: 0,
    retentionLimit: 0,
    treatyLimit: 0,
    applicableLOBs: [],
    status: "ACTIVE",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes and live validation
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    let errorMsg = "";

    if (field === "treatyName" && !value.trim()) errorMsg = "Treaty Name is required";
    if (field === "reinsurer" && !value.trim()) errorMsg = "Reinsurer is required";

    if (field === "sharePercentage") {
      const num = parseFloat(value);
      if (isNaN(num) || num <= 0) errorMsg = "Share % must be greater than 0";
    }
    if (field === "retentionLimit") {
      const num = parseFloat(value);
      if (isNaN(num) || num < 0) errorMsg = "Retention Limit must be 0 or more";
    }
    if (field === "treatyLimit") {
      const num = parseFloat(value);
      if (isNaN(num) || num <= 0) errorMsg = "Treaty Limit must be greater than 0";
    }

    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  // Validate entire form on submit
  const validateForm = () => {
    const newErrors = {};
    if (!formData.treatyName.trim()) newErrors.treatyName = "Treaty Name is required";
    if (!formData.reinsurer.trim()) newErrors.reinsurer = "Reinsurer is required";

    const share = parseFloat(formData.sharePercentage);
    if (isNaN(share) || share <= 0) newErrors.sharePercentage = "Share % must be greater than 0";

    const retention = parseFloat(formData.retentionLimit);
    if (isNaN(retention) || retention < 0) newErrors.retentionLimit = "Retention Limit must be 0 or more";

    const limit = parseFloat(formData.treatyLimit);
    if (isNaN(limit) || limit <= 0) newErrors.treatyLimit = "Treaty Limit must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Treaty Created!\n" + JSON.stringify(formData, null, 2));
      setFormData({
        treatyName: "",
        treatyType: "QUOTA_SHARE",
        reinsurer: "",
        sharePercentage: 0,
        retentionLimit: 0,
        treatyLimit: 0,
        applicableLOBs: [],
        status: "ACTIVE",
      });
      setErrors({});
    }
  };

  const fieldStyle = { display: "flex", flexDirection: "column", marginBottom: 12 };
  const errorStyle = { color: "red", minHeight: 18 };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8, background: "#fff" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Create / Edit Treaty</h2>
      <form onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <label>Treaty Name:</label>
          <input
            name="treatyName"
            value={formData.treatyName}
            onChange={e => handleChange("treatyName", e.target.value)}
            onBlur={e => handleChange("treatyName", e.target.value)}
          />
          <div style={errorStyle}>{errors.treatyName || "\u00A0"}</div>
        </div>

        <div style={fieldStyle}>
          <label>Type:</label>
          <select
            name="treatyType"
            value={formData.treatyType}
            onChange={e => handleChange("treatyType", e.target.value)}
          >
            <option value="QUOTA_SHARE">Quota Share</option>
            <option value="SURPLUS">Surplus</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label>Reinsurer:</label>
          <input
            name="reinsurer"
            value={formData.reinsurer}
            onChange={e => handleChange("reinsurer", e.target.value)}
            onBlur={e => handleChange("reinsurer", e.target.value)}
          />
          <div style={errorStyle}>{errors.reinsurer || "\u00A0"}</div>
        </div>

        <div style={fieldStyle}>
          <label>Share %:</label>
          <input
            type="number"
            name="sharePercentage"
            value={formData.sharePercentage}
            onChange={e => handleChange("sharePercentage", e.target.value)}
            onBlur={e => handleChange("sharePercentage", e.target.value)}
          />
          <div style={errorStyle}>{errors.sharePercentage || "\u00A0"}</div>
        </div>

        <div style={fieldStyle}>
          <label>Retention Limit:</label>
          <input
            type="number"
            name="retentionLimit"
            value={formData.retentionLimit}
            onChange={e => handleChange("retentionLimit", e.target.value)}
            onBlur={e => handleChange("retentionLimit", e.target.value)}
          />
          <div style={errorStyle}>{errors.retentionLimit || "\u00A0"}</div>
        </div>

        <div style={fieldStyle}>
          <label>Treaty Limit:</label>
          <input
            type="number"
            name="treatyLimit"
            value={formData.treatyLimit}
            onChange={e => handleChange("treatyLimit", e.target.value)}
            onBlur={e => handleChange("treatyLimit", e.target.value)}
          />
          <div style={errorStyle}>{errors.treatyLimit || "\u00A0"}</div>
        </div>

        <div style={fieldStyle}>
          <label>LOBs (comma separated):</label>
          <input
            name="applicableLOBs"
            value={formData.applicableLOBs.join(", ")}
            onChange={e =>
              setFormData({ ...formData, applicableLOBs: e.target.value.split(",").map(s => s.trim()) })
            }
          />
        </div>

        <button type="submit" style={{ padding: "8px 16px", borderRadius: 6, background: "#0070f3", color: "#fff", border: "none", cursor: "pointer" }}>
          Save Treaty
        </button>
      </form>
    </div>
  );
};

export default TreatyForm;
