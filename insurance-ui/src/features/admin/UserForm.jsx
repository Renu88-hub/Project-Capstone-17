// import React, { useState } from 'react';

// const UserForm = ({ user, onSave, onClose }) => {
//   const [form, setForm] = useState(user || {
//     username: '',
//     email: '',
//     password: '',
//     role: 'ADMIN',
//     status: 'ACTIVE'
//   });

//   const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
//   const handleSubmit = e => {
//     e.preventDefault();
//     onSave(form);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded w-96">
//         <h2 className="text-lg font-bold mb-4">{user ? 'Edit User' : 'Add User'}</h2>
//         <form onSubmit={handleSubmit} className="space-y-2">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={form.username}
//             onChange={handleChange}
//             className="w-full p-2 border"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full p-2 border"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full p-2 border"
//             required={!user} // required for new users, optional for edit
//           />
//           <select
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//             className="w-full p-2 border"
//           >
//             <option>ADMIN</option>
//             <option>UNDERWRITER</option>
//             <option>CLAIMS_ADJUSTER</option>
//             <option>REINSURANCE_MANAGER</option>
//           </select>
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="w-full p-2 border"
//           >
//             <option>ACTIVE</option>
//             <option>INACTIVE</option>
//           </select>
//           <div className="flex justify-end space-x-2">
//             <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;

import React, { useState } from "react";

const UserForm = ({ user, onSave, onClose }) => {
  const [form, setForm] = useState(user || {
    username: "",
    email: "",
    password: "",
    role: "ADMIN",
    status: "ACTIVE"
  });

  const [errors, setErrors] = useState({});

  // Field validation on change
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });

    let fieldError = "";
    if ((field === "username" || field === "email") && !value.trim()) {
      fieldError = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }

    if (field === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) fieldError = "Invalid email format";
    }

    if (field === "password" && !user && !value) {
      fieldError = "Password is required";
    }

    setErrors({ ...errors, [field]: fieldError });
  };

  // Full form validation
  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format";
    if (!user && !form.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) onSave(form);
  };

  const fieldStyle = { display: "flex", flexDirection: "column", marginBottom: 10 };
  const errorStyle = { color: "red", minHeight: 18 };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ background: "white", padding: 20, borderRadius: 6, width: 360 }}>
        <h3>{user ? "Edit User" : "Add User"}</h3>

        <div style={fieldStyle}>
          <input
            placeholder="Username"
            value={form.username}
            onChange={e => handleChange("username", e.target.value)}
            onBlur={e => handleChange("username", e.target.value)}
          />
          <div style={errorStyle}>{errors.username || "\u00A0"}</div>
        </div>

        <div style={fieldStyle}>
          <input
            placeholder="Email"
            value={form.email}
            onChange={e => handleChange("email", e.target.value)}
            onBlur={e => handleChange("email", e.target.value)}
          />
          <div style={errorStyle}>{errors.email || "\u00A0"}</div>
        </div>

        <div style={fieldStyle}>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => handleChange("password", e.target.value)}
            onBlur={e => handleChange("password", e.target.value)}
          />
          <div style={errorStyle}>{errors.password || "\u00A0"}</div>
        </div>

        <div style={fieldStyle}>
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option>ADMIN</option>
            <option>UNDERWRITER</option>
            <option>CLAIMS_ADJUSTER</option>
            <option>REINSURANCE_MANAGER</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option>ACTIVE</option>
            <option>INACTIVE</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} style={{ background: "blue", color: "white", padding: "6px 12px" }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
