module.exports = (sequelize, Sequelize) => {
    //dynamically creating model based on fields
    const assetFields = require('../setup/fields/asset.fields.data')

    let dynamicFields = {}
    for (let i = 0; i < assetFields.length; i++) {
        const field = assetFields[i]
        if (!field.data) continue;
        if (field.name === 'assetCustomerName') continue;
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