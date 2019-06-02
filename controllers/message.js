'use strict';

const Response = require('../helpers/response');
const MessageRepository = require('../repositories/message');
const GroupRepository = require('../repositories/group');

exports.getMessageListByGroup = async (req, res, next) => {
    const { id } = req.params;
    const author = req.user._id;
    const isExistGroup = await GroupRepository
        .getOne({
            where: {
                _id: id,
                members: author
            },
            select: '_id',
            lean: true,
        });

    if (!isExistGroup) {
        return next(new Error('GROUP_NOT_FOUND'));
    }

    const messageList = await MessageRepository
        .getAll({
            where: {
                group: id
            },
            populate: [
                {
                    path: 'group',
                    select: '_id name'
                },
                {
                    path: 'author',
                    select: '_id name'
                }
            ],
            lean: true
        });

    return Response.success(res, messageList);
};

exports.createMessage = async (req, res, next) => {
    try {
        const author = req.user._id;
        const data = req.body;
        const isExistGroup = await GroupRepository
            .getOne({
                where: {
                    _id: data.group,
                    members: author
                },
                select: '_id',
                lean: true,
            });

        if (!isExistGroup) {
            return next(new Error('GROUP_NOT_FOUND'));
        }

        data.author = author;

        const message = await MessageRepository.insert(data);

        return Response.success(res, message);
    } catch (e) {
        return next(e);
    }
};