var Promise = require("bluebird");
var config = require("../config/config_database.js");
var Sequelize = require('sequelize');

const sequelize = new Sequelize(config.databaseName, config.databaseUser, config.databasePassword, {
    host: config.databaseHost,
    dialect: 'mysql',
    operatorsAliases: {
      $gt: Sequelize.Op.gt
    },

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false
});

// Functions
var tables = {};
tables.Mails = require("./tables/mails.js")(Sequelize, sequelize);
tables.Tokens = require("./tables/tokens.js")(Sequelize, sequelize, tables);

function connect() {
    return Promise.try(() => {
            return sequelize.authenticate();
        }).then(() => {
            console.log('Connection à la base de donnée effectuée avec succès.');
        })
        .catch(err => {
            console.error('Erreur de connection à la base de donnée:', err);
        })
        .then(() => {
            return sequelize.sync({force: config.force});
        })
        .then(() => {
            console.log('Base de donnée synchronisée avec succès');
        }).catch(err => {
            console.error('Erreur de synchronisation de la base de donnée:', err);
        });
}

// Exports
module.exports = {
    Tables: tables,
    connect: connect,
    close: () => {sequelize.close();}
}
