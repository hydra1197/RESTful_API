const { mongoose } = require('./index');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            minlength: 4,
            maxlength: 10
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 100
        },

    },
    {
        timestamps: true
    }
);


const User = mongoose.model('User', userSchema);
module.exports = User;