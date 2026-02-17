import React from "react";

const allocationSummary = {
  retainedAmount: 3000000,
  cededAmount: 3000000,
  totalExposure: 6000000,
};

const AllocationSummary = () => {
  return (
    <div>
      <h2>Allocation Summary</h2>
      <p>Total Exposure: ₹{allocationSummary.totalExposure.toLocaleString()}</p>
      <p>Retained Amount: ₹{allocationSummary.retainedAmount.toLocaleString()}</p>
      <p>Ceded Amount: ₹{allocationSummary.cededAmount.toLocaleString()}</p>
    </div>
  );
};

export default AllocationSummary;
