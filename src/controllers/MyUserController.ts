import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/UsersModel";
import jwt from "jsonwebtoken";

const createMyUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const duplicateUserEmail = await User.findOne({ email });
    if (duplicateUserEmail) {
      return res.status(409).json({ message: "User email already exists" });
    }

    const duplicateUserUsername = await User.findOne({ username });
    if (duplicateUserUsername) {
      return res
        .status(409)
        .json({ message: "User username email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    await user.save();
    const hideUserPasswordFromResponse = await User.findOne({ email }).select(
      "-password"
    );
    if (!hideUserPasswordFromResponse) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign(
      {
        user_Id: hideUserPasswordFromResponse._id,
      },
      process.env.JWT_SECRET as string
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .send(hideUserPasswordFromResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const loginToAccount = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const foundUser = await User.findOne({ email }).lean();

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchUserPassword = await bcryptjs.compare(
      password,
      foundUser.password
    );

    if (!matchUserPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { password: pass, ...rest } = foundUser;

    const token = jwt.sign(
      {
        user_Id: rest._id,
      },
      process.env.JWT_SECRET as string
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .send(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createMyUser,
  loginToAccount,
};
