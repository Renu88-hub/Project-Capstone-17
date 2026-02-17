import React from 'react';
import DataTable from "../../shared/DataTable";

const TreatyConfiguration = () => {
  const treaties = [
    { name: 'Treaty A', type: 'QUOTA_SHARE', reinsurer: 'Reinsurer 1', share: '40%', limit: '₹50,00,000', status: 'ACTIVE' },
    { name: 'Treaty B', type: 'SURPLUS', reinsurer: 'Reinsurer 2', share: '20%', limit: '₹30,00,000', status: 'ACTIVE' },
  ];

  const columns = [
    { header: 'Treaty Name', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Reinsurer', accessor: 'reinsurer' },
    { header: 'Share', accessor: 'share' },
    { header: 'Limit', accessor: 'limit' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Treaty Configuration</h2>
      <DataTable columns={columns} data={treaties} />
    </div>
  );
};

export default TreatyConfiguration;
