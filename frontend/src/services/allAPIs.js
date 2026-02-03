import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"

// =================================== Authentication Part ========================================

// user register API
export const userRegisterAPI = async(reqBody) => {
    return await commonAPI("POST",`${serverURL}/user-register`,reqBody)
}

// user login API
export const userLoginAPI = async(reqBody) => {
    return await commonAPI("POST",`${serverURL}/user-login`,reqBody)
}

// user google login API
export const userGoogleLoginAPI = async(reqBody) => {
    return await commonAPI("POST",`${serverURL}/google-user-login`,reqBody)
}

// =================================== Task Part ========================================

// create new task API
export const createNewTaskAPI = async(reqBody,reqHeader) => {
    return await commonAPI("POST",`${serverURL}/create-task`,reqBody,reqHeader)
}

// get all task API
export const getTaskAPI = async(searchData,reqHeader) => {
    return await commonAPI("GET",`${serverURL}/get-task?search=${searchData}`,"",reqHeader)
}

// get a single task API
export const getATaskAPI = async(id,reqHeader) => {
    return await commonAPI("GET",`${serverURL}/task/${id}/details`,"",reqHeader)
}

// update task API
export const updateTaskAPI = async(reqBody,reqHeader) => {
    return await commonAPI("PUT",`${serverURL}/update-task`,reqBody,reqHeader)
}

// create new task API
export const deleteTaskAPI = async(id,reqHeader) => {
    return await commonAPI("DELETE",`${serverURL}/delete-task/${id}`,"",reqHeader)
}