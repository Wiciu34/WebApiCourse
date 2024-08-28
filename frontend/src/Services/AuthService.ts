import axios from "axios";
import { UserProfile } from "../Models/User";

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

    }
}