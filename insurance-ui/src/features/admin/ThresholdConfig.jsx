import React from 'react';
import DataTable from "../../shared/DataTable";

const ThresholdConfig = () => {
  const thresholds = [
    { lineOfBusiness: 'HEALTH', retentionLimit: '₹50,00,000' },
    { lineOfBusiness: 'MOTOR', retentionLimit: '₹30,00,000' },
    { lineOfBusiness: 'LIFE', retentionLimit: '₹70,00,000' },
  ];

  const columns = [
    { header: 'Line of Business', accessor: 'lineOfBusiness' },
    { header: 'Retention Limit', accessor: 'retentionLimit' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Threshold Configuration</h2>
      <DataTable columns={columns} data={thresholds} />
    </div>
  );
};

export default ThresholdConfig;
