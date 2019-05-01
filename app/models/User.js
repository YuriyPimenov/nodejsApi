const Sequelize = require('sequelize')
const db = require('../database/db.js')
const Role = require('./Role.js')

module.exports = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        role_id: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: Role,
                key: 'id'
            }
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)