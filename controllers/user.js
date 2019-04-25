'use strict';

const fs = require('fs');
const path = require('path');
const Response = require('../helpers/response');

const filePath = path.resolve('./', 'database', 'users.json');

exports.getUserList = (req, res, next) => {
    try {
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (Array.isArray(fileData) && fileData.length > 0) {
            return Response.success(res, fileData);
        }

        return Response.success(res);
    } catch (e) {
        return next(e);
    }
};

exports.getUserById = (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const index = fileData.findIndex((user) => {
            return parseInt(user.id) === userId
        });

        if (index < 0) {
            return next(new Error('USER_NOT_FOUND'))
        }

        return Response.success(res, fileData[index]);
    } catch (e) {
        return next(e);
    }
};

exports.createUser = (req, res, next) => {
    try {
        const { username, password } = req.body;
        let userId = 1;
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const index = fileData.findIndex((user) => {
            return user.username === username
        });

        if (index >= 0) {
            return next(new Error('USERNAME_ALREADY_EXIST'))
        }

        userId = fileData[fileData.length - 1].id + 1;

        fileData.push({
            id: userId,
            username,
            password
        });

        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

        return Response.success(res, { id: userId });
    } catch (e) {
        return next(e);
    }
};

exports.changePassword = (req, res, next) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;
        const userId = parseInt(id);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const index = fileData.findIndex((user) => {
            return parseInt(user.id) === userId
        });

        if (index < 0) {
            return next(new Error('USER_NOT_FOUND'));
        }

        const userData = fileData[index];

        if (oldPassword !== userData.password) {
            return next(new Error('OLD_PASSWORD_INCORRECT'));
        }

        userData.password = newPassword;
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

        return Response.success(res);
    } catch (e) {
        return next(e);
    }
};

exports.deleteUser = (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const index = fileData.findIndex((user) => {
            return parseInt(user.id) === userId
        });

        if (index < 0) {
            return next(new Error('USER_NOT_FOUND'));
        }

        fileData.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

        return Response.success(res);
    } catch (e) {
        return next(e);
    }
};