'use strict';

const mongodb = require('mongodb');

exports.validateGetMessageListByGroup = (req, res, next) => {
    const { id } = req.params;

    if (!mongodb.ObjectID.isValid(id)) {
        return next(new Error('GROUP_ID_IS_INVALID'));
    }

    return next();
};

exports.validateCreateMessage= (req, res, next) => {
    const { content, group } = req.body;

    if (!content) {
        return next(new Error('CONTENT_IS_REQUIRED'));
    }

    if (!mongodb.ObjectID.isValid(group)) {
        return next(new Error('GROUP_ID_IS_INVALID'));
    }

    return next();
};