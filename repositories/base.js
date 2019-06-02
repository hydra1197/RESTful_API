class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    getOne(options) {
        const newOptions = {
            ...options,
            select: null,
            isLean: false,
        };

        return this.model
            .findOne(options.where)
            .select(newOptions.select)
            .lean(newOptions.isLean);
    };

    getAll(options) {
        const newOptions = {
            ...options,
            limit: 100,
            page: 1,
            select: null,
            isLean: false,
        };

        if (newOptions.limit > 100) {
            newOptions.limit = 100;
        }

        newOptions.skip = newOptions.limit * (newOptions.page - 1);

        newOptions.where = {
            ...newOptions.where,
            deletedAt: null
        };

        return this.model
            .find(newOptions.where)
            .populate(newOptions.populate)
            .select(newOptions.select)
            .limit(newOptions.limit)
            .skip(newOptions.skip)
            .lean(newOptions.isLean);
    };

    count(options) {
        const newOptions = {
            ...options,
        };

        newOptions.where = {
            ...newOptions.where,
            deletedAt: null
        };

        return this.model
            .count(newOptions.where)
    };

    insert(data) {
        if (Array.isArray(data) && data.length > 0) {
            return this.model
                .create(data)
        }
        return this.model
            .createOne(data)
    }
}

module.exports = BaseRepository;