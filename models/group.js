const { mongoose } = require('./index');

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 1,
            maxlength: 255,
            required: true,
        },
        author: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        lastMessage: {
            type: String,
            minlength: 1,
            maxlength: 255
        },
        members: [{
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }],
        type: {
            type: String,
            required: true,
            enum: ['individual', 'group']
        }
    },
    {
        timestamps: true
    }
);


const Group = mongoose.model('Group', groupSchema);
module.exports = Group;