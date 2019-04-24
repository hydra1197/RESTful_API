'use strict';

const errorMessages = {
    USERNAME_REQUIRED: 'Bắt buộc nhập username!',
    PASSWORD_REQUIRED: 'Bắt buộc nhập mật khẩu!'
};

const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/user');
const userMiddleware = require('./middlewares/user');

const PORT = 9000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/api/v1/users', userController.getUserList);

app.get('/api/v1/users/:id', userController.getUserById);

app.post('/api/v1/users', userMiddleware.validateCreateUser, userController.createUser);

app.delete('/api/v1/users/:id', userController.deleteUser);

app.use((err, req, res) => {
    return res.json({
        code: err.message,
        message: errorMessages[err.message]
    })
});

app.listen(PORT, () => {
   console.log(`App listening PORT: ${PORT}`);
});