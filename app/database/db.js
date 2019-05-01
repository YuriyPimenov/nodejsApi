const Sequelize = require('sequelize')
var path = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..','..', 'config', 'config.json'))[env];

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config);
sequelize.sync();
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db