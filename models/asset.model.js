module.exports = (sequelize, Sequelize) => {
    //dynamically creating model based on fields
    const assetFields = require('../setup/asset.fields.data')

    let dynamicFields = {}
    for (let i = 0; i < assetFields.length; i++) {
        field = assetFields[i]
        dynamicFields[field.name] = { type: Sequelize[field.data] }
    }

    const Asset = sequelize.define("asset", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ...dynamicFields
    });

    return Asset;
};


/*
module.exports = (sequelize, Sequelize) => {
    const Asset = sequelize.define("asset", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
        serial: {
            type: Sequelize.STRING,
        },
        manufacturer: {
            type: Sequelize.STRING,
        },
        tag: {
            type: Sequelize.STRING,
        },
        customerId: {
            type: Sequelize.STRING,
        },
        ticketId: {
            type: Sequelize.STRING,
        },
    });

    return Asset;
};
*/