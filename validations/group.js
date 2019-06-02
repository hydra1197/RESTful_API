'use strict';

const mongodb = require('mongodb');

exports.validateCreateGroup= (req, res, next) => {
    const { members, name, type } = req.body;

    if (!members || !name || !type) {
        return next(new Error('DATA_INVALID'));
    }

    if (!Array.isArray(members) && members.length > 0) {
        return next(new Error('MEMBERS_INVALID'));
    }

    if (type !== 'individual' && type !== 'group') {
        return next(new Error('TYPE_INVALID'));
    }

    return next();
};

exports.validateInviteUserToGroup= (req, res, next) => {
    const { userList } = req.body;
    const { id } = req.params;

    if (!mongodb.ObjectID.isValid(id)) {
        return next(new Error('GROUP_ID_IS_INVALID'));
    }

    if (Array.isArray(userList) && userList.length > 0) {
        return next(new Error('USER_LIST_IS_INVALID'));
    }

    return next();
};