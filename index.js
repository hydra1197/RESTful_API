'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Response = require('./helpers/response');
const userRoute = require('./apis/user');
const productRoute = require('./apis/product');
const groupRoute = require('./apis/group');
const messageRoute = require('./apis/message');
const models = require('./models');

const PORT = 9000;
const app = express();

models.connectDB()
    .then (console.log('Connect db successfully'))
    .catch ((e) => {
        console.error(e);
        process.exit(1);
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

userRoute.load(app);
productRoute.load(app);
groupRoute.load(app);
messageRoute.load(app);

app.use((err, req, res, next) => {
    // if (Array.isArray(err.errors)) {
    //     const messages = err.errors.map((item) => {
    //         return item.messages;
    //     });
    //     return Response.error(res, messages);
    // }

    console.log(err);
    return Response.error(res, err)
});

app.listen(PORT, () => {
    console.log(`App listening PORT: ${PORT}`);
});