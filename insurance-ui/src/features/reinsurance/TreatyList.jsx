import React, { useEffect, useState } from "react";
import API from "../../api/reinsuranceAPI"; 

const TreatyList = () => {
  const [treaties, setTreaties] = useState([]);

  useEffect(() => {
    const fetchTreaties = async () => {
      try {
        const response = await API.get("/treaties"); 
        console.log("Fetched treaties:", response.data);
        setTreaties(response.data);
      } catch (error) {
        console.error("Error fetching treaties:", error.response || error.message);
      }
    };

    fetchTreaties();
  }, []);

  return (
    <div>
      <h2>Reinsurance Treaty List</h2>
      {treaties.length === 0 ? (
        <p>No treaties found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Treaty Name</th>
              <th>Type</th>
              <th>Reinsurer</th>
              <th>Share %</th>
              <th>Retention Limit</th>
              <th>Treaty Limit</th>
              <th>LOBs</th>
              <th>Status</th>
              <th>Effective From</th>
              <th>Effective To</th>
            </tr>
          </thead>
          <tbody>
            {treaties.map((treaty) => (
              <tr key={treaty._id}>
                <td>{treaty.treatyName}</td>
                <td>{treaty.treatyType}</td>
                <td>{treaty.reinsurerId}</td>
                <td>{treaty.sharePercentage}</td>
                <td>{treaty.retentionLimit}</td>
                <td>{treaty.treatyLimit}</td>
                <td>{treaty.applicableLOBs}</td>
                <td>{treaty.status}</td>
                <td>{new Date(treaty.effectiveFrom).toLocaleDateString()}</td>
                <td>{new Date(treaty.effectiveTo).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TreatyList;
