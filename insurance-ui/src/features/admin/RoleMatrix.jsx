import React from 'react';
import DataTable from "../../shared/DataTable";

const RoleMatrix = () => {
  const roles = [
    { role: 'ADMIN', users: 1, permissions: 'Full Access' },
    { role: 'UNDERWRITER', users: 3, permissions: 'Policy Create/Edit' },
    { role: 'CLAIMS_ADJUSTER', users: 2, permissions: 'Claim Review/Settle' },
    { role: 'REINSURANCE_MANAGER', users: 1, permissions: 'Treaty Management' },
  ];

  const columns = [
    { header: 'Role', accessor: 'role' },
    { header: 'Assigned Users', accessor: 'users' },
    { header: 'Permissions', accessor: 'permissions' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Role Matrix</h2>
      <DataTable columns={columns} data={roles} />
    </div>
  );
};

export default RoleMatrix;
