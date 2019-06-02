'use strict';

const JWT = require('../helpers/jwt');

class Auth {
    static async isAuth (req, res, next) {
        try {
            const token = await JWT.getToken(req);

            if (!token) {
                return next(new Error('AUTHENTICATION_FAILED'));
            }

            const data = await JWT.verifyToken(token);

            req.user = data;

            return next();
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Auth;