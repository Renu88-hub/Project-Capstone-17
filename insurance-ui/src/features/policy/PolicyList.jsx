import React, { useState, useEffect } from "react";
import { fetchPolicies } from "../../api/policyApi";

function PolicyList({ onSelectPolicy, onCreatePolicy }) {
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortField, setSortField] = useState("policyNumber");

  useEffect(() => {
    const loadPolicies = async () => {
      const res = await fetchPolicies();
      setPolicies(res.data);
    };
    loadPolicies();
  }, []);

  let filtered = policies
    .filter(p =>
      p.policyNumber.includes(search) || p.insuredName.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => !statusFilter || p.status === statusFilter)
    .sort((a,b) => (a[sortField] > b[sortField]?1:-1));

  return (
    <div>
      <h2>Policy List</h2>
      <div style={{marginBottom:"10px"}}>
        <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="DRAFT">DRAFT</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="SUSPENDED">SUSPENDED</option>
        </select>
        <select value={sortField} onChange={e=>setSortField(e.target.value)}>
          <option value="policyNumber">Policy Number</option>
          <option value="insuredName">Insured Name</option>
          <option value="createdAt">Created At</option>
        </select>
        <button style={{marginLeft:"10px"}} onClick={onCreatePolicy}>+ Create Policy</button>
      </div>

      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Policy Number</th>
            <th>Insured Name</th>
            <th>Status</th>
            <th>LOB</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p, idx) => (
            <tr key={idx} style={{cursor:"pointer"}} onClick={()=>onSelectPolicy(p)}>
              <td>{p.policyNumber}</td>
              <td>{p.insuredName}</td>
              <td>{p.status}</td>
              <td>{p.lineOfBusiness}</td>
              <td>{p.createdAt}</td>
              <td><button onClick={()=>onSelectPolicy(p)}>View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PolicyList;
