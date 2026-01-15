Job Listing Web Application

A full-stack job listing web application that allows users to browse jobs, filter by location, and view detailed job information with real apply links.

🔗 Live Demo

Frontend (Vercel):
👉 https://job-listing-frontend-green-eight.vercel.app/

Backend API (Railway):
👉 https://job-listing-backend-production-234d.up.railway.app/api

📦 GitHub Repositories

Frontend: https://github.com/Abhyuday28/job-listing-frontend

Backend: https://github.com/Abhyuday28/job-listing-backend

✨ Features

Job listing with master–detail layout

Location-based job search (server-side filtering)

Job detail view with:

Clean, minimalist UI

REST API powered by MongoDB Atlas

Fully deployed backend & frontend

🛠️ Tech Stack
Frontend
React (Vite)
Tailwind CSS
Axios
lucide-react (icons)
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
Deployment

Backend: Railway
Frontend: Vercel

⚙️ Running Locally
1️⃣ Clone repositories
git clone https://github.com/Abhyuday28/job-listing-backend
git clone https://github.com/Abhyuday28/job-listing-frontend

2️⃣ Backend setup
cd job-listing-backend
npm install


Create .env file:

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/jobDB


Seed the database:
node seed.js

Run backend:
npm run dev


Backend will run on:
http://localhost:5000

3️⃣ Frontend setup
cd job-listing-frontend
npm install
npm run dev


Frontend will run on:
http://localhost:5173

🔍 API Endpoints
Get all jobs
GET /api/jobs

Filter jobs by location
GET /api/jobs?location=Delhi

🧠 Implementation Notes

Backend performs server-side filtering using MongoDB regex search.

Location search is debounced and protected from race conditions.

All job links and company URLs are sourced directly from the provided dataset.

No dummy data or hardcoded values used.

📌 Assumptions & Trade-offs

Authentication was intentionally excluded as it was not part of the task scope.

UI focuses on clarity and usability rather than heavy animations.

Search is location-based only, as specified in the task.

✅ Status

✔ Task requirements completed
✔ Backend & frontend deployed
✔ Tested end-to-end

👤 Author

Abhyuday
Frontend Developer
