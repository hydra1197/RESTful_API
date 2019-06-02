const BaseRepository = require('./base');
const Group = require('../models/group');

class GroupRepository extends BaseRepository {
    constructor() {
        super(Group)
    }
}

module.exports = new GroupRepository();