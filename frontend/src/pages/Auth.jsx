import React, { useEffect } from "react";
import { useState } from "react";
import {
  userGoogleLoginAPI,
  userLoginAPI,
  userRegisterAPI,
} from "../services/allAPIs";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { faArrowLeft, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Auth = ({ register, login }) => {
  // for navigating
  const navigate = useNavigate();
  // state to store user login/register details
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [theme, setTheme] = useState("Light");
  // console.log(userDetails);

  //   function for User Registration
  const handleRegister = async () => {
    const { email, password, username } = userDetails;
    if (!username || !email || !password) {
      toast("Please Fill All Fields!");
    } else {
      if (!email.endsWith("@gmail.com")) {
        toast("Please Enter Valid a Email!");
      } else {
        const result = await userRegisterAPI(userDetails);
        if (result.status == 200) {
          toast(result.data);
          setUserDetails({
            username: "",
            email: "",
            password: "",
          });
          navigate("/login");
        } else if (result.status == 409) {
          toast(result.response.data);
          setUserDetails({
            username: "",
            email: "",
            password: "",
          });
        } else {
          toast("Something Went Wrong! Please Try Again...");
          setUserDetails({
            username: "",
            email: "",
            password: "",
          });
        }
      }
    }
  };

  // function for user login
  const handleLogin = async () => {
    const { email, password } = userDetails;
    if (!email || !password) {
      toast("Please Fill All Fields!");
    } else {
      if (!email.endsWith("@gmail.com")) {
        toast("Please Enter Valid a Email!");
      } else {
        const result = await userLoginAPI(userDetails);
        if (result.status == 200) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user", JSON.stringify(result.data.user));
          toast(result.data.message);
          setUserDetails({
            username: "",
            email: "",
            password: "",
          });
          navigate("/Home");
        } else if (result.status == 404) {
          toast(result.response.data);
          setUserDetails({
            username: "",
            email: "",
            password: "",
          });
        } else if (result.status == 401) {
          toast(result.response.data);
          setUserDetails({
            username: "",
            email: "",
            password: "",
          });
        } else {
          toast("Something Went Wrong! Please Try Again...");
          setUserDetails({
            username: "",
            email: "",
            password: "",
          });
        }
      }
    }
  };

  // function for google login
  const handleGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);
    const result = await userGoogleLoginAPI({
      username: details.name,
      email: details.email,
      password: import.meta.env.VITE_GOOGLE_KEY,
      profile: details.picture,
    });
    if (result.status == 200) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      toast("Login Successful!");
      setUserDetails({
        username: "",
        email: "",
        password: "",
      });
      navigate("/Home");
    }
  };

  useEffect(() => {
    // for theme (Dark/Light)
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  return (
    <div
      className={`h-screen flex justify-center md:justify-evenly items-center ${theme == "Dark" ? "bg-black text-white" : "bg-black/10"}`}
    >
      <div className="bg-blue-400 p-10 rounded-xl hidden md:flex flex-col md:m-5 gap-5">
          <h2 className="text-white text-3xl font-bold">Welcome to ToDL</h2>
          <p className="text-white text-lg">Manage your tasks efficiently and boost your <br /> productivity.</p>
          <div className="flex flex-col gap-5">
              <div className="text-white">
                <h4 className="text-lg"><FontAwesomeIcon icon={faCircleCheck} className="me-2" />Simple & Intuitive</h4>
                <p className="ms-7">Easy-to-use interface designed for everyone</p>
              </div>
              <div className="text-white">
                <h4 className="text-lg"><FontAwesomeIcon icon={faCircleCheck} className="me-2" />Stay Organized</h4>
                <p className="ms-7">Keep all your tasks in one place</p>
              </div>
              <div className="text-white">
                <h4 className="text-lg"><FontAwesomeIcon icon={faCircleCheck} className="me-2" />Track Progress</h4>
                <p className="ms-7">Monitor your tasks with real-time updates</p>
              </div>
          </div>
      </div>
      <div
        className={`p-10 m-5 rounded-lg flex justify-center items-center flex-col shadow-2xl w-90 ${theme == "Dark" ? "bg-white/10" : "bg-white"}`}
      >
        {register ? (
          <h2 className="text-blue-400 font-semibold text-2xl">
            Create An Account
          </h2>
        ) : (
          <h2 className="text-blue-400 font-semibold text-2xl text-center">
            Login to your Account
          </h2>
        )}

        {register ? (
          <p
            className={`text-center ${theme == "Dark" ? "text-white/60" : "text-black/60"}`}
          >
            Create an account to use the application
          </p>
        ) : (
          <p
            className={`text-center ${theme == "Dark" ? "text-white/60" : "text-black/60"}`}
          >
            Login to your account to use the application
          </p>
        )}
        <div className="w-full p-5 flex justify-center items-center flex-col gap-3">
          {/* Only Visible at Registration */}
          {register && (
            <div className="w-full">
              <input
                value={userDetails.username}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
                className={`w-full px-2 ${theme == "Dark" ? "placeholder:text-white/60 bg-white/5" : "placeholder:text-black/60 bg-black/5"}`}
                placeholder="Enter Your Username"
                type="text"
              />
            </div>
          )}

          <div className="w-full">
            <input
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              className={`w-full px-2 ${theme == "Dark" ? "placeholder:text-white/60 bg-white/5" : "placeholder:text-black/60 bg-black/5"}`}
              placeholder="Enter Your Email"
              type="text"
            />
          </div>

          <div className="w-full">
            <input
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              className={`w-full px-2 ${theme == "Dark" ? "placeholder:text-white/60 bg-white/5" : "placeholder:text-black/60 bg-black/5"}`}
              placeholder="Enter Your Password"
              type="password"
            />
          </div>

          <div className="w-full">
            {register ? (
              <button
                onClick={handleRegister}
                className="bg-blue-400 w-full rounded text-white py-1 hover:bg-blue-500 cursor-pointer duration-300 active:scale-99"
              >
                Sign Up
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-blue-400 w-full rounded text-white py-1 hover:bg-blue-500 cursor-pointer duration-300 active:scale-99"
              >
                Sign In
              </button>
            )}
          </div>
          <div>
            <p>OR</p>
          </div>

          {/* Google Login button */}
          <div className="w-full">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                // console.log(credentialResponse);
                handleGoogleLogin(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>

          <div className="w-full">
            {register ? (
              <p className="text-center">
                Already have an Account?{" "}
                <a
                  href="/login"
                  className="text-blue-400 hover:text-blue-500 hover:underline cursor-pointer"
                >
                  Sign In
                </a>
              </p>
            ) : (
              <p className="text-center">
                New User?{" "}
                <a
                  href="/register"
                  className="text-blue-400 hover:text-blue-500 hover:underline cursor-pointer"
                >
                  Sign Up
                </a>
              </p>
            )}
          </div>
          <div>
            <a href="/"><FontAwesomeIcon icon={faArrowLeft} className="me-2" />Back to home</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
