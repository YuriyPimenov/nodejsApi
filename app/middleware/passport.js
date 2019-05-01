const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = process.env.SECRET_KEY;
const User = require('../models/User');


var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys;

module.exports = passport=>{
    passport.use(new JwtStrategy(options, async (payload, done)=> {
        try{
            //Ищем в таблице User по id, из токена берём userId. Нас интересует только email и id

            const user = await User.findOne({
                where: {
                    id: payload.id
                }
            });
            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        }catch(e){
            console.log(e)
        }

    }));
};