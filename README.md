🌐 Live Demo
Frontend (Vercel):
👉https://job-junction-lime.vercel.app/
Backend (Render):
👉https://mern-job-portal-m2pc.onrender.com/

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📌 Project Overview
JobJunction is a full-stack job portal built with the MERN stack where:
👨‍💼 Users can apply for jobs, upload resumes
🏢 Recruiters can post jobs & schedule interviews
🛡 Admin can manage recruiters & users
📧 Email notifications for interviews & password reset
☁ Cloudinary for resume storage
🔐 Secure JWT authentication with HTTP-only cookies

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

✨Feature List
🔐 Authentication
Register / Login / Logout
Role-based access (User / Recruiter / Admin)
JWT authentication (HTTP-only cookies)
Forgot password via email
Reset password with token

---

👤 User Features
Browse & search jobs
Apply to jobs
View application status
Accept / Reject interview
Upload resume (Cloudinary)
Save / Bookmark jobs.

---

🏢 Recruiter Features
Create / Edit / Delete jobs
View applicants
Shortlist / Reject applicants
Schedule interviews
Edit / Cancel interview
Send email notifications.

---

🛡 Admin Features
View users
Approve / Reject recruiters

---
  
🎨 Frontend
Dark mode
Responsive Navbar (Desktop + Mobile)
Drawer menu
Profile dropdown
Scroll animations
Footer with social links

---

☁ Deployment
Frontend → Vercel
Backend → Render
Database → MongoDB Atlas
File Storage → Cloudinary
Email Service → Brevo
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📸 Screenshots

 🏠 Homepage  
Modern landing page with role-based navigation and clean dark/light UI.  
![Homepage](./screenshots/Homepage.png)

---

📋 Jobs Page  
Browse, search and filter jobs with real-time updates and apply functionality.  
![Jobs](./screenshots/Jobs.png)

---

📝 My Applications  
Track applied jobs, view interview status, and manage responses.  
![MyApplications](./screenshots/MyApplications.png)

---

👥 Job Applicants (Recruiter View)  
Recruiters can view applicants, shortlist, reject, and schedule interviews.  
![JobApplicants](./screenshots/JobApplicants.png)

---

👤 Profile Page  
User profile with resume upload and secure file handling via Cloudinary.  
![Profile](./screenshots/Profile.png)

---

🧑‍💼 Recruiter Dashboard  
Recruiter analytics and job management overview.  
![RecruiterDashboard](./screenshots/RecruiterDashboard.png)

---

📂 Recruiter Jobs  
Manage posted jobs, edit, delete, and monitor applications.  
![RecruiterJobs](./screenshots/RecruiterJobs.png)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🏗 System Architecture

Frontend (React + Vite)
        ↓
Backend API (Node + Express)
        ↓
MongoDB Atlas (Database)

File Storage → Cloudinary
Email Service → Brevo
Deployment:
Frontend → Vercel
Backend → Render

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📂 Folder Structure

JobPortal/
│
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── features/
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── config/

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🛠 Tech Stack

Frontend:
- React
- Redux Toolkit
- Tailwind CSS
- React Router

Backend:
- Node.js
- Express.js
- MongoDB
- JWT Authentication

Cloud:
- MongoDB Atlas
- Cloudinary
- Brevo
- Render
- Vercel


