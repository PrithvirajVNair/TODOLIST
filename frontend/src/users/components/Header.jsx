import {
  faArrowRightFromBracket,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({themeStatus}) => {
  const navigate = useNavigate();
  const [toggleTheme, setToggleTheme] = useState(false);
  const [theme, setTheme] = useState("Light");


  // function to handle Log Out
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // function to handle theme change (Dark/Light)
  const handleTheme = (theme) => {
    localStorage.setItem("theme", theme);
    themeStatus(theme)
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
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
  }, []);
  return (
    <div className="bg-black/10 h-15 backdrop-blur-2xl fixed w-full z-99">
      <div className="flex justify-between items-center h-full px-5 sm:px-10 md:px-20">
        <a
          className="text-blue-400 font-bold text-base sm:text-2xl"
          href="/home"
        >
          ToDL
        </a>
        <div>
          {/* theme change button */}
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
          <button
            onClick={handleLogout}
            className="bg-blue-400 text-white py-1 px-2 rounded hover:bg-blue-500 cursor-pointer duration-200 active:scale-97 text-xs sm:text-base"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-1" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
