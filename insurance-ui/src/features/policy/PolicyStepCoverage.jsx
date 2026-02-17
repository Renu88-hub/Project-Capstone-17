import React from "react";

function PolicyStepCoverage({ data, onChange, errors }) {
  return (
    <div>
      <h3>Step 2: Coverage</h3>
      <select
        value={data.lineOfBusiness}
        onChange={(e) => onChange("lineOfBusiness", e.target.value)}
      >
        <option value="">Select LOB</option>
        <option value="HEALTH">Health</option>
        <option value="MOTOR">Motor</option>
        <option value="LIFE">Life</option>
        <option value="PROPERTY">Property</option>
      </select>
      {errors?.lineOfBusiness && <span style={{color:'red'}}>{errors.lineOfBusiness}</span>}

      {data.lineOfBusiness === "MOTOR" && (
        <>
          <input
            type="text"
            placeholder="Vehicle Type"
            value={data.vehicleType}
            onChange={(e) => onChange("vehicleType", e.target.value)}
          />
        </>
      )}
      {data.lineOfBusiness === "PROPERTY" && (
        <>
          <input
            type="text"
            placeholder="Building Type"
            value={data.buildingType}
            onChange={(e) => onChange("buildingType", e.target.value)}
          />
        </>
      )}
    </div>
  );
}

export default PolicyStepCoverage;
