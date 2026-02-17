import React from "react";

const allocationValidation = [
  { id: 1, message: "Reinsurer A allocation exceeds treaty limit!" },
  { id: 2, message: "Total allocated percentage exceeds 100%!" },
];

const AllocationValidation = () => {
  return (
    <div>
      <h2>Allocation Validation</h2>
      <ul>
        {allocationValidation.map(v => (
          <li key={v.id} style={{ color: "red" }}>{v.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllocationValidation;
