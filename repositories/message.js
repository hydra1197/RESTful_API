const BaseRepository = require('./base');
const Message = require('../models/message');

class MessageRepository extends BaseRepository {
    constructor() {
        super(Message)
    }
}

module.exports = new MessageRepository();