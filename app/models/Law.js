const Sequelize = require('sequelize')
const db = require('../database/db.js')

const Law = db.sequelize.define(
    'law',
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
Law.sync(/*{ force: true }*/).then(() => {
// Now the `users` table in the database corresponds to the model definition
//     return Law.bulkCreate([
//         {
//             name: '44 ФЗ'
//         },
//         {
//             name: '223 ФЗ'
//         },
//         {
//             name: '185 ФЗ'
//         },
//         {
//             name: '615 ПП'
//         }
//     ]);
}).catch(error => {
    console.log('Ошибка при синхронизации Законов', error);
})
module.exports = Law;