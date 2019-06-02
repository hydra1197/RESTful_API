const productController = require('../controllers/product');
const { validateCreateProduct } = require('../validations/product');
const { Auth } = require('../middlewares');

exports.load = app => {
    app.get(
        '/api/v1/products',
        productController.getProductList
    );

    app.post(
        '/api/v1/product',
        [Auth.isAuth, validateCreateProduct],
        productController.createProduct
    );
};