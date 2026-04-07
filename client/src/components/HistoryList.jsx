import React from "react";

export default function HistoryList({ sessions }) {
  return (
    <div className="card">
      <h2>Session History</h2>

      {sessions.length === 0 ? (
        <p>No sessions saved yet.</p>
      ) : (
        <ul className="history-list">
          {sessions.map((session) => (
            <li key={session._id} className="history-item">
              <div>
                <strong>{session.subject}</strong>
                <p>{session.notes || "No notes added."}</p>
              </div>
              <div className="history-meta">
                <span>{session.minutes} min</span>
                <span>{new Date(session.createdAt).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}