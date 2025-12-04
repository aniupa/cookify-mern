import { userModel } from "../models/user.model.js";

export const userRegisterController = async (req, res) => {
  
  try {
    const { userName, email, password } = req.body;

    // basic request validation
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1) quick check (user-friendly early response)
    const existing = await userModel.findOne({ email: normalizedEmail }).lean();
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 2) hash password
    // const hashed = await bcrypt.hash(password, 10);

    // 3) create user (may still throw duplicate key if race condition)
    const user = await userModel.create({
      userName,
      email: normalizedEmail,
      password: password,
    });

    // you may want to remove password before sending back
    return res.status(201).json({ message: "User created", userId: user._id });
  } catch (err) {
    // 4) catch duplicate key error (race condition safety)
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
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

    res.status(500).json({ message: "internal server error" });
  }
};
