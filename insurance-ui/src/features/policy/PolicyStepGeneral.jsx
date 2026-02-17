import React from "react";

export default function PolicyStepGeneral({ data, onChange, errors }) {
  return (
    <div>

      {/* Insured Name */}
      <div style={{ marginBottom: 10 }}>
        <label>Insured Name</label>
        <input
          value={data.insuredName || ""}
          onChange={e => onChange("insuredName", e.target.value)}
          onBlur={e => onChange("insuredName", e.target.value)}
        />
        <div style={{ color: "red", minHeight: 18 }}>
          {errors.insuredName || "\u00A0"}
        </div>
      </div>

      {/* Insured Type */}
      <div style={{ marginBottom: 10 }}>
        <label>Insured Type</label>
        <select
          value={data.insuredType || ""}
          onChange={e => onChange("insuredType", e.target.value)}
          onBlur={e => onChange("insuredType", e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="INDIVIDUAL">Individual</option>
          <option value="CORPORATE">Corporate</option>
        </select>
        <div style={{ color: "red", minHeight: 18 }}>
          {errors.insuredType || "\u00A0"}
        </div>
      </div>

      {/* Sum Insured */}
      <div style={{ marginBottom: 10 }}>
        <label>Sum Insured</label>
        <input
          type="number"
          value={data.sumInsured || ""}
          onChange={e => onChange("sumInsured", Number(e.target.value))}
          onBlur={e => onChange("sumInsured", Number(e.target.value))}
        />
        <div style={{ color: "red", minHeight: 18 }}>
          {errors.sumInsured || "\u00A0"}
        </div>
      </div>

      {/* Premium */}
      <div style={{ marginBottom: 10 }}>
        <label>Premium</label>
        <input
          type="number"
          value={data.premium || ""}
          onChange={e => onChange("premium", Number(e.target.value))}
          onBlur={e => onChange("premium", Number(e.target.value))}
        />
        <div style={{ color: "red", minHeight: 18 }}>
          {errors.premium || "\u00A0"}
        </div>
      </div>

      {/* Retention Limit */}
      <div style={{ marginBottom: 10 }}>
        <label>Retention Limit</label>
        <input
          type="number"
          value={data.retentionLimit || ""}
          onChange={e => onChange("retentionLimit", Number(e.target.value))}
          onBlur={e => onChange("retentionLimit", Number(e.target.value))}
        />
        <div style={{ color: "red", minHeight: 18 }}>
          {errors.retentionLimit || "\u00A0"}
        </div>
      </div>

    </div>
  );
}
