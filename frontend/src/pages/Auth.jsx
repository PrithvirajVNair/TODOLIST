import React from 'react'
import { useState } from 'react'
import { userLoginAPI, userRegisterAPI } from '../services/allAPIs';
import { useNavigate } from 'react-router-dom';

const Auth = ({ register, login }) => {

    const navigate = useNavigate()
    // state to store user login/register details
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    })
    console.log(userDetails);

    const handleRegister = async () => {
        const result = await userRegisterAPI(userDetails)
        console.log(result);
        if (result.status == 200) {
            alert(result.data)
            setUserDetails({
                username: "",
                email: "",
                password: ""
            })
            navigate('/login')
        }
        else if (result.status == 409) {
            alert(result.response.data)
            setUserDetails({
                username: "",
                email: "",
                password: ""
            })
        }
        else {
            alert("Something Went Wrong! Please Try Again...")
            setUserDetails({
                username: "",
                email: "",
                password: ""
            })
        }
    }

    const handleLogin = async () => {
        const result = await userLoginAPI(userDetails)
        console.log(result);
        if (result.status == 200) {
            localStorage.setItem("token",result.data.token)
            localStorage.setItem("user",JSON.stringify(result.data.user))
            alert(result.data.message)
            setUserDetails({
                username: "",
                email: "",
                password: ""
            })
            navigate('/Home')
        }
        else if (result.status == 404) {
            alert(result.response.data)
            setUserDetails({
                username: "",
                email: "",
                password: ""
            })
        }
        else if (result.status == 401) {
            alert(result.response.data)
            setUserDetails({
                username: "",
                email: "",
                password: ""
            })
        }
        else {
            alert("Something Went Wrong! Please Try Again...")
            setUserDetails({
                username: "",
                email: "",
                password: ""
            })
        }
    }
    return (
        <div className='bg-black/10 h-screen flex justify-center items-center'>
            <div className='p-10 bg-white flex justify-center items-center flex-col shadow-2xl w-90'>
                {register ? <h2 className='text-blue-400 font-semibold text-2xl'>Create An Account</h2> : <h2 className='text-blue-400 font-semibold text-2xl text-center'>Login to your Account</h2>}
                {register ? <p className='text-black/60'>Create an account to use the application</p> : <p className='text-black/60 text-center'>Login to your account to use the application</p>}
                <div className='w-full p-5 flex justify-center items-center flex-col gap-5'>
                    {
                        register &&
                        <div className='w-full'>
                            <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} className='bg-black/5 w-full px-2' placeholder='Enter Your Username' type="text" />
                        </div>
                    }
                    <div className='w-full'>
                        <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} className='bg-black/5 w-full px-2' placeholder='Enter Your Email' type="text" />
                    </div>
                    <div className='w-full'>
                        <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} className='bg-black/5 w-full px-2' placeholder='Enter Your Password' type="password" />
                    </div>
                    <div className='w-full'>
                        {register ? <button onClick={handleRegister} className='bg-blue-400 w-full border text-white py-1 hover:bg-white hover:text-blue-400 cursor-pointer duration-300 active:scale-99'>Sign Up</button> : <button onClick={handleLogin} className='bg-blue-400 w-full border text-white py-1 hover:bg-white hover:text-blue-400 cursor-pointer duration-300 active:scale-99'>Sign In</button>}
                    </div>
                    <div className='w-full'>
                        {register ? <p className='text-center'>Already have an Account? <a href='/login' className='text-blue-400 hover:text-blue-500 hover:underline cursor-pointer'>Sign In</a></p> : <p className='text-center'>New User? <a href='/register' className='text-blue-400 hover:text-blue-500 hover:underline cursor-pointer'>Sign Up</a></p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth