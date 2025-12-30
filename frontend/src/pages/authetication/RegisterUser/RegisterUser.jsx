import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../../../store/actions/userAction";
// import styles from "../cssFiles/RegisterForm.module.css";
import styles from "./RegisterForm.module.scss";
import { ToastContainer, toast } from "react-toastify";
const RegisterUser = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerUserHandler = (data) => {
    try {
      console.log(data);

      dispatch(asyncRegisterUser(data));
      navigate("/");
    } catch (error) {
      // console.log(error);
      console.log(error?.response?.status);
    }
  };
  const login = () => {
    // console.log('login');
    navigate("/Login");
  };
  return (
    <section className={styles.loginPage}>
      {/* LEFT CONTENT */}
      <div className={styles.left}>
        <h1>
         Join the <b>Cookify</b>  community <br />
          <span >and,</span> <br /> <span> start cooking today</span>
        </h1>
        {/* <p>Please fill the form on the right side.</p> */}
      </div>

      {/* RIGHT GLASS CARD */}
      <div className={styles.right}>
        <div className={styles.card}>
          <h2><b>Register</b> </h2>
          <form onSubmit={handleSubmit(registerUserHandler)}>
            {" "}
            <input
              type="text"
              placeholder="UserName"
              {...register("userName")}
              name="userName"
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
            <button type="submit">
            Lets Go <span>→</span>
          </button>
          </form>

          

          <p className={styles.signup}>
            Do you already have a account? <span onClick={login}><b> Sign In</b></span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterUser;
