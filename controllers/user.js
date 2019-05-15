'use strict';

const Response = require('../helpers/response');
const { ObjectId } = require('mongodb');
const User = require('../models/user');

exports.getUserList = async (req, res, next) => {
    try {
        const users = await User.find();

        return Response.success(res, users);
    } catch (e) {
        return next(e);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: ObjectId(id) });

        if (!user) {
            return next(new Error('USER_NOT_FOUND'));
        }

        return Response.success(res, user);
    } catch (e) {
        return next(e);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (user) {
            return next(new Error('USERNAME_ALREADY_EXIST'));
        }

        const result = await User.create({ username, password });

        return Response.success(res, { username, _id: result.insertedId });
    } catch (e) {
        return next(e);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;
        const userData = await User.findOne({ _id: ObjectId(id) });

        if (userData.password !== oldPassword) {
            return next(new Error('OLD_PASSWORD_NOT_MATCH'));
        }

        const user = await User.findOneAndUpdate({ _id: ObjectId(id) }, { $set: { password: newPassword } });

        if (!user) {
            return next(new Error('USER_NOT_FOUND'));
        }

        return Response.success(res);
    } catch (e) {
        return next(e);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOneAndDelete({ _id: ObjectId(id) });

        if (!user) {
            return next(new Error('USER_NOT_FOUND'));
        }

        return Response.success(res);
    } catch (e) {
        return next(e);
    }
};