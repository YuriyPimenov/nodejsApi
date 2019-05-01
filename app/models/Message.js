const Sequelize = require('sequelize')
const db = require('../database/db.js')
const User = require('./User.js')
const Ticket = require('./Ticket.js')

module.exports = db.sequelize.define(
    'message',
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
        ticket_id: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: Ticket,
                key: 'id'
            }
        },

        text: {
            type: Sequelize.STRING
        },
        isRead: {
            type: Sequelize.BOOLEAN
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