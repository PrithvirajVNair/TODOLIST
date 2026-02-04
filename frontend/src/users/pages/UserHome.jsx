import React from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
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
import { toast } from "react-toastify";

const UserHome = () => {
  const [filter, setFilter] = useState("All");
  const [createStatus, setCreateStatus] = useState([]);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [themeStatus, setThemeStatus] = useState("");
  const [searchData, setSearchData] = useState("");
  const [theme, setTheme] = useState("");
  const [taskTitle, setTaskTitle] = useState({
    title: "",
    description:""
  });
  const [allList, setAllList] = useState([]);

  // pagination
  const [currenntPage, setCurrentPage] = useState(1);
  const listsPerPage = 10;
  const totalPages = Math.ceil(allList?.length / listsPerPage);
  const currenntPageLastIndex = currenntPage * listsPerPage;
  const currenntPageFirstIndex = currenntPageLastIndex - listsPerPage;
  const visibleLists = allList?.slice(
    currenntPageFirstIndex,
    currenntPageLastIndex,
  );
  const [loading, setLoading] = useState(true);

  // pagination Navigation next
  const navigateNext = () => {
    if (currenntPage != totalPages) {
      setCurrentPage(currenntPage + 1);
    }
  };

  // pagination Navigation back
  const navigateBack = () => {
    if (currenntPage != 1) {
      setCurrentPage(currenntPage - 1);
    }
  };

  // function for changing date format
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("IN");
  };

  // function to get all todo list created by authorized User
  const getTodoList = async () => {
    const token = localStorage.getItem("token");
    // secret data
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    //API Call
    const result = await getTaskAPI(searchData, reqHeader);
    if (result.status == 200) {
      // for loader (making loading state false)
      setLoading(false);
      if (filter == "All") {
        setAllList(result.data);
      } else {
        setAllList(result.data.filter((item) => item.status == filter));
      }
    }
  };

  // function for creating new task
  const handleCreateTask = async () => {
    const { title } = taskTitle;
    if (!title) {
      toast("Title Should not be Empty!");
    } else {
      const token = localStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      //API Call
      const result = await createNewTaskAPI(taskTitle, reqHeader);
      if (result.status == 201) {
        toast(result.data);
        setTaskTitle("");
        setToggleAdd(false);
        setCreateStatus(result);
      } else {
        toast("Something Went Wrong");
      }
    }
  };

  //dynamic status options
  const statusOption = [
    "All",
    "In Progress",
    "On Hold",
    "Completed",
    "Not Completed",
  ];

  // for accessing current theme from child component
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
      {/* header with prop from header component */}
      <Header themeStatus={getValueFromChild} />
      <div
        className={`min-h-screen pt-20 px-5 sm:px-10 md:px-20 ${theme == "Dark" && "bg-black text-white"} `}
      >
        {/* home */}
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

        {/* search bar and filter */}
        <div className="flex w-full justify-center items-center gap-3 sm:gap-5 mb-3">
          <div
            className={`flex justify-center items-center bg-black/3 p-2 w-full rounded-lg ${theme == "Dark" && "bg-white/10 text-white placeholder:text-white"}`}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={`text-black/50 text-sm sm:text-base ${theme == "Dark" && "text-white/50"}`}
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
            className={`flex justify-center items-center gap-5 p-2 rounded-lg bg-black/3 focus:outline-none focus:ring-1 focus:ring-blue-400 appearance-none sm:pr-10 text-sm sm:text-base ${theme == "Dark" && "bg-white/10"}`}
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

        {/* Table for listing todo list */}
        {!loading ? (
          <div className="pb-5">
            {allList?.length > 0 ? (
              <div className="rounded-xl overflow-hidden">
                <div className="rounded-xl overflow-hidden">
                  <table className="w-full table-fixed">
                    <thead
                      className={`bg-black/5 hover:bg-black/6 ${theme == "Dark" && "bg-white/15 hover:bg-white/20"}`}
                    >
                      <tr>
                        <th className="p-2 md:p-5 text-xs sm:text-base sm:block hidden">
                          #
                        </th>
                        <th className="p-2 md:p-5 text-xs sm:text-base">
                          Task
                        </th>
                        <th className="p-2 md:p-5 text-xs sm:text-base">
                          Status
                        </th>
                        <th className="p-2 md:p-5 text-xs sm:text-base sm:block hidden">
                          Created At
                        </th>
                        <th className="p-2 md:p-5 text-xs sm:text-base">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className={`text-center bg-black/3 ${theme == "Dark" && "bg-white/10"}`}
                    >
                      {visibleLists.map((list, index) => (
                        <tr
                          key={list._id}
                          className={`border-b border-black/5 hover:bg-black/4 duration-300 ${theme == "Dark" && "border-white/5"}`}
                        >
                          <td className="p-2 md:p-4 text-xs sm:text-base sm:block hidden">
                            {index + 1}
                          </td>
                          <td className="p-2 md:p-4 text-xs sm:text-base truncate">
                            {list.title}
                          </td>
                          <td className="p-2 md:p-4">
                            <p
                              className={`inline-block py-1 px-1 w-25 sm:w-32 md:w-35 sm:px-2 rounded-lg ${list.status == "In Progress" ? "bg-blue-400/20 text-blue-400" : list.status == "On Hold" ? "bg-yellow-400/20 text-yellow-400" : list.status == "Completed" ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"} text-xs sm:text-base overflow-hidden text-ellipsis whitespace-nowrap`}
                            >
                              {list.status}
                            </p>
                          </td>
                          <td className="text-xs sm:text-base p-2 md:p-4 sm:block hidden">
                            {formatDate(list.createdAt)}
                          </td>
                          <td className="p-2 md:p-4">
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
                <div className="my-10 text-center">
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    onClick={navigateBack}
                    icon={faChevronLeft}
                  />{" "}
                  {currenntPage} / {totalPages}{" "}
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    onClick={navigateNext}
                    icon={faChevronRight}
                  />
                </div>
              </div>
            ) : (
              <p className="text-center text-xl font-semibold text-red-400">
                List is Empty
              </p>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <img
              width={"150px"}
              src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700"
              alt=""
            />
          </div>
        )}
      </div>

      {/* modal for form handling of new task */}
      {toggleAdd && (
        <div className="bg-black/50 h-screen inset-0 fixed z-99 flex justify-center items-center">
          <div
            className={`p-10 flex justify-center border items-center rounded-xl flex-col backdrop-blur-3xl ${theme == "Dark" ? "bg-[#2a2727]/10 border-white/10 text-white" : "bg-white"}`}
          >
            <h2 className="text-2xl text-blue-400">Create New Task</h2>
            <div className="pt-5">
              <input
                value={taskTitle.title}
                onChange={(e) =>
                  setTaskTitle({ ...taskTitle, title: e.target.value })
                }
                className={`w-full  px-2 rounded outline-0 ${theme=="Dark"?"bg-white/5":"bg-black/5"}`}
                placeholder="Title"
                type="text"
              />
            </div>
            <div className="pt-5">
              <input
                value={taskTitle.description}
                onChange={(e) =>
                  setTaskTitle({ ...taskTitle, description: e.target.value })
                }
                className={`w-full  px-2 rounded outline-0 ${theme=="Dark"?"bg-white/5":"bg-black/5"}`}
                placeholder="Title"
                type="text"
              />
            </div>
            <div className="flex justify-center items-center gap-3 pt-5">
              <button
                onClick={() => setToggleAdd(false)}
                className="bg-red-400 text-white py-1 px-2 rounded hover:bg-red-500 hover:text-white cursor-pointer duration-200 active:scale-97 w-20"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="bg-blue-400 text-white py-1 px-2 rounded hover:bg-blue-500 hover:text-white cursor-pointer duration-200 active:scale-97 w-20"
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
