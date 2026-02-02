import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }
  useEffect(()=>{
    if(!localStorage.getItem("token")){
        navigate('/login')
    }
  },[])
  return (
    <div className='bg-black/10 h-15 backdrop-blur-2xl fixed w-full z-99'>
        <div className='flex justify-between items-center h-full px-20'>
            <a className='text-blue-400 text-2xl font-bold' href="#">ToDo</a>
            <button onClick={handleLogout} className='bg-blue-400 border text-white py-1 px-2 rounded hover:bg-white hover:text-blue-400 cursor-pointer duration-200 active:scale-97'>Log Out</button>
        </div>
    </div>
  )
}

export default Header