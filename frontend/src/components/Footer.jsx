import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-950 h-10 flex justify-center items-center text-white sm:text-base text-xs'>
        <p>&copy; {new Date().getFullYear()} ToDo. All rights reserved.</p>
    </div>
  )
}

export default Footer