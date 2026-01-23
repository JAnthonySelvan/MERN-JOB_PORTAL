import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import ThemeToggle from './components/themeToggle'
import Login from './pages/Login'
import Register from './pages/Register'
import { useDispatch } from 'react-redux'
import { getMe } from './features/auth/authSlice'
import { logoutUser } from './features/auth/authSlice'
// import Logout from './pages/Logout'
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getMe())
  },[dispatch])
  const mode  = useSelector((state)=>state.theme.mode)

  useEffect(()=>{
      document.documentElement.classList.toggle("dark",mode==="dark")
  },[mode])
  return (
    <Router>
      <ThemeToggle />
      
      <Routes>
        {/* <Route path='/logout' element={<Logout/>}/> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App