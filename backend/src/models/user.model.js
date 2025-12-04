// import express from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: [true, "userName required"] },
  //  email: { type: String, required: [true, "email required"],unique:true },
   email: {
    type: String,
    required: [true, "email required"],
    unique: true,         // creates unique index
    index: true,
    lowercase: true,      // Mongoose will store lowercase
    trim: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Invalid email format",}
    },
    password: { type: String, required: [true, "userName required"] },
})

export const userModel=mongoose.model('users',userSchema)