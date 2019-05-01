const express = require('express');
//Защита роутов
const passport = require('passport');
const tickets = express.Router();
const cors = require('cors');
//Для паролей
const bcrypt = require('bcryptjs');
//Генерация токена
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');
const Ticket = require('../models/Ticket');
tickets.use(cors());

//Route GET => /api/tickets/  Получить все заявки
tickets.get('/', passport.authenticate('jwt', {session: false}), async function(req, res, next) {

    try{
        const tickets = await Ticket.findAll({
            where: {
                user_id: req.user.id
            }
        });
        res.status(200).json(tickets)
    }catch(e){
        errorHandler(res, e)
    }

});
//Route GET => /api/tickets/13  Получить одну заявку по id
tickets.get('/:id', passport.authenticate('jwt', {session: false}), async function(req, res, next) {

    try{
        const ticket = await Ticket.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(ticket);
    }catch(e){
        errorHandler(res, e)
    }
})
//Route POST => /api/tickets/  Создать заявку
tickets.post('/', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    if (!req.body.law_id) {
        res.status(400).json({
            message: 'Bad Data'
        })
    } else {
        const today = new Date();
        const ticketData = {
            user_id: req.user.id,
            law_id: req.body.law_id,
            summa: req.body.summa,
            descr: req.body.descr,
            created: today
        };
        try{
            const ticket = await Ticket.create(ticketData);
            res.status(201).json(ticket);
        }catch(e){
            errorHandler(res, e)
        }
    }
});
//Route DELETE => /api/tickets/13  Удалить заявку по ID
tickets.delete('/:id', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    try{
        let result = await Ticket.destroy({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        });
        console.log('------delete ticket----',result);
        if(!result)
            res.status(400).json({
                message: 'Удаление заявки не возможно'
            });
        res.status(200).json({message: "Заявка удалена."})
    }catch(e){
        errorHandler(res, e)
    }


});
//Route PUT => /api/tickets/13  Изменить заявку по ID
tickets.put('/:id', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    if (!req.body.law_id || !req.body.summa || !req.body.descr) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        try{
            let result = await Ticket.update(
                {
                    law_id: req.body.law_id,
                    summa: req.body.summa,
                    descr: req.body.descr,
                },
                { where: {
                    id: req.params.id,
                    user_id: req.user.id
                    }
                }
            );
            console.log('------update ticket----',result);
            // if(!result[0])
            //     res.status(400).json({
            //         message: 'Обновление заявки не возможно'
            //     });
            res.status(200).json({message: "Заявка обновлена."})
        }catch(e){
            errorHandler(res, e)
        }
    }
})


module.exports = tickets