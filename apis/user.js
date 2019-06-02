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
        validateGetUserList,
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
        [Auth.isAuth, validateChangePassword],
        userController.changePassword
    );

    app.delete(
        '/api/v1/users/:id',
        [Auth.isAuth, validateDeleteUser],
        userController.deleteUser
    );

    app.post(
        '/api/v1/login',
        validateLogin,
        userController.login
    );
};