const Sequelize = require('sequelize')
const db = require('../database/db.js')

const Role = db.sequelize.define(
    'role',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },

    },
    {
        timestamps: false
    }
);
Role.sync(/*{ force: true }*/).then(() => {
// Now the `users` table in the database corresponds to the model definition
//     return Role.bulkCreate([
//         {
//             name: 'admin'
//         },
//         {
//             name: 'lawyer'
//         },
//         {
//             name: 'client'
//         }
//     ]);
}).catch(error => {
    console.log('Ошибка при синхронизации Ролей', error);
})
module.exports = Role;