import React, { useState } from "react";
import axios from "axios";

export default function SessionForm({ minutes, onSessionSaved }) {
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!subject.trim()) {
      alert("Please enter a subject.");
      return;
    }

    if (!minutes || minutes < 1) {
      alert("Minutes must be at least 1.");
      return;
    }

    try {
      setSaving(true);

      const response = await axios.post("http://localhost:5000/api/sessions", {
        subject: subject.trim(),
        minutes,
        notes: notes.trim()
      });

      setSubject("");
      setNotes("");

      if (onSessionSaved) {
        onSessionSaved(response.data);
      }

      alert("Session saved successfully.");
    } catch (error) {
      alert("Failed to save session.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card">
      <h2>Log Study Session</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Subject
          <input
            type="text"
            placeholder="Example: Calculus"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>

        <label>
          Minutes
          <input type="number" value={minutes} readOnly />
        </label>

        <label>
          Notes (optional)
          <textarea
            rows="4"
            placeholder="What did you work on?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        <button className="primary-btn" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Session"}
        </button>
      </form>
    </div>
  );
}