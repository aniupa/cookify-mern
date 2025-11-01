import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import { asyncCurrentUser, asyncLoginUser } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
//styles
import styles from '../styles/formStyles.module.css'
const Login = () => {
  const { register, handleSubmit } = useForm();
  const user=useSelector((state)=>state.users.data)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(user);
    
    user  ? navigate("/"):""
    
  },[dispatch])

  const LoginUserHandler = (data) => {
    try {

      dispatch(asyncLoginUser(data));

      navigate("/");
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <form onSubmit={handleSubmit(LoginUserHandler)} className={styles.formContainer}>
      <input
        type="email"
        placeholder="email"
        {...register("email")}
        name="email"
      />
      <input
        type="password"
        placeholder="password"
        {...register("password")}
        name="password"
      />
      <input type="submit" />
    </form>
  );
};

export default Login;
