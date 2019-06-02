const { mongoose } = require('./index');

const messageSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        content: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 255
        },
        group: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Group'
        }
    },
    {
        timestamps: true
    }
);


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;