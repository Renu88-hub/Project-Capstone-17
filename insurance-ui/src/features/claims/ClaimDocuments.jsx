import React from "react";

export default function ClaimDocuments({ claim, onUpdate }) {

  const addDoc = () => {
    const updated = {
      ...claim,
      documents: [...claim.documents, "Document_" + (claim.documents.length + 1)]
    };
    onUpdate(updated);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h4>Documents</h4>
      <ul>
        {claim.documents.map((doc, i) => <li key={i}>{doc}</li>)}
      </ul>
      <button onClick={addDoc}>Upload Mock Document</button>
    </div>
  );
}
