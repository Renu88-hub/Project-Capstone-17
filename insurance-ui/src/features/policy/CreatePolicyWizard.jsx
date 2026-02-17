import React, { useState } from "react";
import PolicyStepGeneral from "./PolicyStepGeneral";
import PolicyStepCoverage from "./PolicyStepCoverage";
import PolicyStepReview from "./PolicyStepReview";
import { createPolicy } from "../../api/policyApi";

function CreatePolicyWizard() {
  const [step, setStep] = useState(1);
  const [policyData, setPolicyData] = useState({
    insuredName: "",
    sumInsured: "",
    lineOfBusiness: "",
    vehicleType: "",
    buildingType: "",
  });

  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  // Handles input change and validates field immediately
  const handleChange = (field, value) => {
    setPolicyData({ ...policyData, [field]: value });

    // Live validation for individual fields
    let fieldError = "";
    if (field === "insuredName" && !value.trim()) fieldError = "Required";
    if (field === "sumInsured") {
      const num = parseFloat(value);
      if (isNaN(num) || num <= 0) fieldError = "Sum Insured must be > 0";
    }
    if (field === "lineOfBusiness" && step === 2 && !value) {
      fieldError = "Select Line of Business";
    }

    setErrors({ ...errors, [field]: fieldError });
  };

  // Validate all fields of the current step before moving next
  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!policyData.insuredName.trim()) newErrors.insuredName = "Insured Name is mandatory";

      const sum = parseFloat(policyData.sumInsured);
      if (isNaN(sum) || sum <= 0) newErrors.sumInsured = "Sum Insured must be > 0";
    }

    if (step === 2 && !policyData.lineOfBusiness) {
      newErrors.lineOfBusiness = "Select Line of Business";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
  try {
    await createPolicy(policyData);
    alert("Policy Created Successfully");
    setShowConfirm(false);
  } catch (err) {
    alert("Error creating policy");
  }
};

  return (
    <div className="wizard-container">
      <h2>Create Policy Wizard</h2>
      <p>Step {step} of 3</p>

      {step === 1 && (
        <PolicyStepGeneral
          data={policyData}
          onChange={handleChange}
          errors={errors}
        />
      )}
      {step === 2 && (
        <PolicyStepCoverage
          data={policyData}
          onChange={handleChange}
          errors={errors}
        />
      )}
      {step === 3 && <PolicyStepReview data={policyData} />}

      <div style={{ marginTop: "15px" }}>
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < 3 && <button onClick={nextStep}>Next</button>}
        {step === 3 && (
          <button onClick={() => setShowConfirm(true)}>Save as Draft</button>
        )}
      </div>

      {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>Do you want to save policy as DRAFT?</p>
            <button onClick={handleSubmit}>Yes</button>
            <button onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .wizard-container {
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 6px;
          max-width: 600px;
        }
        .modal {
          position: fixed;
          top: 0; left: 0; right:0; bottom:0;
          background: rgba(0,0,0,0.4);
          display:flex; align-items:center; justify-content:center;
        }
        .modal-content {
          background:white; padding:20px; border-radius:6px; text-align:center;
        }
        button {
          margin: 5px;
          padding: 5px 12px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default CreatePolicyWizard;
