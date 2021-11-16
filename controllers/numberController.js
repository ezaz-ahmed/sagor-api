import asyncHandler from "express-async-handler";
import Boom from "boom";
import Number from "../models/Numbers.js";

export const getNumbers = asyncHandler(async (req, res) => {
  try {
    const { page, limit } = req.query;
    const option = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 50,
    };

    const data = await Number.paginate({}, option);
    res.send(data);
  } catch (error) {
    throw Boom.boomify(error);
  }
});

export const getActiveNumbers = asyncHandler(async (req, res) => {
  try {
    const { page, limit } = req.query;
    const option = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 50,
      options: {
        find: {
          active: true,
        },
      },
    };

    const data = await Number.paginate({}, option);
    res.send(data);
  } catch (error) {
    throw Boom.boomify(error);
  }
});

export const addNumber = asyncHandler(async (req, res) => {
  try {
    const data = new Number(req.body);
    data.save();

    return res.send({
      data,
      message: "Number saved successfully!",
    });
  } catch (error) {
    throw Boom.boomify(error);
  }
});

export const updateNumber = asyncHandler(async (req, res) => {
  try {
    const numberId = req.params.id;
    const { ...updatedData } = req.body;
    await Number.findByIdAndUpdate(
      { _id: numberId },
      { ...updatedData },
      {
        new: true,
      }
    );
    return res.send({ message: "List Updated Successfully" });
  } catch (error) {
    throw Boom.boomify(error);
  }
});

export const editLimit = asyncHandler(async (req, res) => {
  try {
    const numberId = req.params.id;
    const { amount } = req.body;

    Number.findOne({ _id: numberId }, function (err, number) {
      if (err || !number) {
        return res.status(400).json({
          error: "Invalid Number",
        });
      }

      if (number.limit < amount) {
        return res.status(304).send({ message: "Amount is higher then limit" });
      }

      number.limit -= parseInt(amount);
      number.save(function (err, updatedNumber) {
        if (err) {
          return res.status(400).send({ error: err });
        }
        return updatedNumber;
      });
    });
    await Number.findByIdAndUpdate(
      { _id: numberId },
      { ...updatedData },
      {
        new: true,
      }
    );
    return res.send({ message: "List Updated Successfully" });
  } catch (error) {
    throw Boom.boomify(error);
  }
});

export const toggleActiveNumber = asyncHandler(async (req, res) => {
  try {
    const numberId = req.params.id;
    Number.findOne({ _id: numberId }, function (err, number) {
      if (err || !number) {
        return res.status(400).json({
          error: "Invalid Number",
        });
      }
      number.active = !number.active;
      number.save(function (err, updateNumber) {
        if (err) {
          return res.status(400).send({ error: err });
        }
        return updateNumber;
      });
    });
  } catch (error) {
    throw Boom.boomify(error);
  }
});

export const removeNumber = asyncHandler(async (req, res) => {
  try {
    const numberId = req.params.id;
    const deleted = await Number.findOneAndDelete({ _id: numberId });
    res.status(202).send({ message: `${deleted.number} as been removed!` });
  } catch (error) {
    throw Boom.boomify(error);
  }
});
