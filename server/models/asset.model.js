module.exports = (sequelize, Sequelize) => {
    //dynamically creating model based on fields
    const assetFields = require('../setup/fields/asset.fields.data')

    let dynamicFields = {}
    for (let i = assetFields.length - 1; i >= 0; i--) {
        const field = assetFields[i];
        if (!field.data) continue;
        if (field.name === 'assetCustomerName') continue;
        dynamicFields[field.name] = {
            type: Sequelize[field.data],
            allowNull: field.allowNull || false
        };
    }

    const Asset = sequelize.define("asset", {
        id: {
            type: Sequelize.INTEGER(5).ZEROFILL,
            autoIncrement: true,
            primaryKey: true
        },
        ...dynamicFields
    });

    return Asset;
};