import React from 'react';
import DataTable from "../../shared/DataTable";

const AuditLogs = () => {
  const logs = [
    { timestamp: '2026-02-16 10:00', user: 'admin1', action: 'CREATE', entity: 'User', entityId: '1', oldValue: '-', newValue: 'Created user admin1' },
    { timestamp: '2026-02-16 10:05', user: 'uw1', action: 'UPDATE', entity: 'Policy', entityId: '101', oldValue: 'DRAFT', newValue: 'ACTIVE' },
  ];

  const columns = [
    { header: 'Timestamp', accessor: 'timestamp' },
    { header: 'User', accessor: 'user' },
    { header: 'Action', accessor: 'action' },
    { header: 'Entity', accessor: 'entity' },
    { header: 'Entity ID', accessor: 'entityId' },
    { header: 'Old Value', accessor: 'oldValue' },
    { header: 'New Value', accessor: 'newValue' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Audit Logs</h2>
      <DataTable columns={columns} data={logs} />
    </div>
  );
};

export default AuditLogs;
