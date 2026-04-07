import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function getStartOfWeek(date) {
  const copied = new Date(date);
  const day = copied.getDay();
  const diff = copied.getDate() - day;
  copied.setDate(diff);
  copied.setHours(0, 0, 0, 0);
  return copied;
}

export default function WeeklyChart({ sessions }) {
  const today = new Date();
  const startOfWeek = getStartOfWeek(today);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = days.map((day) => ({
    day,
    minutes: 0
  }));

  sessions.forEach((session) => {
    const sessionDate = new Date(session.createdAt);

    if (sessionDate >= startOfWeek && sessionDate < endOfWeek) {
      const dayIndex = sessionDate.getDay();
      chartData[dayIndex].minutes += session.minutes;
    }
  });

  return (
    <div className="card">
      <h2>This Week's Progress</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="minutes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}