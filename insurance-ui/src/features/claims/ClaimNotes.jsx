import React, { useState } from "react";

export default function ClaimNotes({ claim, onUpdate }) {
  const [note, setNote] = useState("");

  const addNote = () => {
    const updated = {
      ...claim,
      notes: [...claim.notes, { text: note, date: new Date().toLocaleString() }]
    };
    onUpdate(updated);
    setNote("");
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h4>Notes</h4>
      <ul>
        {claim.notes.map((n, i) => <li key={i}>{n.text} ({n.date})</li>)}
      </ul>
      <input value={note} onChange={e => setNote(e.target.value)} />
      <button onClick={addNote}>Add Note</button>
    </div>
  );
}
