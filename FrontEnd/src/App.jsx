import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import ThemeToggle from './components/themeToggle'
import Login from './pages/Login'
import Register from './pages/Register'
import { useDispatch } from 'react-redux'
import { getMe } from './features/auth/authSlice'
import { logoutUser } from './features/auth/authSlice'
import UnAutherized from './pages/UnAutherized'
import ProtectedRoute from './components/ProtectedRoute'
import RecruiterDashBoard from './pages/recruiter/RecruiterDashBoard'
import Jobs from './pages/Jobs'
import MyJobs from './pages/recruiter/MyJobs'
import JobApplicants from './pages/recruiter/JobApplicants'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Home from './pages/Home'
import PostJob from './pages/PostJob'
import {Toaster} from "react-hot-toast"
import EditJob from './pages/recruiter/EditJob'
import AdminDashboard from './pages/admin/AdminDashboard'
import MyApplications from './pages/MyApplications'
// import Logout from './pages/Logout'
function App() {
  const dispatch = useDispatch()
   useEffect(() => {
     dispatch(getMe());
   }, [dispatch]);
  const mode  = useSelector((state)=>state.theme.mode)

  useEffect(()=>{
      document.documentElement.classList.toggle("dark",mode==="dark")
  },[mode])
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unautherized" element={<UnAutherized />} />
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
          <Route path="/recruiter/dashboard" element={<RecruiterDashBoard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/jobs" element={<Jobs />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
          <Route path="/recruiter/jobs" element={<MyJobs />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
          <Route
            path="/recruiter/jobs/:jobId/applicants"
            element={<JobApplicants />}
          />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
          <Route path="/recruiter/post-job" element={<PostJob />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
          <Route path="/recruiter/edit-job/:id" element={<EditJob />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
            <Route path='/admin/dashboard' element={<AdminDashboard/>} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["user"]}/>}>
            <Route path='/my-applications' element={<MyApplications/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App