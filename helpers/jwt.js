const jwt = require('jsonwebtoken');
const fs =  require('fs');
const path =  require('path');

const privateKey = fs.readFileSync(path.resolve(__dirname, '../configs/cert/private.key'), 'utf8');
const publicKey = fs.readFileSync(path.resolve(__dirname, '../configs/cert/public.key'), 'utf8');

class JWT {
    static sign(payload, options) {
        options = Object.assign(
            {
                algorithm: 'RS256',
                expiresIn: 60*60*60
            },
            options
        );

        return jwt.sign(payload, privateKey, options);
    }

    static verifyToken(token, options = {}) {
        return jwt.verify(token, publicKey, options);
    }

    static getToken(req) {
        let authorization = null;
        let token = null;

        if (req.query && req.query.token) {
            return req.query.token;
        } else if (req.authorization) {
            authorization = req.authorization;
        } else if (req.headers) {
            authorization = req.headers.authorization;
        } else if (req.socket) {
            if (req.socket.handshake.query && req.socket.handshake.query.token) {
                return req.socket.handshake.query.token;
            }
            authorization = req.socket.handshake.headers.authorization;
        }

        if (authorization) {
            const tokens = authorization.split('Bearer ');
            if (Array.isArray(tokens) || tokens.length === 2) {
                token = tokens[1];
            }
        }

        return token;
    }
}

module.exports = JWT;