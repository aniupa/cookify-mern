import React from "react";
import like from "../assets/like-removebg-preview.png";
import profileStyle from "../cssFiles/userUi.module.css";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import formStyles from "../styles/formStyles.module.css";

const Profile = () => {
  //   console.log("here");
  const { id } = useParams();

  const currentUser = useSelector((state) => state?.users?.data?.data?.user);
  const { register, handleSubmit } = useForm({
    default: { username: currentUser?.username },
  });
  //   console.log(currentUser);

  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={formStyles.formContainer}
    >
      <div className={profileStyle.profile}>
        <img src={currentUser?.pic ? currentUser.pic : like} alt="test" />
      </div>
      <p>UserName</p>

      <input
        type="text"
        {...register("username")}
        placeholder={currentUser?.username}
      />
      <p>Email</p>

      <input
        type="email"
        {...register("email")}
        placeholder={currentUser?.email}
      />
      <p>Password</p>

      <input
        type="password"
        {...register("username")}
        placeholder={currentUser?.password}
      />
      <input type="submit" />
    </form>
  );
};

export default Profile;
