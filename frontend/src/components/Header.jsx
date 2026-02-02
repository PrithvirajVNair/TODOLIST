import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Header = () => {

  const [toggleMenu,setToggleMenu] = useState(false)

  return (
    <>
      <div className="border-b border-black/10 h-15 backdrop-blur-2xl fixed w-full z-99">
        <div className="flex justify-between items-center h-full px-5 sm:px-10 md:px-20">
          <a className="text-blue-400 text-2xl font-bold" href="#">
            ToDL
          </a>
          <div className="md:flex hidden">
            <a href="/login" className="bg-white border border-black/20 me-2 py-1 px-2 rounded-lg hover:bg-blue-500 cursor-pointer duration-200 active:scale-97">
              Sign In
            </a>
            <a href="/register" className="bg-blue-400 border text-white py-1 px-2 rounded-lg hover:bg-blue-500 cursor-pointer duration-200 active:scale-97">
              Get Started
            </a>
          </div>
          <div className="block md:hidden">
            {!toggleMenu?<button onClick={()=>setToggleMenu(true)}><FontAwesomeIcon icon={faBars} /></button>:<button onClick={()=>setToggleMenu(false)}><FontAwesomeIcon icon={faXmark} /></button>}
          </div>
        </div>
      </div>
      {
        toggleMenu &&
        <div className="md:hidden fixed z-99 flex flex-col p-5 bg-white/10 backdrop-blur-3xl rounded-xl right-0 top-16 justify-center items-center text-white">
        <a href="/login">
              Sign In
            </a>
            <a href="/register">
              Get Started
            </a>
      </div>}
    </>
  );
};

export default Header;
