import React, { useEffect, useState } from 'react'

const Pnf = () => {

    const [theme,setTheme] = useState("")

    useEffect(()=>{
        if(localStorage.getItem("theme")){
            setTheme(localStorage.getItem("theme"))
        }
    },[])

  return (
    <div className={`h-screen flex justify-center items-center ${theme=="Dark"?"bg-black":"bg-white"}`}>
        <h1 className={`text-5xl ${theme=="Dark"?"text-white":"text-black"}`}><span className='text-blue-400'>404 : </span>Page Not Found!</h1>
    </div>
  )
}

export default Pnf