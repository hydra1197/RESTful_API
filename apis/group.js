const groupController = require('../controllers/group');
const { validateCreateGroup, validateInviteUserToGroup } = require('../validations/group');
const { Auth } = require('../middlewares');

exports.load = app => {
    app.get(
        '/api/v1/groups',
        [Auth.isAuth],
        groupController.getGroupList
    );

    app.post(
        '/api/v1/group',
        [Auth.isAuth, validateCreateGroup],
        groupController.createGroup
    );

    app.put(
        '/api/v1/group/invite/id',
        [Auth.isAuth, validateInviteUserToGroup],
        groupController.inviteUserToGroup
    );
};