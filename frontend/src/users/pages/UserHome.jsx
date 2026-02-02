import React from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import { createNewTaskAPI, deleteTaskAPI, getTaskAPI, updateTaskAPI } from '../../services/allAPIs'

const UserHome = () => {

    const [filter, setFilter] = useState("Not Completed")
    const [deleteStatus, setDeleteStatus] = useState([])
    const [createStatus, setCreateStatus] = useState([])
    const [updateStatus, setUpdateStatus] = useState([])
    const [toggleAdd, setToggleAdd] = useState(false)
    const [toggleUpdate, setToggleUpdate] = useState(false)
    const [updateTask, setUpdateTask] = useState({})
    const [searchData, setSearchData] = useState("")
    const [taskTitle, setTaskTitle] = useState({
        title: ""
    })
    const [allList, setAllList] = useState([])
    // console.log(taskTitle);
    // console.log(updateTask);
    console.log(searchData);
    

    const getTodoList = async () => {
        const token = localStorage.getItem("token")
        const reqHeader = {
            Authorization: `Bearer ${token}`
        }
        const result = await getTaskAPI(searchData,reqHeader)
        // console.log(result);
        if (result.status == 200) {
            if (filter == "All") {
                setAllList(result.data)
            }
            else if (filter == "Not Completed") {
                setAllList(result.data.filter(item => item.status == "Not Completed"))
            }
            else if (filter == "Completed") {
                setAllList(result.data.filter(item => item.status == "Completed"))
            }
            else {
                setAllList(result.data)
            }
        }
    }

    const handleCreateTask = async () => {
        const token = localStorage.getItem("token")
        const reqHeader = {
            Authorization: `Bearer ${token}`
        }
        const result = await createNewTaskAPI(taskTitle, reqHeader)
        // console.log(result);
        if (result.status == 201) {
            alert(result.data)
            setTaskTitle("")
            setToggleAdd(false)
            setCreateStatus(result)
        }
        else {
            alert("Something Went Wrong")
        }
    }

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token")
        const reqHeader = {
            Authorization: `Bearer ${token}`
        }
        const result = await deleteTaskAPI(id, reqHeader)
        // console.log(result);
        if (result.status == 200) {
            alert(result.data)
            setDeleteStatus(result)
        }
    }

    const handleUpdateTask = async () => {
        const token = localStorage.getItem("token")
        const reqHeader = {
            Authorization: `Bearer ${token}`
        }
        const result = await updateTaskAPI(updateTask, reqHeader)
        // console.log(result);
        if (result.status == 200) {
            alert("Task Updated!")
            setUpdateStatus(result)
            setToggleUpdate(false)
        }
    }

    useEffect(() => {
        getTodoList()
    }, [deleteStatus, createStatus, updateStatus, filter, searchData])

    return (
        <>
            <Header />
            <div className='min-h-screen pt-20 px-20'>
                <h1 className='text-2xl font-semibold text-blue-400 text-center'>To Do List</h1>
                <div className='flex justify-center items-center py-5'>
                    <button onClick={() => setToggleAdd(true)} className='bg-blue-400 border text-white py-1 px-2 rounded hover:bg-blue-500 cursor-pointer duration-200 active:scale-97'>Create New Task</button>
                </div>
                <div className='flex justify-center items-center bg-black/5 p-2'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input onChange={(e)=>setSearchData(e.target.value)} className='w-full h-10 px-2 outline-0' placeholder='Search Task' type="text" />
                </div>
                <div className='flex justify-center items-center py-5 gap-5'>
                    <button onClick={() => setFilter("All")} className={`bg-black/10 px-5 py-2 w-50 hover:bg-black/25 duration-200 cursor-pointer ${filter == "All" && "bg-blue-400 hover:bg-blue-500 text-white"}`}>All</button>
                    <button onClick={() => setFilter("Not Completed")} className={`bg-black/10 px-5 py-2 w-50 hover:bg-black/25 duration-200 cursor-pointer ${filter == "Not Completed" && "bg-blue-400 hover:bg-blue-500 text-white"}`}>Not Completed</button>
                    <button onClick={() => setFilter("Completed")} className={`bg-black/10 px-5 py-2 w-50 hover:bg-black/25 duration-200 cursor-pointer ${filter == "Completed" && "bg-blue-400 hover:bg-blue-500 text-white"}`}>Completed</button>
                </div>

                <div>
                    {
                        allList?.length > 0 ?
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
                                    {

                                        allList.map((list, index) => (
                                            <tr>
                                                <td className='p-5'>{index + 1}</td>
                                                <td className='p-5'>{list.title}</td>
                                                <td className='p-5'>{list.status}</td>
                                                <td className='p-5'>{list.createdAt.split("T")[0]}</td>
                                                <td className='p-5'>
                                                    <button onClick={() => {
                                                        setToggleUpdate(true),
                                                            setUpdateTask(list)
                                                    }} className='bg-orange-400 border text-white py-1 px-2 rounded hover:bg-white hover:text-orange-400 cursor-pointer duration-200 active:scale-97'>Edit</button>
                                                </td>
                                                <td className='p-5'>
                                                    <button onClick={() => handleDelete(list._id)} className='bg-red-400 border text-white py-1 px-2 rounded hover:bg-white hover:text-red-400 cursor-pointer duration-200 active:scale-97'>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            :
                            <p className='text-center text-xl font-semibold text-red-400'>To Do List is Empty</p>
                    }
                </div>
            </div>
            {
                toggleAdd &&
                <div className='bg-black/50 h-screen inset-0 fixed z-99 flex justify-center items-center'>
                    <div className='bg-white p-10 flex justify-center items-center flex-col'>
                        <h2 className='text-2xl text-blue-400'>Create New Task</h2>
                        <div className='pt-5'>
                            <input value={taskTitle.title} onChange={(e) => setTaskTitle({ ...taskTitle, title: e.target.value })} className='w-full bg-black/5 px-2' placeholder='Title' type="text" />
                        </div>
                        <div className='flex justify-center items-center gap-3 pt-5'>
                            <button onClick={() => setToggleAdd(false)} className='bg-red-400 border text-white py-1 px-2 rounded hover:bg-white hover:text-red-400 cursor-pointer duration-200 active:scale-97 w-20'>Cancel</button>
                            <button onClick={handleCreateTask} className='bg-blue-400 border text-white py-1 px-2 rounded hover:bg-white hover:text-blue-400 cursor-pointer duration-200 active:scale-97 w-20'>Create</button>
                        </div>
                    </div>
                </div>
            }
            {
                toggleUpdate &&
                <div className='bg-black/50 h-screen inset-0 fixed z-99 flex justify-center items-center'>
                    <div className='bg-white p-10 flex justify-center items-center flex-col'>
                        <h2 className='text-2xl text-blue-400'>Update Task</h2>
                        <div className='pt-5'>
                            <input value={updateTask.title} onChange={(e) => setUpdateTask({ ...updateTask, title: e.target.value })} className='w-full bg-black/5 px-2  outline-0' placeholder='Title' type="text" />
                        </div>
                        <select value={updateTask.status} onChange={(e) => setUpdateTask({ ...updateTask, status: e.target.value })} className='w-full mt-5 outline-0' name="" id="">
                            <option value="Not Completed">Not Completed</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <div className='flex justify-center items-center gap-3 pt-5'>
                            <button onClick={() => setToggleUpdate(false)} className='bg-red-400 border text-white py-1 px-2 rounded hover:bg-white hover:text-red-400 cursor-pointer duration-200 active:scale-97 w-20'>Cancel</button>
                            <button onClick={handleUpdateTask} className='bg-blue-400 border text-white py-1 px-2 rounded hover:bg-white hover:text-blue-400 cursor-pointer duration-200 active:scale-97 w-20'>Update</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserHome