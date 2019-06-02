const { mongoose } = require('./index');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            minlength: 4,
            maxlength: 25
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 255
        },
        name: {
            type: String,
            maxlength: 255,
            required: true
        },
        email: {
            type: String,
            minlength: 10,
            maxlength: 255,
            required: true
        }
    },
    {
        timestamps: true
    }
);


const User = mongoose.model('User', userSchema);
module.exports = User;