const express = require('express');
//Защита роутов
const passport = require('passport');
const messages = express.Router();
const cors = require('cors');
//Для паролей
const bcrypt = require('bcryptjs');
//Генерация токена
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorHandler');
const Message = require('../models/Message');
messages.use(cors());

//Route GET => /api/messages/  Получить все сообщения относящиеся к заявке
messages.get('/', passport.authenticate('jwt', {session: false}), async function(req, res, next) {

    try{
        const messages = await Message.findAll({
            where: {
                ticket_id: req.body.ticket_id
            }
        });
        res.status(200).json(messages)
    }catch(e){
        errorHandler(res, e)
    }

});
//Route GET => /api/messages/13  Получить одно сообщение по id
messages.get('/:id', passport.authenticate('jwt', {session: false}), async function(req, res, next) {

    try{
        const message = await Message.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(message);
    }catch(e){
        errorHandler(res, e)
    }
})
//Route POST => /api/messages/  Создать сообщение
messages.post('/', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    if (!req.body.ticket_id) {
        res.status(400).json({
            message: 'Bad Data'
        })
    } else {
        const today = new Date();
        const messageData = {
            user_id: req.user.id,
            ticket_id: req.body.ticket_id,
            text: req.body.text,
            isRead: 0,
            created: today
        };
        try{
            const message = await Message.create(messageData);
            res.status(201).json(message);
        }catch(e){
            errorHandler(res, e)
        }
    }
});
//Route DELETE => /api/messages/13  Удалить сообщение по ID
messages.delete('/:id', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    try{
        let result = await Message.destroy({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        });
        console.log('------delete message----',result);
        if(!result)
            res.status(400).json({
                message: 'Удаление сообщение не возможно'
            });
        res.status(200).json({message: "Сообщение удалено."})
    }catch(e){
        errorHandler(res, e)
    }


});
//Route PUT => /api/messages/13  Изменить заявку по ID
messages.put('/:id', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
    if (!req.body.ticket_id || !req.body.text || !req.body.isRead) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        try{
            let result = await Message.update(
                {
                    ticket_id: req.body.ticket_id,
                    text: req.body.text,
                    isRead: req.body.isRead,
                },
                { where: {
                        id: req.params.id,
                        user_id: req.user.id
                    }
                }
            );
            console.log('------update message----',result);
            // if(!result[0])
            //     res.status(400).json({
            //         message: 'Обновление заявки не возможно'
            //     });
            res.status(200).json({message: "Сообщение обновлено."})
        }catch(e){
            errorHandler(res, e)
        }
    }
})


module.exports = messages