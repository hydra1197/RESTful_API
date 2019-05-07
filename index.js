'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/user');
const userMiddleware = require('./middlewares/user');
const Response = require('./helpers/response');
const MongoClient = require('mongodb').MongoClient;

const PORT = 9000;
const app = express();
const url = 'mongodb://localhost:27017';
const dbName = 'restful-api';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log(err);
        process.exit();
    }

    console.log('Connected successfully to server');

    const db = client.db(dbName);

    app.use((req, res, next) => {
        req.db = db;
        next();
    });

    app.get(
        '/api/v1/users',
        userController.getUserList
    );

    app.get(
        '/api/v1/users/:id',
        userMiddleware.validateGetUserById,
        userController.getUserById
    );

    app.post(
        '/api/v1/users',
        userMiddleware.validateCreateUser,
        userController.createUser
    );

    app.put(
        '/api/v1/users/:id',
        userMiddleware.validateChangePassword,
        userController.changePassword
    );

    app.delete(
        '/api/v1/users/:id',
        userMiddleware.validateDeleteUser,
        userController.deleteUser
    );

    app.use((err, req, res, next) => {
        return Response.error(res, err)
    });

    app.listen(PORT, () => {
        console.log(`App listening PORT: ${PORT}`);
    });
});