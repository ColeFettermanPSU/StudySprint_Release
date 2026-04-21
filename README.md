# Study Sprint (Penn State Edition)

---

## Overview

Study Sprint is a web-based study tracking application designed to help users create, manage, and visualize focused study sessions. 

This version of the project includes both a static web application deployed using GitHub Pages and a full-stack implementation using Node.js, Express, and MongoDB.

---

## Purpose

The purpose of Study Sprint is to:

* Help users track and manage study sessions
* Provide a structured way to stay focused while studying
* Allow users to log session details such as subject and notes
* Visually display progress using a session-based graph

---

## Technology Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js with Express
* Database: MongoDB (via Mongoose)
* Data Storage: LocalStorage (static demo) + MongoDB (full-stack version)
* Deployment: GitHub Pages (frontend demo)

---

## Screenshots

### Timer & Session Controls
<p align="center">
  <img src="images/timer.png" width="750">
</p>

---

### Progress Graph
<p align="center">
  <img src="images/graph.png" width="750">
</p>

---

### Session History
<p align="center">
  <img src="images/history.png" width="750">
</p>

---

## Features

* Focus timer (start, pause, reset)
* Finish Session button to log completed sessions
* Study notes input (major/subject and topic)
* Extra notes for session details
* Progress graph (bar chart of completed sessions)
* Session history display
* Persistent data storage using MongoDB (full-stack version)

---

## Project Structure

StudySprint_Release/
├── client/
├── server/
├── images/
└── README.md

---

## How It Works

1. The user starts a study session using the timer  
2. After completing the session, the user clicks "Finish Session"  
3. The user enters study details (major, topic, notes)  
4. The frontend sends the data to an Express backend using API requests  
5. The backend stores the data in MongoDB  
6. The frontend retrieves stored data to update the graph and session history  

---

## Live Demo

Frontend (GitHub Pages):  
https://ColeFettermanPSU.github.io/StudySprint_Release/

---

## Full Stack Implementation

In addition to the static GitHub Pages version, this project includes a full-stack implementation using Node.js, Express, and MongoDB.

The frontend communicates with a backend API to:

- Save study sessions  
- Retrieve session history  
- Delete stored sessions  

Session data is stored in MongoDB, allowing for persistent storage beyond the browser.

The full-stack version runs locally and demonstrates client-server communication and database integration.

---

## Current Status

This project is a functional MVP that includes both:

* A static frontend version hosted on GitHub Pages  
* A full-stack implementation using Express and MongoDB  

The static version demonstrates the UI and core functionality, while the full-stack version provides persistent data storage and API-based interaction.

---

## Future Improvements

* Daily/weekly aggregated progress tracking  
* Improved UI and animations  
* User authentication system  
* Cloud-based database integration  
* Enhanced mobile responsiveness  

---

## Team and Development

This project was developed collaboratively by:

- Cole Fetterman — Project Structure, Integration, and Deployment  
- Nelson Copete — Styling, Layout Design, and UI Enhancements  
- Zamman Qureshi — JavaScript Logic, Timer Functionality, and Backend Integration  

Development was conducted collaboratively through group sessions over Discord, where all team members worked together in real time on the project.

While each member was assigned primary responsibilities, all components of the project were developed with shared input, discussion, and teamwork across the entire group.

---

## Development Notes

During development, the project evolved from a static frontend application into a full-stack web application.

The GitHub Pages version serves as a frontend demonstration using LocalStorage, while the full-stack implementation integrates an Express backend and MongoDB database for persistent data storage.

This approach allowed the project to remain accessible online while also meeting full-stack development requirements.

---

## Repository Link

https://github.com/ColeFettermanPSU/StudySprint_Release

---

## 📝 Development Logs

### Cole Fetterman
- **v1.0 (Apr 17, 2026):** Created initial project structure and directory layout  
- **v1.1 (Apr 18, 2026):** Built main HTML structure and integrated core sections  
- **v1.2 (Apr 19, 2026):** Connected timer, notes form, graph, and history components  
- **v1.3 (Apr 20, 2026):** Configured GitHub repository and deployed via GitHub Pages  
- **v1.4 (Apr 20, 2026):** Restructured project into client/server folders  
- **v1.5 (Apr 20, 2026):** Integrated Express backend and MongoDB database  
- Assisted with debugging and full-stack integration across all components  
