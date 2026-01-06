import axios from "../../utils/axios";
import { LoadVideos } from "../reducers/recipeSlice";

export const asyncGetVideosActions=()=>async (dispatch ,getState)=> {
    try {
        const res=await axios.get('/videos');
        dispatch(LoadVideos(res));
        

    } catch (error) {
        console.log(error);
        
    }
}