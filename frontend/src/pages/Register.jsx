import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../store/actions/userAction";
import styles from "../cssFiles/RegisterForm.module.css";
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
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
  return (
    <div className={styles.rf_container}>
      <section className={styles.rf_main_sectionContainer}>
        <main className={styles.rf_main}>
          <section className={styles.rf_formContainer}>
            <form
              onSubmit={handleSubmit(registerUserHandler)}
              className={styles.formContainer}
            >
              <h3 style={{ textAlign: "center" }}>REGISTER</h3>
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
              <input type="submit" className={styles.rf_submit_btn} />
            </form>
          </section>
          <div className={styles.rf_heroContainer}>
            <div className={styles.rf_intro}>
              <h2>Create Account</h2> <h3>what you will get? </h3>
            </div>

            <h6>
              <ul>
                <li>Save your favorite recipes in one place</li>
                <li>Access step-by-step cooking guides</li>
                <li>Create your own recipe collections</li>
                <li>Join a growing community of home cooks</li>
              </ul>
            </h6>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Register;
