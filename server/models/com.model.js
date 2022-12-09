module.exports = (sequelize, Sequelize) => {
    const comFields = require('../setup/fields/com.fields.data')

    let dynamicFields = {}
    for (let i = 0; i < comFields.length; i++) {
        const field = comFields[i]
        if (!field.data) continue;
        //if (field.name === 'ticketCustomerName') continue;
        dynamicFields[field.name] = { type: Sequelize[field.data] }
    }

    const Com = sequelize.define("com", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ...dynamicFields
    });

    return Com;
};
