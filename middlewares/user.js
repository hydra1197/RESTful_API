'use strict';

exports.validateCreateUser = (req, res, next) => {
    const { username, password } = req.body;

    if (!username) {
        return next(new Error('USERNAME_REQUIRED'));
    }

    if (!password) {
        return next(new Error('PASSWORD_REQUIRED'));
    }

    return next();
};