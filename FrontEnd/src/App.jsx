import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ThemeToggle from './components/themeToggle'

function App() {
  const mode  = useSelector((state)=>state.theme.mode)

  useEffect(()=>{
      document.documentElement.classList.toggle("dark",mode==="dark")
  },[mode])
  return (
    <ThemeToggle/>
    // <div className="min-h-screen">
    //   <h1 className="text-2xl font-bold p-4">Job Portal</h1>
    // </div>
  );
}

export default App