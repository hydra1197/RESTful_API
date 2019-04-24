'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const PORT = 9000;
const app = express();
const filePath = path.resolve(__dirname, 'database', 'users.json');

app.use(bodyParser.urlencoded({ extend: false }));

app.get('/api/v1/users', (req, res) => {
    try {
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (Array.isArray(fileData) && fileData.length > 0) {
            return res.json({
                message: 'Get user list successfully.',
                result: fileData
            });
        }

        return res.json({
            message: 'Get user list successfully.',
            result: []
        });
    } catch (err) {
        res.json({
            message: 'Something went wrong!',
            error: err
        });
    }
});

app.get('/api/v1/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (Array.isArray(fileData) && fileData.length > 0) {
            for (let i = 0, len = fileData.length; i < len; i ++) {
                if (fileData[i].id === userId) {
                    const userData = fileData[i];
                    return res.json({
                        message: 'Get user by id successfully.',
                        result: userData
                    });
                }
            }
        }

        return res.json({
            message: 'User not found!'
        });
    } catch (err) {
        res.json({
            message: 'Something went wrong!',
            error: err
        });
    }
});

app.post('/api/v1/users', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.json({
                message: 'Missing username or password!'
            });
        }

        let userId = 0;
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (Array.isArray(fileData) && fileData.length > 0) {
            for (let i = 0, len = fileData.length; i < len; i ++) {
                if (fileData[i].username === username) {
                    return res.json({
                        message: 'Username is used!',
                    });
                }
            }

            userId = fileData[fileData.length - 1].id + 1;
        }

        fileData.push({
            id: userId,
            username,
            password
        });

        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

        res.json({
            message: 'Insert user successfully.',
            result: {
                id: userId,
                username
            }
        });
    } catch (err) {
        res.json({
            message: 'Something went wrong!',
            error: err
        });
    }
});

app.delete('/api/v1/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const index = fileData.findIndex((user) => {
           return parseInt(user.id) === userId
        });

        if (index < 0) {
            return res.json({
                message: 'User not found!'
            });
        }

        fileData.splice(index, 1);
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf8');

        return res.json({
            message: 'Delete user successfully.',
            result: {
                id: userId
            }
        })
    } catch (err) {
        res.json({
            message: 'Something went wrong!',
            error: err
        });
    }
});

app.listen(PORT, () => {
   console.log(`App listening PORT ${PORT}`);
});