import { userModel } from "../models/user.model.js";



export const userRegisterController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(req.body);

    const user = await userModel.create({ userName, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
  // console.log(req.body);
  const user = await userModel.findOne({ email });
  if (user) {
    user.password == password
      ? res.status(200).json({ message: `welcome `, user })
      : res.status(400).json({ message: "invalid password" });
  } else {
    return res
      .status(500)
      .json({ message: "unauthorized user... pls register!!" });
  }
  } catch (error) {
    console.log(error);
    
    res.status(500).json({message:'internal server error'})
  }
  
};
