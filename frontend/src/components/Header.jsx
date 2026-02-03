import {
  faBars,
  faMoon,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const Header = ({ themeStatus }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleTheme, setToggleTheme] = useState(false);
  const [theme, setTheme] = useState("Light");

  // function to handle theme change (Dark/Light)
  const handleTheme = (theme) => {
    localStorage.setItem("theme", theme);
    themeStatus(theme);
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
      if (localStorage.getItem("theme") == "Light") {
        setToggleTheme(false);
      } else {
        setToggleTheme(true);
      }
    } else {
      localStorage.setItem("theme", theme);
    }
  }, [themeStatus]);

  return (
    <>
      <div
        className={`border-b h-15 backdrop-blur-2xl fixed w-full z-99 ${theme == "Dark" ? "border-white/10" : "border-black/10"}`}
      >
        <div className="flex justify-between items-center h-full px-5 sm:px-10 md:px-20">
          <a className="text-blue-400 text-2xl font-bold" href="#">
            ToDL
          </a>
          <div className="flex justify-center items-center">
            {/* Button to change theme */}
            <div>
              {toggleTheme ? (
                <button
                  onClick={() => {
                    (setToggleTheme(false), handleTheme("Light"));
                  }}
                  className="me-5 cursor-pointer p-1 bg-white/10 text-white"
                  style={{ borderRadius: "50%" }}
                >
                  <FontAwesomeIcon icon={faSun} />
                </button>
              ) : (
                <button
                  className="me-5 cursor-pointer p-1 bg-white"
                  style={{ borderRadius: "50%" }}
                  onClick={() => {
                    (setToggleTheme(true), handleTheme("Dark"));
                  }}
                >
                  <FontAwesomeIcon icon={faMoon} />
                </button>
              )}
            </div>
            {/* signin/ getstarted button for big screen */}
            <div className="md:flex hidden">
              <a
                href="/login"
                className="bg-white border border-white me-2 py-1 px-2 rounded-lg hover:border hover:border-black/20 cursor-pointer duration-200 active:scale-97"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="bg-blue-400 text-white py-1 px-2 rounded-lg hover:bg-blue-500 cursor-pointer duration-200 active:scale-97"
              >
                Get Started
              </a>
            </div>
            {/* toggle menu for smaller screen */}
            <div className="block md:hidden">
              {!toggleMenu ? (
                <button onClick={() => setToggleMenu(true)}>
                  <FontAwesomeIcon
                    icon={faBars}
                    className={`${theme == "Dark" ? "text-white" : "text-black"}`}
                  />
                </button>
              ) : (
                <button onClick={() => setToggleMenu(false)}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={`${theme == "Dark" ? "text-white" : "text-black"}`}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* dropdown for toggle menu for smaller screens */}
      {toggleMenu && (
        <div
          className={`md:hidden fixed z-99 flex flex-col p-5 bg-white/10 backdrop-blur-3xl rounded-xl right-5 top-16 justify-center items-center ${theme == "Dark" ? "text-white" : "text-black"}`}
        >
          <a href="/login">Sign In</a>
          <a href="/register">Get Started</a>
        </div>
      )}
    </>
  );
};

export default Header;
