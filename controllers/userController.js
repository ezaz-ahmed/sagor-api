import asyncHandler from "express-async-handler";
import Boom from "boom";

import User from "../models/Users.js";

export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const { page, limit } = req.query;
    const option = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 50,
      options: {
        find: {
          role: 0,
        },
      },
    };

    const data = await User.paginate({}, option);

    res.send(data);
  } catch (error) {
    throw Boom.boomify(error);
  }
});

export const addUser = asyncHandler(async (req, res) => {
  try {
    const data = new User(req.body);
    data.save();
    return res.send({
      data,
      message: "User saved successfully!",
    });
  } catch (error) {
    throw Boom.boomify(error);
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const data = await User.findByIdAndDelete({ _id: req.params.id });
    res.status(202).send({ message: `${data.username} has been removed` });
  } catch (error) {
    throw Boom.boomify(error);
  }
});
