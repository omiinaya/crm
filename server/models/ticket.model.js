module.exports = (sequelize, Sequelize) => {
    const ticketFields = require('../setup/fields/ticket.fields.data')

    let dynamicFields = {}
    for (let i = 0; i < ticketFields.length; i++) {
        const field = ticketFields[i]
        if (!field.data) continue;
        if (field.name === 'customerName') continue;
        dynamicFields[field.name] = { type: Sequelize[field.data] }
    }

    const Ticket = sequelize.define("ticket", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ...dynamicFields
        /*
        title: {
            type: Sequelize.STRING,
        },
        warranty: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        dueDate: {
            type: Sequelize.STRING,
        },
        technician: {
            type: Sequelize.STRING,
        },
        customerId: {
            type: Sequelize.STRING,
        }
        */
    });

    return Ticket;
};
