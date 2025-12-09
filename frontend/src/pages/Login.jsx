

import { useForm } from "react-hook-form";
import styles from "../cssFiles/loginForm.module.css";

//-----------
import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { asyncCurrentUser, asyncLoginUser } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
//------

export default function Login() {
  const { register, handleSubmit } = useForm();
  const user = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {

    user ? navigate("/") : "";
  }, [dispatch]);

  const LoginUserHandler = (data) => {
    try {
      dispatch(asyncLoginUser(data));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardInner}>
            <div className={styles.leftSide}>
              

              <h1 className={styles.title}>Login</h1>
              <p className={styles.sub}>
                More than <strong>25,000 recipes</strong> from around the world
              </p>

              <form className={styles.form} onSubmit={handleSubmit(LoginUserHandler)}>
                <label className={styles.field}>
                  <span className={styles.icon} aria-hidden>
                    📧
                  </span>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    {...register("email")}
                    required
                    className={styles.input}
                    autoComplete="email"
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.icon} aria-hidden>
                    🔑
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    required
                    className={styles.input}
                    autoComplete="current-password"
                  />
                </label>

                <div className={styles.row}>
                  <label className={styles.remember}>
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="/forgot" className={styles.forgot}>
                    Forgot Password?
                  </a>
                </div>

                <button type="submit" className={styles.cta}>
                  LOGIN
                </button>

                <div className={styles.or}>or login with</div>

                <div className={styles.social}>
                  <button
                    type="button"
                    aria-label="Login with Facebook"
                    className={styles.socialBtn}
                  >
                    f
                  </button>
                  <button
                    type="button"
                    aria-label="Login with Google"
                    className={styles.socialBtn}
                  >
                    G
                  </button>
                  <button
                    type="button"
                    aria-label="Login with Twitter"
                    className={styles.socialBtn}
                  >
                    t
                  </button>
                </div>
              </form>
            </div>

            <div className={styles.rightSide} aria-hidden>
              {/* decorative hero image + cutouts */}
              <div className={styles.heroImg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
