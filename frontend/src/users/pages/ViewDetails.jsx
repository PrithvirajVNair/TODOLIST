import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTaskAPI,
  getATaskAPI,
  updateTaskAPI,
} from "../../services/allAPIs";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

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

  // dynamic status option
  const statusOption = [
    "All",
    "In Progress",
    "On Hold",
    "Completed",
    "Not Completed",
  ];

  // function for getting specific to do task
  const getATask = async () => {
    const token = localStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    // API Call
    const result = await getATaskAPI(id, reqHeader);
    setTaskDetails(result.data);
  };

  // function for changing date format
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("IN");
  };

  //   function for handling updation of task
  const handleUpdateTask = async () => {
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
        className={`h-screen flex justify-center items-center px-5 sm:px-10 md:px-20 ${theme == "Dark" ? "bg-black text-white" : "bg-black/5"}`}
      >
        <div
          className={`p-10 w-200 flex flex-col gap-5 ${theme == "Dark" ? "bg-white/10" : "bg-white"}`}
        >
          <h2 className="text-center  text-base sm:text-xl font-semibold">
            {taskDetails.title}
          </h2>
          <div
            className={`h-20 bg-black/5 rounded overflow-y-scroll  ${theme == "Dark" ? "bg-black/40" : "bg-black/5"}`}
          >
            <p className="text-center text-sm sm:text-base">Description :</p>
            <p className="text-center text-sm sm:text-base">
              {taskDetails.description}
            </p>
          </div>
          <div className="flex max-sm:flex-col gap-3 justify-between items-center">
            <p className="text-sm sm:text-base">
              Status : {taskDetails.status}
            </p>
            <p className="text-sm sm:text-base">
              Created At : {formatDate(taskDetails.createdAt)}
            </p>
          </div>
          <div className="flex justify-center sm:justify-end items-center">
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

      {/* modal for form handling of task updation */}
      {toggleUpdate && (
        <div className="bg-black/50 h-screen inset-0 fixed z-99 flex justify-center items-center">
          <div
            className={`p-10 flex justify-center items-center flex-col ${theme == "Dark" ? "bg-[#2a2727] text-white" : "bg-white"}`}
          >
            <h2 className="text-2xl text-blue-400">Update Task</h2>
            <div className="pt-5">
              <input
                value={taskDetails.title}
                onChange={(e) =>
                  setTaskDetails({ ...taskDetails, title: e.target.value })
                }
                className="w-full bg-black/5 px-2  outline-0"
                placeholder="Title"
                type="text"
              />
            </div>
            <div className="pt-5">
              <input
                value={taskDetails.description}
                onChange={(e) =>
                  setTaskDetails({
                    ...taskDetails,
                    description: e.target.value,
                  })
                }
                className="w-full bg-black/5 px-2  outline-0"
                placeholder="Title"
                type="text"
              />
            </div>
            <select
              value={taskDetails.status}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, status: e.target.value })
              }
              className="w-full mt-5 outline-0"
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
                className="bg-red-400 text-white py-1 px-2 rounded hover:bg-white hover:text-red-400 cursor-pointer duration-200 active:scale-97 w-20"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTask}
                className="bg-blue-400 text-white py-1 px-2 rounded hover:bg-white hover:text-blue-400 cursor-pointer duration-200 active:scale-97 w-20"
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
