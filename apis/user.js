const userController = require('../controllers/user');
const { Auth } = require('../middlewares');
const {
    validateGetUserList,
    validateGetUserById,
    validateCreateUser,
    validateChangePassword,
    validateDeleteUser,
    validateLogin
} = require('../validations/user');

exports.load = app => {
    app.get(
        '/api/v1/users',
        [Auth.isAuth, validateGetUserList],
        userController.getUserList
    );

    app.get(
        '/api/v1/users/:id',
        validateGetUserById,
        userController.getUserById
    );

    app.post(
        '/api/v1/users',
        validateCreateUser,
        userController.createUser
    );

    app.put(
        '/api/v1/users/:id',
        validateChangePassword,
        userController.changePassword
    );

    app.delete(
        '/api/v1/users/:id',
        validateDeleteUser,
        userController.deleteUser
    );

    app.post(
        '/api/v1/login',
        validateLogin,
        userController.login
    );
};