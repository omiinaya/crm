module.exports = async (sequelize, Sequelize) => {
    //dynamically creating model based on fields
    const assetFields = require('../setup/asset.fields.data')
    const dynamicFields = {}
    
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
