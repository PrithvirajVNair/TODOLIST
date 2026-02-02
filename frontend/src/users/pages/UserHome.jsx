import React from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const UserHome = () => {

    const [filter,setFilter] = useState("Not Completed")

  return (
    <>
        <Header/>
        <div className='min-h-screen pt-20 px-20'>
            <h1 className='text-2xl font-semibold text-blue-400 text-center'>To Do List</h1>
            <div className='flex justify-center items-center py-5'>
                <button className='bg-blue-400 border text-white py-1 px-2 rounded hover:bg-blue-500 cursor-pointer duration-200 active:scale-97'>Create New Task</button>
            </div>
            <div className='flex justify-center items-center bg-black/5 p-2'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input className='w-full h-10 px-2 outline-0' placeholder='Search Task' type="text" />
            </div>
            <div className='flex justify-center items-center py-5 gap-5'>
                <button onClick={()=>setFilter("All")} className={`bg-black/10 px-5 py-2 w-50 hover:bg-black/25 duration-200 cursor-pointer ${filter=="All" && "bg-blue-400 hover:bg-blue-500"}`}>All</button>
                <button onClick={()=>setFilter("Not Completed")} className={`bg-black/10 px-5 py-2 w-50 hover:bg-black/25 duration-200 cursor-pointer ${filter=="Not Completed" && "bg-blue-400 hover:bg-blue-500"}`}>Not Completed</button>
                <button onClick={()=>setFilter("Completed")} className={`bg-black/10 px-5 py-2 w-50 hover:bg-black/25 duration-200 cursor-pointer ${filter=="Completed" && "bg-blue-400 hover:bg-blue-500"}`}>Completed</button>
            </div>

            <div>
                <table className='w-full'>
                    <thead className='bg-black/10'>
                        <tr>
                            <th className='p-5'>#</th>
                            <th className='p-5'>Task</th>
                            <th className='p-5'>Status</th>
                            <th className='p-5'>Created At</th>
                            <th className='p-5'>...</th>
                            <th className='p-5'>...</th>
                        </tr>
                    </thead>
                    <tbody className='text-center bg-black/5'>
                        <tr>
                            <td className='p-5'>1</td>
                            <td className='p-5'>Task</td>
                            <td className='p-5'>Status</td>
                            <td className='p-5'>Created At</td>
                            <td className='p-5'>
                                <button className='bg-orange-400 border text-white py-1 px-2 rounded hover:bg-white hover:text-orange-400 cursor-pointer duration-200 active:scale-97'>Edit</button>
                            </td>
                            <td className='p-5'>
                                <button className='bg-red-400 border text-white py-1 px-2 rounded hover:bg-white hover:text-red-400 cursor-pointer duration-200 active:scale-97'>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default UserHome