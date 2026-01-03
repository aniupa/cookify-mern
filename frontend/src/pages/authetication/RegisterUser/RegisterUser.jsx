import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../../../store/actions/userAction";
import Particles from "../../../utils/animations/AuthBG/Galaxy";
import styles from "../authCss/login.module.css";
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
    navigate("/");
  };
  return (
     <section className={styles.loginPage}>
  
  {/* BACKGROUND */}
  <div className={styles.bg}>
    <Particles
      particleColors={['#ffffff', '#ffffff']}
      particleCount={200}
      particleSpread={10}
      speed={0.1}
      particleBaseSize={100}
      moveParticlesOnHover={true}
      alphaParticles={false}
      disableRotation={false}
    />
  </div>

  {/* FOREGROUND CONTENT */}
  <div className={styles.content}>
    <div className={styles.left}>
      <h1>
        Welcome back,<br />
        <span>let’s get cooking</span>
      </h1>
    </div>

    <div className={styles.right}>
      <div className={styles.card}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit(registerUserHandler)}>
           <input type="text" placeholder="username" name="username" {...register("username")} />
         
          <input type="email" placeholder="email" {...register("email")} />
          <input type="password" placeholder="password" {...register("password")} />
          <button type="submit">Let's Go →</button>
        </form>

        <p className={styles.signup}>
          Already have an account? <span onClick={login}><b>Login</b></span>
        </p>
      </div>
    </div>
  </div>

</section>
  );
};

export default RegisterUser;
