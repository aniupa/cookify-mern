

import { useForm } from "react-hook-form";
import styles from "../authCss/login.module.css";
import Particles from '../../../utils/animations/AuthBG/Galaxy';

//-----------
import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { asyncCurrentUser, asyncLoginUser } from "../../../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
//------

export default function Login() {
  const { register, handleSubmit } = useForm();
  const user = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {

    user ? navigate(`/user/${user}/Home`) : "";
  }, [dispatch]);
  const signUp=()=>{
    navigate('/register')
  }

  const LoginUserHandler = (data) => {
    try {
      dispatch(asyncLoginUser(data));
      
      navigate("/");
    //   console.log(data);
      
      
    } catch (error) {
      toast.warn(`${error.response.data.message}`)
      console.log(error.response.data.message);
    }
  };

  return (
  //    <section className={styles.loginPage}>
  //         {/* LEFT CONTENT */}
         
  //         <Particles
  //   particleColors={['#ffffff', '#ffffff']}
  //   particleCount={200}
  //   particleSpread={10}
  //   speed={0.1}
  //   particleBaseSize={100}
  //   moveParticlesOnHover={true}
  //   alphaParticles={false}
  //   disableRotation={false}
  // /> <div className={styles.left}>
  //           <h1>
  //             Welcome back,<br />
  //             {/* here, */}
  //              <span>let’s get cooking</span>
  //           </h1>
  //           {/* <p>Please fill the form on the right side.</p> */}
  //         </div>
    
  //         {/* RIGHT GLASS CARD */}
  //         <div className={styles.right}>
  //           <div className={styles.card}>
  //             <h2>Login</h2>
  //             <form onSubmit={handleSubmit(LoginUserHandler)}>
  //               {" "}
  //               <input
  //                 type="email"
  //                 placeholder="email"
  //                 {...register("email")}
  //                 name="email"
  //               />
  //               <input
  //                 type="password"
  //                 placeholder="password"
  //                 {...register("password")}
  //                 name="password"
  //               />
  //               <button type="submit">
  //               Let Me In →
  //             </button>
  //             </form>
    
              
    
  //             <p className={styles.signup}>
  //               Don’t have an account? <span onClick={signUp}><b>Register</b> </span>
  //             </p>
  //           </div>
  //         </div>
  //       </section>
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit(LoginUserHandler)}>
          <input type="email" placeholder="email" {...register("email")} />
          <input type="password" placeholder="password" {...register("password")} />
          <button type="submit">Let Me In →</button>
        </form>

        <p className={styles.signup}>
          Don’t have an account? <span onClick={signUp}><b>Register</b></span>
        </p>
      </div>
    </div>
  </div>

</section>

  );
  
}
