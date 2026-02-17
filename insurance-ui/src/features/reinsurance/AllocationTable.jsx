import React, { useState } from "react";

const allocationsData = [
  { id: 1, reinsurer: "Reinsurer A", allocatedAmount: 2000000, allocatedPercentage: 40 },
  { id: 2, reinsurer: "Reinsurer B", allocatedAmount: 1000000, allocatedPercentage: 20 },
];

const AllocationTable = () => {
  const [allocations, setAllocations] = useState(allocationsData);

  const handleChange = (id, field, value) => {
    setAllocations(prev =>
      prev.map(a => (a.id === id ? { ...a, [field]: Number(value) } : a))
    );
  };

  return (
    <div>
      <h2>Allocation Table</h2>
      <table border="1" cellPadding="5" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Reinsurer</th>
            <th>Allocated Amount</th>
            <th>Allocated %</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map(row => (
            <tr key={row.id}>
              <td>{row.reinsurer}</td>
              <td>
                <input type="number" value={row.allocatedAmount} onChange={e => handleChange(row.id, "allocatedAmount", e.target.value)} />
              </td>
              <td>
                <input type="number" value={row.allocatedPercentage} onChange={e => handleChange(row.id, "allocatedPercentage", e.target.value)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllocationTable;
