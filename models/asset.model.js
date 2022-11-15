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
        customerId: {
            type: Sequelize.STRING,
        },
        ticketId: {
            type: Sequelize.STRING,
        },
        tag: {
            type: Sequelize.STRING,
        },
    });

    return Asset;
};
