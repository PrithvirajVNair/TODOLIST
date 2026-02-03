import React from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faMagnifyingGlass,
  faPencil,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import {
  createNewTaskAPI,
  deleteTaskAPI,
  getTaskAPI,
  updateTaskAPI,
} from "../../services/allAPIs";
import Footer from "../components/Footer";

const UserHome = () => {
  const [filter, setFilter] = useState("All");
  const [createStatus, setCreateStatus] = useState([]);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [themeStatus, setThemeStatus] = useState("");
  const [searchData, setSearchData] = useState("");
  const [theme, setTheme] = useState("");
  console.log(theme);

  const [taskTitle, setTaskTitle] = useState({
    title: "",
  });
  const [allList, setAllList] = useState([]);

  // console.log(taskTitle);
  // console.log(updateTask);
  // console.log(searchData);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("IN");
  };

  const getTodoList = async () => {
    const token = localStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const result = await getTaskAPI(searchData, reqHeader);
    // console.log(result);
    if (result.status == 200) {
      if (filter == "All") {
        setAllList(result.data);
      } else {
        setAllList(result.data.filter((item) => item.status == filter));
      }
    }
  };

  const handleCreateTask = async () => {
    const token = localStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const result = await createNewTaskAPI(taskTitle, reqHeader);
    // console.log(result);
    if (result.status == 201) {
      alert(result.data);
      setTaskTitle("");
      setToggleAdd(false);
      setCreateStatus(result);
    } else {
      alert("Something Went Wrong");
    }
  };

  const statusOption = [
    "All",
    "In Progress",
    "On Hold",
    "Completed",
    "Not Completed",
  ];

  const getValueFromChild = (value) => {
    setThemeStatus(value);
  };

  useEffect(() => {
    getTodoList();
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
  }, [createStatus, filter, searchData, themeStatus]);

  return (
    <>
      <Header themeStatus={getValueFromChild} />
      <div
        className={`min-h-screen pt-20 px-5 sm:px-10 md:px-20 ${theme == "Dark" && "bg-black text-white"} `}
      >
        <div className="flex justify-between items-center">
          <h1 className="sm:text-2xl md:text-3xl font-semibold text-blue-400 text-center">
            To Do List
          </h1>
          <div className="flex justify-center items-center py-5">
            <button
              onClick={() => setToggleAdd(true)}
              className="bg-blue-400 text-white py-1 px-2 rounded-lg hover:bg-blue-500 cursor-pointer duration-200 active:scale-97 text-xs sm:text-base"
            >
              <FontAwesomeIcon icon={faPlus} className="me-1" />
              Create New Task
            </button>
          </div>
        </div>


        <div className="flex w-full justify-center items-center gap-3 sm:gap-5 mb-3">
          <div className={`flex justify-center items-center bg-black/3 p-2 w-full rounded-lg ${theme=="Dark" && "bg-white/10 text-white placeholder:text-white"}`}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={`text-black/50 text-sm sm:text-base ${theme=="Dark" && "text-white/50"}`}
            />
            <input
              onChange={(e) => setSearchData(e.target.value)}
              className="w-full px-2 outline-0 text-sm sm:text-base"
              placeholder="Search Task"
              type="text"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`flex justify-center items-center gap-5 p-2 rounded-lg bg-black/3 focus:outline-none focus:ring-1 focus:ring-blue-400 appearance-none sm:pr-10 text-sm sm:text-base ${theme=="Dark" && "bg-white/10"}`}
          >
            {statusOption.map((option, index) => (
              <option
                key={index}
                value={option}
                className={`bg-black/10 px-5 py-2 w-50 hover:bg-black/25 text-black duration-200 cursor-pointer rounded hover:border-none ${filter == { option } && "bg-blue-400 hover:bg-blue-500 text-white"}`}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          {allList?.length > 0 ? (
            <div className="rounded-xl overflow-hidden pb-5">
              <table className="w-full">
                <thead className={`bg-black/5 hover:bg-black/6 ${theme=="Dark" && "bg-white/15 hover:bg-white/20"}`}>
                  <tr>
                    <th className="p-2 md:p-5 text-xs sm:text-base sm:block hidden">
                      #
                    </th>
                    <th className="p-2 md:p-5 text-xs sm:text-base">Task</th>
                    <th className="p-2 md:p-5 text-xs sm:text-base">Status</th>
                    <th className="p-2 md:p-5 text-xs sm:text-base sm:block hidden">
                      Created At
                    </th>
                    <th className="p-2 md:p-5 text-xs sm:text-base">Details</th>
                  </tr>
                </thead>
                <tbody className={`text-center bg-black/3 ${theme=="Dark" && "bg-white/10"}`}>
                  {allList.map((list, index) => (
                    <tr
                      key={list._id}
                      className={`border-b border-black/5 hover:bg-black/4 duration-300 ${theme=="Dark" && "border-white/5"}`}
                    >
                      <td className="p-2 md:p-4 text-xs sm:text-base sm:block hidden">
                        {index + 1}
                      </td>
                      <td className="p-2 md:p-4 text-xs sm:text-base min-w-24 overflow-x-hidden">
                        {list.title}
                      </td>
                      <td className="p-2 md:p-4">
                        <p
                          className={`inline-block px-0.5 sm:p-2 md:p-1 rounded-xl ${list.status == "In Progress" ? "bg-blue-400/20 text-blue-400" : list.status == "On Hold" ? "bg-gray-400/20" : list.status == "Completed" ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"} text-xs sm:text-base overflow-hidden text-ellipsis whitespace-nowrap`}
                        >
                          {list.status}
                        </p>
                      </td>
                      <td className="text-xs sm:text-base p-2 md:p-4 sm:block hidden">
                        {formatDate(list.createdAt)}
                      </td>
                      <td className="p-2 md:p-4">
                        {/* <button
                          onClick={() => {
                            (setToggleUpdate(true), setUpdateTask(list));
                          }}
                          className="text-xs sm:text-base bg-orange-400 border text-white py-1 px-2 rounded hover:bg-orange-500  cursor-pointer duration-200 active:scale-97 me-3"
                        >
                          <FontAwesomeIcon icon={faPencil} />
                          Edit
                        </button> */}
                        <a
                          href={`/task/${list._id}/details`}
                          className="text-xs sm:text-base bg-blue-400 text-white py-1 px-2 rounded hover:bg-blue-500 cursor-pointer duration-200 active:scale-97"
                        >
                          <div className="sm:inline hidden">
                            <FontAwesomeIcon icon={faInfo} className="" />
                          </div>
                          Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-xl font-semibold text-red-400">
              List is Empty
            </p>
          )}
        </div>
      </div>
      {/* <Footer /> */}
      {toggleAdd && (
        <div className="bg-black/50 h-screen inset-0 fixed z-99 flex justify-center items-center">
          <div className={`p-10 flex justify-center items-center flex-col ${theme=="Dark" ? "bg-[#2a2727] text-white":"bg-white"}`}>
            <h2 className="text-2xl text-blue-400">Create New Task</h2>
            <div className="pt-5">
              <input
                value={taskTitle.title}
                onChange={(e) =>
                  setTaskTitle({ ...taskTitle, title: e.target.value })
                }
                className="w-full bg-black/5 px-2"
                placeholder="Title"
                type="text"
              />
            </div>
            <div className="flex justify-center items-center gap-3 pt-5">
              <button
                onClick={() => setToggleAdd(false)}
                className="bg-red-400 border text-white py-1 px-2 rounded hover:bg-white hover:text-red-400 cursor-pointer duration-200 active:scale-97 w-20"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="bg-blue-400 border text-white py-1 px-2 rounded hover:bg-white hover:text-blue-400 cursor-pointer duration-200 active:scale-97 w-20"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserHome;
