const productController = require('../controllers/product');
const { validateCreateProduct } = require('../validations/product');

exports.load = app => {
    app.get(
        '/api/v1/products',
        productController.getProductList
    );

    app.post(
        '/api/v1/product',
        validateCreateProduct,
        productController.createProduct
    );
};