const express = require('express');
//Защита роутов
const passport = require('passport');
const users = express.Router();
const cors = require('cors');
//Для паролей
const bcrypt = require('bcryptjs');
//Генерация токена
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = process.env.SECRET_KEY;
const errorHandler = require('../utils/errorHandler');


users.use(cors());

users.post('/register', async (req, res) => {

    //Ищем пользователя в базе
    const candidate = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(candidate){
        //Если он есть в базе, то кидаем ошибку
        res.status(409).json({
            message: 'Такой email уже существует!!!'
        })
    }else{
        //Иначе создаём его
        const today = new Date();
        const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            created: today,
            role_id:req.body.role_id||3
        };
        //Генерируем хэш
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        userData.password = bcrypt.hashSync(password, salt);

        try{
            const user = await User.create(userData);
            res.status(201).json({ status: user.email + ' Registered!' })
        }catch(e){
            //Обработка ошибок
            errorHandler(res, e)
        }
    }

});

users.post('/login', async (req, res) => {

    const candidate = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(candidate){
        //Пользователь такой есть
        //Проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult){
            //Генерация токена, пароли совпали
            const token = jwt.sign(
                candidate.dataValues,//Первый параметр это ключи которвый
                                        //можно зашифровать в токене
                keys,//Секретный ключ
                {expiresIn: 60*60})//третий, время жизни токена - один час

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }else{
            res.status(401).json({
                message: 'Пароли не совпадают, попробуйте снова!!!'
            })
        }
    }else{
        //Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден!!!'
        })
    }

});

users.get('/profile', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        console.log('--------!!!!!!!!!!!!!!!!!!----',req.user);
        const user = await User.findOne({
            where: {
                id: req.user.id//user берётся из passport
            }
        });
        res.status(200).json(user);
    }catch(e){
        errorHandler(res, e)
    }

});

module.exports = users;