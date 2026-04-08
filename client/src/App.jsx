import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import TimerCard from "./components/TimerCard";
import SessionForm from "./components/SessionForm";
import WeeklyChart from "./components/WeeklyChart";
import HistoryList from "./components/HistoryList";
import useTimer from "./hooks/useTimer";

function App() {
  const {
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    completeTimer,
    sessionMinutes,
    elapsedTime,       // ✅ NEW
    isCompleted        // ✅ NEW
  } = useTimer(1500);

  const [sessions, setSessions] = useState([]);
  const [readyToLog, setReadyToLog] = useState(false);

  const fetchSessions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sessions");
      setSessions(response.data);
    } catch (error) {
      console.error("Failed to fetch sessions");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setReadyToLog(true);
    }
  }, [timeLeft]);

  const handleCompleteSession = () => {
    completeTimer();
    setReadyToLog(true);
  };

  const handleResetTimer = () => {
    resetTimer();
    setReadyToLog(false);
  };

  const handleSessionSaved = (newSession) => {
    setSessions((prev) => [newSession, ...prev]);
    setReadyToLog(false);
    resetTimer();
  };

  // ✅ CONVERT elapsed time to minutes
  const actualMinutes = Math.floor(elapsedTime / 60);

  return (
    <div className="app">
      <header className="hero">
        <h1>StudySprint</h1>
        <p>Focus, log your work, and track weekly progress.</p>
      </header>

      <main className="grid-layout">
        <TimerCard
          timeLeft={timeLeft}
          isRunning={isRunning}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          resetTimer={handleResetTimer}
          completeTimer={handleCompleteSession}
        />

        {readyToLog && (
          <SessionForm
            minutes={actualMinutes}   // ✅ FIXED
            completed={isCompleted}  // ✅ OPTIONAL (if you use it)
            onSessionSaved={handleSessionSaved}
          />
        )}

        <WeeklyChart sessions={sessions} />
        <HistoryList sessions={sessions} />
      </main>
    </div>
  );
}

export default App;