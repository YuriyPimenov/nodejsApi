const Sequelize = require('sequelize')
const db = require('../database/db.js')
const User = require('./User.js')
const Law = require('./Law.js')

module.exports = db.sequelize.define(
    'ticket',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: User,
                key: 'id'
            }
        },
        law_id: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: Law,
                key: 'id'
            }
        },

        summa: {
            type: Sequelize.INTEGER
        },
        descr: {
            type: Sequelize.STRING
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