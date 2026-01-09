import axios from "../../utils/axios";
import { LoadVideos } from "../reducers/recipeSlice";

export const asyncGetVideosActions = (filters = {}) => async (dispatch, getState) => {
    try {
        const userId = getState()?.users?.data?.data?.user?._id;
        const params = { ...filters };
        if (userId) params.userId = userId;
        const res = await axios.get("/videos", { params });
        dispatch(LoadVideos(res.data?.videos ?? []));

    } catch (error) {
        console.log(error);
        
    }
}
