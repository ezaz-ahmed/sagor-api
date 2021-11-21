import Boom from 'boom';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

export const authCheck = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.user._id);

            next();
        } catch (error) {
            res.status(401).json({
                error: 'Not authorized, token failed',
            });
            throw Boom.boomify(error);
        }
    }

    if (!token) {
        res.status(401).json({
            error: 'Not authorized, token failed',
        });
    }
});

export const adminCheck = (req, res, next) => {
    if (req.user && req.user.role === 1) {
        next();
    } else {
        return res.status(401).json({
            error: 'Admin resource access denied.',
        });
    }
};
