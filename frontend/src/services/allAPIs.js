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