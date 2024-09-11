import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5080/api/comment/";

export const CommentPostAPI = async( title: string, content: string, symbol: string) => {
    try{
        const data = await axios.post<CommentPost>(api + `${symbol}`, {
            title: title,
            content: content
        });
        return data;
    }
    catch(error){
        handleError(error);
    }

}

export const CommentGetAPI = async (
   symbol: string
) => {
   try {
      const data = await axios.post<CommentGet[]>(api + `?Symbol=${symbol}`, {
      });
      return data;
   } catch (error) {
      handleError(error);
   }
};