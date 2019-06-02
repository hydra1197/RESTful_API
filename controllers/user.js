'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Response = require('../helpers/response');
const { ObjectId } = require('mongodb');
const User = require('../models/user');
const JWT = require('../helpers/jwt');

exports.getUserList = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return next(new Error('PERMISSION_DENIED'));
        }

        const users = await User.find().lean();

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
        const { username, password, name, email } = req.body;

        const userData = await User.findOne({ username });

        if (userData) {
            return next(new Error('USERNAME_ALREADY_EXIST'));
        }

        const salt = bcrypt.genSaltSync(2);
        const hashPassword = bcrypt.hashSync(password, salt);

        const user = await User.create({ username, password: hashPassword, name, email });
        delete user._doc.password;
        delete user._doc.createdAt;
        delete user._doc.updatedAt;

        return Response.success(res, user);
    } catch (e) {
        return next(e);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;
        const userData = await User.findOne({ _id: ObjectId(id) });

        if (!userData) {
            return next(new Error('USER_NOT_FOUND'));
        }

        if (userData.password !== oldPassword) {
            return next(new Error('OLD_PASSWORD_NOT_MATCH'));
        }

        userData.password = newPassword;
        await userData.save();

        return Response.success(res);
    } catch (e) {
        return next(e);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.deleteOne({ _id: ObjectId(id) });

        if (!user.deletedCount) {
            return next(new Error('USER_NOT_FOUND'));
        }

        return Response.success(res);
    } catch (e) {
        return next(e);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return next(new Error('USER_NOT_FOUND'));
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) {
            return next(new Error('PASSWORD_IS_INCORRECT'));
        }

        const token = JWT.sign({ _id: user._id });

        delete user._doc.password;
        delete user._doc.createdAt;
        delete user._doc.updatedAt;

        return res.json({
            success: true,
            data: user,
            access_token: token
        })
    } catch (e) {
        return next(e);
    }
};