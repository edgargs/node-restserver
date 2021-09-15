const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres', 'postgres', 'mysecretpassword', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = {
    db
};
