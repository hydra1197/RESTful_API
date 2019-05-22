'use strict';

const mongodb = require('mongodb');

exports.validateCreateProduct= (req, res, next) => {
    const { name, price, user } = req.body;

    if (!name) {
        return next(new Error('PRODUCT_NAME_REQUIRED'));
    }

    if (!price) {
        return next(new Error('PRODUCT_PRICE_REQUIRED'));
    }

    if (!mongodb.ObjectID.isValid(user)) {
        return next(new Error('USER_ID_IS_INVALID'));
    }

    return next();
};