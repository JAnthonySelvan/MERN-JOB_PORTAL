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
import UserDashBoard from './pages/UserDashBoard'
import RecruiterDashBoard from './pages/RecruiterDashBoard'
import AdminDashboard from './pages/AdminDashboard'
// import Logout from './pages/Logout'
function App() {
  const dispatch = useDispatch()
  const state = useSelector((state)=>state.auth)
   useEffect(() => {
     dispatch(getMe());
    //  console.log(state)
   }, [dispatch]);
  const mode  = useSelector((state)=>state.theme.mode)

  useEffect(()=>{
      document.documentElement.classList.toggle("dark",mode==="dark")
  },[mode])
  return (
    <Router>
      <ThemeToggle />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unautherized" element={<UnAutherized />} />

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/dashboard" element={<UserDashBoard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
          <Route path="/recruiter/dashboard" element={<RecruiterDashBoard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App