module.exports = (sequelize, Sequelize) => {
    const Asset = sequelize.define("assets", {
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
        brand: {
            type: Sequelize.STRING
        },
        tag: {
            type: Sequelize.STRING
        },
    });

    return Asset;
};
