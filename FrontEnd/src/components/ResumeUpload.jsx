import React, { useState } from 'react'
import api from '../services/axios'
import { useDispatch } from 'react-redux'
import { getMe } from '../features/auth/authSlice'

function ResumeUpload() {
    const[file,setFile]=useState(null)
    const dispatch = useDispatch()

    const handleSubmit =async (e)=>{
        e.preventDefault()

        const formData = new FormData()

        formData.append("resume",file)

      const response = await api.patch("/user/upload-resume",formData)

        dispatch(getMe())

        if(response.status){
          console.log(response.status)
        }
            
    }
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload Resume
      </button>
    </form>
  );
}

export default ResumeUpload