const messageController = require('../controllers/message');
const { validateCreateMessage, validateGetMessageListByGroup } = require('../validations/message');
const { Auth } = require('../middlewares');

exports.load = app => {
    app.get(
        '/api/v1/message/group/:id',
        [Auth.isAuth, validateGetMessageListByGroup],
        messageController.getMessageListByGroup
    );

    app.post(
        '/api/v1/message',
        [Auth.isAuth, validateCreateMessage],
        messageController.createMessage
    );
};