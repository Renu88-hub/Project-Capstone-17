import React from 'react';
import DataTable from "../../shared/DataTable";

const PermissionEditor = () => {
  const modules = ['Policy', 'Claims', 'Reinsurance', 'Admin'];
  const permissions = {
    ADMIN: { Policy: ['Read', 'Create', 'Update', 'Delete'], Claims: ['Read', 'Update'], Reinsurance: ['Read'], Admin: ['Read', 'Update'] },
    UNDERWRITER: { Policy: ['Read', 'Create'], Claims: [], Reinsurance: [], Admin: [] },
  };

  const columns = ['Role', ...modules].map(mod => ({ header: mod, accessor: mod }));
  const data = Object.keys(permissions).map(role => {
    const row = { Role: role };
    modules.forEach(mod => row[mod] = (permissions[role][mod] || []).join(', '));
    return row;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Permission Editor</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PermissionEditor;
