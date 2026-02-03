import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faList } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

const Home = () => {
  
  const [theme, setTheme] = useState("Light");
  const [themeStatus, setThemeStatus] = useState("");
  const getValueFromChild = (value) => {
    setThemeStatus(value);
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
  }, [themeStatus]);

  return (
    <>
      <Header themeStatus={getValueFromChild} />
      <div className={`min-h-screen ${theme=="Dark" && "bg-black text-white"}`}>
        <div className={`grid md:grid-cols-2 min-h-screen justify-center items-center bg-blue-400/5 md:pt-0 pt-15 sm:px-10 md:px-20`}>
          <div className="flex flex-col gap-5 p-5">
            <h1 className="text-3xl sm:text-5xl font-bold max-md:text-center">
              Organize Your Life, <br />
              <span className="text-blue-400"> One Task at a Time</span>
            </h1>
            <p className={`sm:text-lg max-md:text-center ${theme=="Dark"?"text-white/60":"text-black/60"}`}>
              Stay on top of your tasks with our powerful and intuitive to-do
              list application. Manage, track, and complete your tasks
              efficiently.
            </p>
            <div className="flex max-md:justify-center items-center">
              <a
                href="/register"
                className="bg-blue-400 text-white py-1 px-2 rounded-lg hover:bg-blue-500 cursor-pointer duration-200 active:scale-97 me-3 font-semibold"
              >
                Start Free Today
              </a>
              <a
                href="#about"
                className="bg-white border border-white hover:border-black/20 me-2 py-1 px-2 rounded-lg cursor-pointer duration-200 active:scale-97 font-semibold text-black"
              >
                Learn More
              </a>
            </div>
            <div className="flex text-xs sm:text-base max-md:justify-center items-center">
              <p className="me-5">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-400 me-2"
                />
                Free to use
              </p>
              <p className="">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-400 me-2"
                />
                No credit card required
              </p>
            </div>
          </div>
          <div className="p-5">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* about section */}

        <section
          id="about"
          className="min-h-screen px-5 sm:px-10 md:px-20 flex flex-col justify-center items-center gap-5"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-center pt-20">
            Everything You Need to Stay Productive
          </h1>
          <p className={`sm:text-lg text-center py-3 ${theme=="Dark"?"text-white/60":"text-black/60"}`}>
            Powerful features to help you manage your tasks effectively
          </p>
          <div className="grid sm:grid-cols-4">
            <div className="m-1 md:m-5">
              <div className={`border sm:min-h-60 hover:border-blue-400/50 rounded-xl p-3 md:p-5 hover:shadow-xl duration-200 ${theme=="Dark"?"border-white/10 shadow-white/10":"border-black/10"}`}>
                <FontAwesomeIcon
                  icon={faList}
                  className="p-3 bg-blue-400/20 text-blue-400 rounded-lg"
                />
                <h2 className="text-lg md:text-2xl">Task Management</h2>
                <p className={`md:text-lg ${theme=="Dark"?"text-white/60":"text-black/60"}`}>
                  Organize and prioritize your tasks efficiently with our
                  intuitive interface
                </p>
              </div>
            </div>
            <div className="m-1 md:m-5">
              <div className={`border sm:min-h-60 hover:border-blue-400/50 rounded-xl p-3 md:p-5 hover:shadow-xl duration-200 ${theme=="Dark"?"border-white/10 shadow-white/10":"border-black/10"}`}>
                <FontAwesomeIcon
                  icon={faList}
                  className="p-3 bg-blue-400/20 text-blue-400 rounded-lg"
                />
                <h2 className="text-lg md:text-2xl">Track Progress</h2>
                <p className={`md:text-lg ${theme=="Dark"?"text-white/60":"text-black/60"}`}>
                  Monitor your task status in real-time with multiple status
                  options.
                </p>
              </div>
            </div>
            <div className="m-1 md:m-5">
              <div className={`border sm:min-h-60 hover:border-blue-400/50 rounded-xl p-3 md:p-5 hover:shadow-xl duration-200 ${theme=="Dark"?"border-white/10 shadow-white/10":"border-black/10"}`}>
                <FontAwesomeIcon
                  icon={faList}
                  className="p-3 bg-blue-400/20 text-blue-400 rounded-lg"
                />
                <h2 className="text-lg md:text-2xl">Stay Organized</h2>
                <p className={`md:text-lg ${theme=="Dark"?"text-white/60":"text-black/60"}`}>
                  Keep track of creation dates and manage your workflow
                  seamlessly.
                </p>
              </div>
            </div>
            <div className="m-1 md:m-5">
              <div className={`border sm:min-h-60 hover:border-blue-400/50 rounded-xl p-3 md:p-5 hover:shadow-xl duration-200 ${theme=="Dark"?"border-white/10 shadow-white/10":"border-black/10"}`}>
                <FontAwesomeIcon
                  icon={faList}
                  className="p-3 bg-blue-400/20 text-blue-400 rounded-lg"
                />
                <h2 className="text-lg md:text-2xl">Easy to Use</h2>
                <p className={`md:text-lg ${theme=="Dark"?"text-white/60":"text-black/60"}`}>
                  Simple, clean interface designed for maximum productivity.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="md:w-200 p-5 bg-blue-400 rounded-xl flex justify-center items-center flex-col gap-3 mb-5">
              <h2 className="text-white font-semibold text-2xl">
                Ready to Get Started?
              </h2>
              <p className="text-white text-center sm:text-lg">
                Join thousands of users who are already managing their tasks
                better.
              </p>
              <a
                href="/register"
                className="bg-white text-blue-400 font-semibold py-1 px-2 rounded-lg hover:bg-white/90 cursor-pointer duration-200 active:scale-97"
              >
                Create Your Account
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
