import React, { useContext, useState } from 'react'
import {AuthContext} from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

const Header = (props) => {
  const [loggedInUser, setLoggedInUser]=useContext(AuthContext)
  const navigate = useNavigate()
  const handleClick = async () => {
    console.log("cleared");
    localStorage.clear();
    setLoggedInUser(null)
    navigate("/login");
  };

  return (
    <div className='flex items-end justify-between'>
      <h1 className='text-xl text-white font-medium'>Hello <br /><span className='text-xl text-white font-semibold'>{loggedInUser.username} 👋</span></h1>
      <button onClick={handleClick} className='bg-red-600 text-lg font-medium text-white px-5 py-2 rounded-sm '>Log Out</button>
    </div>
  )
}

export default Header
