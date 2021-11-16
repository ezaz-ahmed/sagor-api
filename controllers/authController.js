import asyncHandler from "express-async-handler";
import Boom from "boom";
import jwt from "jsonwebtoken";

import User from "../models/Users.js";

export const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res
        .status(400)
        .send({ error: true, message: "Mandatory params are missing" });
      return;
    }

    User.findOne({
      username,
      password,
    }).exec(async (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "Invalid Username",
        });
      } else {
        const token = jwt.sign({ user }, `${process.env.JWT_SECRET}`, {
          expiresIn: "7d",
        });
        res.cookie("token", token);
        return res.send({ token });
      }
    });
  } catch (error) {
    throw Boom.boomify(error);
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logout Successfull!",
    });
  } catch (error) {
    throw Boom.boomify(error);
  }
});
