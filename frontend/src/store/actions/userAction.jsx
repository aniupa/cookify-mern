import axios from '../../utils/axios'
import { toast } from "react-toastify";

//reducers
import { loadUser } from "../reducers/UserSlice";


export const asyncRegisterUser = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/register", data);
    
    
    toast.success("user created successfully");
  } catch (error) {
    // console.log(error);
    if (error?.response?.status === 409) {
        
        toast.error("Email already registered, login instead");
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
      toast.warn('unauthorized user')
    }
  } catch (error) {
    console.log(error);
  }
  //
};
