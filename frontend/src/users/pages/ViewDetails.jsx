import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTaskAPI,
  getATaskAPI,
  updateTaskAPI,
} from "../../services/allAPIs";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck as faCircleCheckRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendar,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { format } from "timeago.js";

const ViewDetails = () => {
  // accessing id from url
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState({});
  const [updateStatus, setUpdateStatus] = useState([]);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState([]);
  const [themeStatus, setThemeStatus] = useState("");
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(true);
    
  // dynamic status option
  const statusOption = ["In Progress", "On Hold", "Completed", "Not Completed"];

  // function for getting specific to do task
  const getATask = async () => {
    const token = localStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    // API Call
    const result = await getATaskAPI(id, reqHeader);
    // for loader (making loading state false)
    setLoading(false);
    setTaskDetails(result.data);
  };

  // function for changing date format
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("IN");
  };

  //   function for handling updation of task
  const handleUpdateTask = async () => {
    const { title } = taskDetails;
    if (!title) {
      toast("Title Should not be Empty!");
    } else {
      const token = localStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      // API Call
      const result = await updateTaskAPI(taskDetails, reqHeader);
      if (result.status == 200) {
        toast("Task Updated!");
        setUpdateStatus(result);
        setToggleUpdate(false);
      }
    }
  };

  //   function for handling Task deletion
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    // API Call
    const result = await deleteTaskAPI(id, reqHeader);
    if (result.status == 200) {
      navigate("/home");
      toast(result.data);
      setDeleteStatus(result);
    }
  };

  // function for accessing value/props from child component
  const getValueFromChild = (value) => {
    setThemeStatus(value);
  };

  useEffect(() => {
    getATask();
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
  }, [updateStatus, deleteStatus, themeStatus]);

  return (
    <>
      <Header themeStatus={getValueFromChild} />
      <div
        className={`min-h-screen flex flex-col justify-center items-center px-5 sm:px-10 md:px-20 ${theme == "Dark" ? "bg-black text-white" : "bg-black/5"}`}
      >
        {!loading ? (
          <div className="md:w-200 w-full flex flex-col justify-center items-center py-20">
            <div className="bg-blue-400 w-full rounded-t-xl px-5 md:px-10 py-5">
              <h4 className="text-2xl sm:text-3xl font-bold text-white">
                {taskDetails.title}
              </h4>
              <div className="flex max-md:flex-col text-sm sm:text-base">
                <p className="text-white me-3">
                  Created: {formatDate(taskDetails.createdAt)}
                </p>
                <p className="text-white me-3">
                  Last updated: {format(taskDetails.updatedAt)}
                </p>
                <p className="text-white">
                  Due Date: <span className="text-red-400">{formatDate(taskDetails.dueDate)}</span>
                </p>
              </div>
            </div>
            <div
              className={`p-5 md:p-10 w-full flex flex-col gap-3 sm:gap-5 rounded-b-xl ${theme == "Dark" ? "bg-white/10" : "bg-white"}`}
            >
              <div className="grid md:grid-cols-3 text-xs sm:text-base">
                <div
                  className={`p-5 m-1 md:m-3 border rounded-xl bg-black/2 ${theme == "Dark" ? "border-white/10" : "border-black/10"}`}
                >
                  <p>Status</p>
                  <p
                    className={` border rounded-xl px-2 py-1 mt-3 ${taskDetails.status == "In Progress" ? "text-blue-400" : taskDetails.status == "On Hold" ? "text-yellow-400" : taskDetails.status == "Completed" ? "text-green-400" : "text-red-400"}`}
                  >
                    {taskDetails.status == "Completed" ? (
                      <FontAwesomeIcon
                        icon={faCircleCheckRegular}
                        className="me-2"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleRegular}
                        className="me-2"
                      />
                    )}
                    {taskDetails.status}
                  </p>
                </div>
                <div
                  className={`p-5 m-1 md:m-3 border rounded-xl bg-black/2  ${theme == "Dark" ? "border-white/10" : "border-black/10"} `}
                >
                  <p>Created Date</p>
                  <p className="rounded-xl mt-3">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="me-2 text-blue-400"
                    />
                    {formatDate(taskDetails.createdAt)}
                  </p>
                </div>
                <div
                  className={`p-5 m-1 md:m-3 border rounded-xl bg-black/2 overflow-x-hidden  ${theme == "Dark" ? "border-white/10" : "border-black/10"}`}
                >
                  <p>Task ID</p>
                  <p className=" rounded-xl mt-3 truncate text-red-400">
                    #{taskDetails._id}
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base">Description :</p>
              <div
                className={`p-2 sm:p-5 bg-black/2 border rounded-xl ${theme == "Dark" ? "border-white/10" : "border-black/10"}`}
              >
                <div
                  className={`h-20 rounded-xl overflow-y-scroll  ${theme == "Dark" ? "bg-black/40" : "bg-white"}`}
                >
                  <p className="text-xs p-2 sm:text-base">
                    {taskDetails.description || "Description..."}
                  </p>
                </div>
              </div>
              <div className="flex justify-center sm:justify-end items-center">
                <a
                  href="/home"
                  className="text-xs sm:text-base bg-white text-black border border-black/10 py-1 px-2 rounded  cursor-pointer duration-200 active:scale-97 me-3"
                >
                  Back
                </a>
                <button
                  onClick={() => setToggleUpdate(true)}
                  className="text-xs sm:text-base bg-orange-400 text-white py-1 px-2 rounded hover:bg-orange-500  cursor-pointer duration-200 active:scale-97 me-3"
                >
                  <FontAwesomeIcon icon={faPencil} />
                  Edit
                </button>
                <button
                  onClick={() => setToggleDelete(true)}
                  className="text-xs sm:text-base bg-red-400 text-white py-1 px-2 rounded hover:bg-red-500  cursor-pointer duration-200 active:scale-97 me-3"
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </button>
              </div>
            </div>
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

      {/* modal for form handling of task updation */}
      {toggleUpdate && (
        <div className="bg-black/50 h-screen inset-0 fixed z-99 flex justify-center items-center">
          <div
            className={`p-10 flex justify-center border items-center rounded-xl flex-col backdrop-blur-3xl ${theme == "Dark" ? "bg-[#2a2727]/10 border-white/10 text-white" : "bg-white"}`}
          >
            <h2 className="text-2xl text-blue-400 font-semibold">Update Task</h2>
            <div className="pt-5 w-full">
              <input
                value={taskDetails.title}
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, title: e.target.value })
                }
                className={`w-full  px-2 rounded outline-0 ${theme=="Dark"?"bg-white/5":"bg-black/5"}`}
                placeholder="Title"
                type="text"
              />
            </div>
            <div className="pt-5 w-full">
              <input
                value={taskDetails.description}
                onChange={(e) =>
                  setTaskDetails({
                    ...taskDetails,
                    description: e.target.value,
                  })
                }
                className={`w-full  px-2 rounded outline-0 ${theme=="Dark"?"bg-white/5":"bg-black/5"}`}
                placeholder="Description"
                type="text"
              />
            </div>
            <div className="pt-5 w-full flex whitespace-nowrap">
              <label className={`me-2 ${theme=="Dark"?"text-white/60":"text-black/60"}`} htmlFor="due">Due Date :</label>
              <input
                id="due"
                value={taskDetails?.dueDate?.split("T")[0]}
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, dueDate: e.target.value })
                }
                className={`w-full  px-2 rounded outline-0 ${theme=="Dark"?"bg-white/5":"bg-black/5"}`}
                placeholder="Description"
                type="date"
              />
            </div>
            <select
              value={taskDetails.status}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, status: e.target.value })
              }
              className={`w-full mt-5 px-2 rounded outline-0 ${theme=="Dark"?"bg-white/5":"bg-black/5"}`}
              name=""
              id=""
            >
              {statusOption.map((option, index) => (
                <option
                  key={index}
                  value={option}
                  className={`bg-black/10 px-5 py-2 w-50 hover:bg-black/25 duration-200 cursor-pointer ${theme == "Dark" && "text-black"}`}
                >
                  {option}
                </option>
              ))}
            </select>
            <div className="flex justify-center items-center gap-3 pt-5">
              <button
                onClick={() => setToggleUpdate(false)}
                className="bg-red-400 text-white py-1 px-2 rounded hover:bg-red-500 hover:text-white cursor-pointer duration-200 active:scale-97 w-20"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTask}
                className="bg-blue-400 text-white py-1 px-2 rounded hover:bg-blue-500 hover:text-white cursor-pointer duration-200 active:scale-97 w-20"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* confirmation modal for delete task */}
      {toggleDelete && (
        <div className="h-screen fixed inset-0 bg-black/50 z-99 flex justify-center items-center px-5 text-sm sm:text-base">
          <div
            className={`p-5 flex flex-col justify-center items-center gap-3 rounded-lg ${theme == "Dark" ? "bg-[#2a2727] text-white" : "bg-white"}`}
          >
            <p>Are You Sure You Want to Delete This Task?</p>
            <div className="flex justify-end items-center w-full">
              <button
                onClick={() => setToggleDelete(false)}
                className="bg-orange-400 hover:bg-orange-500 cursor-pointer text-white px-2 rounded me-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-400 hover:bg-red-500 cursor-pointer text-white px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewDetails;
