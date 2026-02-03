import React from 'react'

const Footer = () => {
  return (
    <div>
        <p className='text-center text-xs sm:text-base'>&copy; To Do List - {new Date().getFullYear()} | All Rights Reserved &reg;</p>
    </div>
  )
}

export default Footer