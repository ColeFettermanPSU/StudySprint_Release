import React from "react";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function TimerCard({
  timeLeft,
  isRunning,
  startTimer,
  pauseTimer,
  resetTimer,
  completeTimer
}) {
  return (
    <div className="card">
      <h2>Study Timer</h2>
      <div className="timer-display">{formatTime(timeLeft)}</div>

      <div className="button-row">
        {!isRunning ? (
          <button className="primary-btn" onClick={startTimer}>
            Start
          </button>
        ) : (
          <button className="secondary-btn" onClick={pauseTimer}>
            Pause
          </button>
        )}

        <button className="secondary-btn" onClick={resetTimer}>
          Reset
        </button>

        <button className="primary-btn" onClick={completeTimer}>
          Finish Session
        </button>
      </div>
    </div>
  );
}