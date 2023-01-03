module.exports = (sequelize, Sequelize) => {
    const ticketFields = require('../setup/fields/ticket.fields.data')

    let dynamicFields = {}
    for (let i = 0; i < ticketFields.length; i++) {
        const field = ticketFields[i]
        if (!field.data) continue;
        if (field.name === 'ticketCustomerName') continue;
        if (field.name === 'required') { dynamicFields[field.name] = field.required }
        dynamicFields[field.name] = { type: Sequelize[field.data] }
    }

    const Ticket = sequelize.define("ticket", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ...dynamicFields
    });

    return Ticket;
};
