import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
            <a className='text-blue-400 text-2xl font-bold' href="#">ToDL</a>
            <button onClick={handleLogout} className='bg-blue-400 border text-white py-1 px-2 rounded hover:bg-blue-500 cursor-pointer duration-200 active:scale-97'><FontAwesomeIcon icon={faArrowRightFromBracket} className='me-1' />Log Out</button>
        </div>
    </div>
  )
}

export default Header