// import express from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: [true, "userName required"] },
   email: { type: String, required: [true, "email required"] },
    password: { type: String, required: [true, "userName required"] },
});

export const userModel=mongoose.model('users',userSchema)