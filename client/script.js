/*
  StudySprint Functionality
  Developed by:
  - Zamman Qureshi (Timer logic and frontend functionality)

  Change Log:
  - v1.0 (Apr 17, 2026): Implemented base countdown timer
  - v1.1 (Apr 18, 2026): Added start, pause, and reset controls
  - v1.2 (Apr 19, 2026): Added finish session logic and notes support
  - v1.3 (Apr 20, 2026): Connected frontend to Express and MongoDB backend
*/

const API_URL = "http://localhost:5000/api/sessions";

let defaultTime = 1500;
let time = defaultTime;
let interval = null;

// ================= TIMER =================
function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("timer").innerText =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(interval);
      interval = null;
      alert("Session complete. Click Finish Session.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  time = defaultTime;
  updateDisplay();
}

// ================= BACKEND =================
async function getSavedSessions() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function saveSession(session) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(session)
    });

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function clearSessionsDB() {
  await fetch(API_URL, { method: "DELETE" });
}

// ================= SESSION =================
async function finishSession() {
  const major = document.getElementById("major").value.trim();
  const studyTopic = document.getElementById("studyTopic").value.trim();
  const extraNotes = document.getElementById("extraNotes").value.trim();

  const minutesCompleted = Math.floor((defaultTime - time) / 60);

  if (!major || !studyTopic) {
    alert("Fill out the fields first.");
    return;
  }

  if (minutesCompleted <= 0) {
    alert("Start the timer first.");
    return;
  }

  const session = {
    major,
    studyTopic,
    extraNotes,
    minutes: minutesCompleted,
    date: new Date().toLocaleString()
  };

  await saveSession(session);

  renderSessions();
  renderGraph();
  resetTimer();
  clearForm();
}

function clearForm() {
  document.getElementById("major").value = "";
  document.getElementById("studyTopic").value = "";
  document.getElementById("extraNotes").value = "";
}

// ================= DISPLAY =================
async function renderSessions() {
  const list = document.getElementById("sessionList");
  const sessions = await getSavedSessions();

  if (sessions.length === 0) {
    list.innerHTML = "No sessions yet.";
    return;
  }

  list.innerHTML = sessions
    .map(s => `
      <div style="border:1px solid #ccc;padding:10px;margin:10px;">
        <b>${s.studyTopic}</b><br>
        ${s.major}<br>
        ${s.minutes} minutes<br>
        ${s.extraNotes || ""}
      </div>
    `)
    .join("");
}

async function renderGraph() {
  const graph = document.getElementById("graphContainer");
  const sessions = await getSavedSessions();

  if (sessions.length === 0) {
    graph.innerHTML = "No data yet.";
    return;
  }

  graph.innerHTML = sessions
    .slice(-6)
    .map(s => `
      <div style="
        height:${s.minutes * 3}px;
        width:40px;
        background:#001e44;
        margin:5px;
        display:inline-block;
      "></div>
    `)
    .join("");
}

// ================= CLEAR =================
async function clearSessions() {
  const confirmClear = confirm("Delete all sessions?");
  if (!confirmClear) return;

  await clearSessionsDB();
  renderSessions();
  renderGraph();
}

// ================= INIT =================
updateDisplay();
renderSessions();
renderGraph();