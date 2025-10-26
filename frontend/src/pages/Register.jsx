import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useNavigate } from "react-router-dom";
import { asyncRegisterUser } from "../store/actions/userAction";
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
    <form onSubmit={handleSubmit(registerUserHandler)}>
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
