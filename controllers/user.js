'use strict';

const Response = require('../helpers/response');
const { ObjectId } = require('mongodb');

exports.getUserList = async (req, res, next) => {
    try {
        const db = req.db;

        const users = await db.collection('users').find().toArray();

        return Response.success(res, users);
    } catch (e) {
        return next(e);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const db = req.db;

        const user = await db.collection('users').findOne({ _id: ObjectId(id) });

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
        const db = req.db;

        const user = await db.collection('users').findOne({ username });

        if (user) {
            return next(new Error('USERNAME_ALREADY_EXIST'));
        }

        const result = await db.collection('users').insertOne({ username, password });

        return Response.success(res, { username, _id: result.insertedId });
    } catch (e) {
        return next(e);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        const db = req.db;

        const result = await db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: { password: newPassword } });

        if (!result.result.nModified) {
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
        const db = req.db;

        const result = await db.collection('users').remove({ _id: ObjectId(id) });

        if (!result.result.n) {
            return next(new Error('USER_NOT_FOUND'));
        }

        return Response.success(res);
    } catch (e) {
        return next(e);
    }
};