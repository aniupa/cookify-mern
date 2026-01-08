import axios from '../../utils/axios'
import { toast } from "react-toastify";

//reducers
import { loadUser, resetUser } from "../reducers/UserSlice";
import { resetRecipes } from '../reducers/RecipeSlice';
resetRecipes


export const asyncRegisterUser = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/register", data);
    
    
    toast.success("user created successfully");
  } catch (error) {
    // console.log(error);
    if (error?.response?.status === 409) {
        
        toast.error("Email already registered, login instead");
      }
      else{
        console.log(error);
        
      }
  }
};

export const asyncLoginUser = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/login", data);
    localStorage.setItem("token", JSON.stringify(res));
    dispatch(asyncCurrentUser());

    toast.success("user logged in successfully");
    
  } catch (error) {

          toast.warn(`${error.response.data.message}`);
  }
};

export const asyncCurrentUser = () => (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("token"));
    if (user) dispatch(loadUser(user));
    else {
      // resetUser
      dispatch(resetRecipes());
      toast.warn('unauthorized user')
    }
  } catch (error) {
    console.log(error);
  }
  //
};

export const asyncUpdateUser = (id, data) => async (dispatch, getState) => {
  try {
    const payload = { ...data };
    Object.keys(payload).forEach((key) => {
      if (payload[key] === "" || payload[key] === null || payload[key] === undefined) {
        delete payload[key];
      }
    });

    const res = await axios.patch(`/user/${id}`, payload);

    const stored = JSON.parse(localStorage.getItem("token") || "null");
    if (stored?.data?.user) {
      stored.data.user = res?.data?.user || stored.data.user;
      localStorage.setItem("token", JSON.stringify(stored));
      dispatch(loadUser(stored));
    }

    toast.success("profile updated successfully");
  } catch (error) {
    const message = error?.response?.data?.message || "failed to update profile";
    toast.error(message);
  }
};
