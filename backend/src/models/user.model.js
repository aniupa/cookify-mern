// import express from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "userName required"] },
  //  email: { type: String, required: [true, "email required"],unique:true },
  email: {
    type: String,
    required: [true, "email required"],
    unique: true, // creates unique index
    index: true,
    lowercase: true, // Mongoose will store lowercase
    trim: true,

   
  }, password: { type: String, required: [true, "password required"] },
});

export const userModel = mongoose.model("users", userSchema);
