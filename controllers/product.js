'use strict';

const Response = require('../helpers/response');
const Product = require('../models/product');

exports.getProductList = async (req, res, next) => {
    try {
        const products = await Product.find()
            .populate({
                path: 'user',
                select: '_id name username'
            })
            .lean();

        return Response.success(res, products);
    } catch (e) {
        return next(e);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const { name, price, user } = req.body;

        const product = await Product.create({ name, price, user });

        return Response.success(res, product);
    } catch (e) {
        return next(e);
    }
};