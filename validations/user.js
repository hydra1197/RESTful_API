'use strict';

const mongodb = require('mongodb');
const Joi = require('@hapi/joi');

exports.validateGetUserList = (req, res, next) => {
  return next();
};

exports.validateCreateUser = (req, res, next) => {
    const { username, password, name, email } = req.body;

    console.log({ username, password, name, email })

    if (!username) {
        return next(new Error('USERNAME_REQUIRED'));
    }

    if (!password) {
        return next(new Error('PASSWORD_REQUIRED'));
    }

    if (!name) {
        return next(new Error('NAME_REQUIRED'));
    }

    if (!email) {
        return next(new Error('EMAIL_REQUIRED'));
    }

    return next();
};

exports.validateGetUserById = (req, res, next) => {
    const { id } = req.params;

    if (!mongodb.ObjectID.isValid(id)) {
        return next(new Error('USER_ID_IS_INVALID'));
    }

    return next();
};

exports.validateChangePassword = (req, res, next) => {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!mongodb.ObjectID.isValid(id)) {
        return next(new Error('USER_ID_IS_INVALID'));
    }

    if (!oldPassword) {
        return next(new Error('OLD_PASSWORD_REQUIRED'));
    }

    if (!newPassword) {
        return next(new Error('NEW_PASSWORD_REQUIRED'));
    }

    if (!confirmPassword) {
        return next(new Error('CONFIRM_PASSWORD_REQUIRED'));
    }

    if (newPassword !== confirmPassword) {
        return next(new Error('PASSWORD_NOT_MATCH'));
    }

    return next();
};

exports.validateDeleteUser = (req, res, next) => {
    const { id } = req.params;

    if (!mongodb.ObjectID.isValid(id)) {
        return next(new Error('USER_ID_IS_INVALID'));
    }

    return next();
};

exports.validateLogin = (req, res, next) => {
    const { username, password } = req.body;

    if (!username) {
        return next(new Error('USERNAME_REQUIRED'));
    }

    if (!password) {
        return next(new Error('PASSWORD_REQUIRED'));
    }

    return next();
};