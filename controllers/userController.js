import Boom from 'boom';
import asyncHandler from 'express-async-handler';
import User from '../models/Users.js';

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

export const updateUser = asyncHandler(async (req, res) => {


    try {
        const id = req.params.id;
        const { ...updatedData } = req.body;
        const uu = await User.findOne({_id: id})
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { ...updatedData },
            {
                new: true,
            },
        );
        return res.send(updatedUser);
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
            message: 'User saved successfully!',
        });
    } catch (error) {
        throw Boom.boomify(error);
    }
});

export const deleteUser = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete({ _id: id });
        res.status(202).send({ message: `${data.username} has been removed` });
    } catch (error) {
        throw Boom.boomify(error);
    }
});
