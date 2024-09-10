import axios from "axios";
import { UserProfile } from "../Models/User";
import { handleError } from "../Helpers/ErrorHandler";

const api =  "http://localhost:5080/api";

export const loginApi = async(username: string, password: string) => {
    try{
        const data = await axios.post<UserProfile>(api + "account/Login", {
            username: username,
            password: password,
        });
        return data;
    }
    catch(error){
        handleError(error)
    }
}

export const registerApi = async(username: string, password: string, email: string) => {
    try {
        const data = await axios.post<UserProfile>(api + "account/Register", {
            username: username,
            password: password,
            email: email
        })
        return data;
    }
    catch(error){
        handleError(error)
    }
}