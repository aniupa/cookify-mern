import React from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../store/actions/userAction";
import styles from '../styles/formStyles.module.css'
const Register = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerUserHandler = (data) => {
    try {
      dispatch(asyncRegisterUser(data));
      navigate("/home");
    } catch (error) {
        console.log(error);
        
    }
  };
  return (
    <form onSubmit={handleSubmit(registerUserHandler)} className={styles.formContainer}>
      <input
        type="text"
        placeholder="UserName"
        {...register("username")}
        name="username"
      />
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

export default Register;
