module.exports = (sequelize, Sequelize) => {
    const ticketFields = require('../setup/fields/ticket.fields.data')

    let dynamicFields = {}
    for (let i = 0; i < ticketFields.length; i++) {
        const field = ticketFields[i]
        if (!field.data) continue;
        if (field.name === 'ticketCustomerName') continue;
        dynamicFields[field.name] = { 
            type: Sequelize[field.data], 
            allowNull: field.allowNull || false
        }
    }

    const test = {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ...dynamicFields
    }

    const Ticket = sequelize.define("ticket", test);

    console.log(test)

    return Ticket;
};
