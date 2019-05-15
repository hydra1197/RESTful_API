const userMiddleware = require('../validations/user');
const userController = require('../controllers/user');
const validate = require('express-validation');
const { validateGetUserList } = require('../validations/user');

exports.load = app => {
    app.get(
        '/api/v1/users',
        // validate(validateGetUserList()),
        userController.getUserList
    );

    app.get(
        '/api/v1/users/:id',
        // userMiddleware.validateGetUserById,
        userController.getUserById
    );

    app.post(
        '/api/v1/users',
        // userMiddleware.validateCreateUser,
        userController.createUser
    );

    app.put(
        '/api/v1/users/:id',
        // userMiddleware.validateChangePassword,
        userController.changePassword
    );

    app.delete(
        '/api/v1/users/:id',
        // userMiddleware.validateDeleteUser,
        userController.deleteUser
    );
};