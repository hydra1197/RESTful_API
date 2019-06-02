'use strict';

const Response = require('../helpers/response');
const GroupRepository = require('../repositories/group');
const UserRepository = require('../repositories/user');

exports.getGroupList = async (req, res, next) => {
    try {
        const author = req.user._id;
        const groups = await GroupRepository
            .getAll({
              where: {
                members: author,
              },
              populate: [
                {
                  path: 'author',
                  select: '_id name'
                },
                {
                  path: 'members',
                  select: '_id name'
                }
              ]
            });

        return Response.success(res, groups);
    } catch (e) {
        return next(e);
    }
};

exports.createGroup = async (req, res, next) => {
    try {
        const author = req.user._id;
        const data = req.body;
        const totalExistUsers = await UserRepository
            .getOne({
                where: {
                    _id: { $in: data.members },
                }
            });

        if (data.members.length !== totalExistUsers) {
            return next(new Error('USER_NOT_FOUND'));
        }

        if (!data.members.includes(author)) {
            data.members.push(author)
        }

        const groupData = await GroupRepository
            .getOne({
                where: {
                    members: { $all: data.members },
                    type: 'individual'
                }
            });

        if (groupData) {
            return next(new Error('GROUP_IS_EXIST'));
        }

        data.author = author;

        const group = await GroupRepository
            .insert(data);

        return Response.success(res, group);
    } catch (e) {
        return next(e);
    }
};

exports.inviteUserToGroup = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userList } = req.body;

        const totalExistUser = await UserRepository
            .count({
                _id: { $in: userList }
            });

        if (!totalExistUser) {
            return next(new Error('USER_NOT_FOUND'));
        }

        const groupData = await GroupRepository
            .getOne({
                where: {
                    _id: id
                },
                select: 'members'
            });

        if (!groupData) {
            return next(new Error('GROUP_NOT_FOUND'));
        }

        groupData.members = groupData.members.concat(userList);

        const group = await groupData.save();

        return Response.success(res, group);
    } catch (e) {
        return next(e);
    }
};