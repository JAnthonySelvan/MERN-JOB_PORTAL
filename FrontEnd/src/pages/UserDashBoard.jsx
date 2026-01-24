import React from 'react'
import { useSelector } from 'react-redux'
import Logout from './Logout'


function UserDashBoard() {
    const {name,email,role} = useSelector((state)=>state.auth.user)
  return (
    <div>
        <p>name:{name}</p>
        <p>email:{email}</p>
        <p>role:{role}</p>
        <Logout/>
    </div>
  )
}

export default UserDashBoard