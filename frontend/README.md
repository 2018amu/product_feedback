#  FeedPulse — AI-Powered Product Feedback Platform

FeedPulse is a full-stack web application that allows users to submit product feedback and uses AI (Google Gemini) to automatically analyze, categorize, and prioritize it.

---

##  Features

###  Feedback Submission

* Submit feedback without login
* Title, description, category, optional name/email
* Client-side validation
* Data stored in MongoDB

###  AI Analysis (Gemini)

* Auto categorization (Bug / Feature Request / Improvement / Other)
* Sentiment detection (Positive / Neutral / Negative)
* Priority scoring (1–10)
* AI-generated summary and tags

### Admin Dashboard

* Secure login (hardcoded admin)
* View all feedback
* Filter by category & status
* Search feedback (title + summary)
* Sort by date or priority
* Update status (New → In Review → Resolved)
* Stats dashboard:

  * Total feedback
  * Open items
  * Average priority
  * Most common tag
* Pagination (10 per page)

---

##  Tech Stack

Frontend:

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS

Backend:

* Node.js
* Express.js
* MongoDB + Mongoose

AI:

* Google Gemini API (gemini-1.5-flash)

---

##  How to Run Locally

### 1. Clone repository

git clone https://github.com/2018amu/product_feedback
cd feedpulse

---

### 2. Setup Backend

cd backend
npm install

Create `.env` file:

PORT=4000
MONGO_URI=mongodb://amushun1992_db_user:PwQge1UbU41Z3Xjs@ac-yvkonrq-shard-00-00.vxkonrq-shard-00-00.vxuhp3p.mongodb.net:27017,ac-yvkonrq-shard-00-01.vxuhp3p.mongodb.net:27017,ac-yvkonrq-shard-00-02.vxuhp3p.mongodb.net:27017/feedpulse?ssl=true&replicaSet=atlas-apk4vo-shard-0&authSource=admin&retryWrites=true&w=majority&appName=tm-users

JWT_SECRET=supersecret
GEMINI_API_KEY=AIzaSyAs1VgsdI1uj4gHA1rpUFznGXogue6mfEE

Run backend:

npm run dev

---

### 3. Setup Frontend

cd ../frontend
npm install

Run frontend:

npm run dev

---

### 4. Open App

Frontend: http://localhost:3000
Backend: http://localhost:4000

---

## 🔐 Admin Login

Email: [admin@feedpulse.com](mailto:admin@feedpulse.com)
Password: 123456

---

## 📸 Screenshots

(Add screenshots here — VERY IMPORTANT for submission)

---

##  Future Improvements

* Real authentication system (JWT + database users)
* Real-time updates (WebSockets)
* Email notifications
* Role-based access
* Deployment with Docker

---

##  Notes

* AI analysis is triggered on feedback submission
* Feedback is saved even if AI fails (error-safe design)

---
https://github.com/2018amu/product_feedback
