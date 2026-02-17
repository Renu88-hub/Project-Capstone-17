import React from "react";
import AllocationTable from "./AllocationTable";
import AllocationSummary from "./AllocationSummary";
import AllocationValidation from "./AllocationValidation";

const RiskAllocationView = () => {
  return (
    <div>
      <h2>Risk Allocation View</h2>
      <AllocationTable />
      <AllocationSummary />
      <AllocationValidation />
    </div>
  );
};

export default RiskAllocationView;
