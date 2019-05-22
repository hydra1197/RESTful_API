const { mongoose } = require('./index');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 255
        },
        price: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
);


const Product = mongoose.model('Product', productSchema);
module.exports = Product;