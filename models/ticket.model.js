module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("ticket", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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
    });

    return Ticket;
};
