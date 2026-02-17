import React, { useState } from 'react';
import DataTable from "../../shared/DataTable";
import StatusBadge from '../../shared/StatusBadge';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'admin1', email: 'admin1@example.com', password: 'admin123', role: 'ADMIN', status: <StatusBadge status="ACTIVE"/> },
    { id: 2, username: 'uw1', email: 'uw1@example.com', password: 'uwpass', role: 'UNDERWRITER', status: <StatusBadge status="ACTIVE"/> },
    { id: 3, username: 'ca1', email: 'ca1@example.com', password: 'capass', role: 'CLAIMS_ADJUSTER', status: <StatusBadge status="INACTIVE"/> },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const columns = [
    { header: 'Username', accessor: 'username' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    { header: 'Status', accessor: 'status' },
    { header: 'Actions', accessor: 'actions' },
  ];

  const handleSave = (user) => {
    if (editUser) {
      setUsers(users.map(u =>
        u.id === editUser.id
          ? { ...user, status: <StatusBadge status={user.status}/>, id: editUser.id }
          : u
      ));
    } else {
      setUsers([...users, { ...user, status: <StatusBadge status={user.status}/>, id: users.length + 1 }]);
    }
    setShowModal(false);
    setEditUser(null);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const data = users.map(u => ({
    ...u,
    actions: <button onClick={() => handleEdit(u)} className="text-blue-500">Edit</button>
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <button
        className="mb-2 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setShowModal(true)}
      >
        Add User
      </button>
      <DataTable columns={columns} data={data} />
      {showModal && <UserForm user={editUser} onSave={handleSave} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default UserList;
