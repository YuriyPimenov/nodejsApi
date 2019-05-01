const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const env = require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Защита роутов, нельзя будет заходить на другие роуты без валидного токена
app.use(passport.initialize());
require('./app/middleware/passport')(passport);

//Красиво обрабатывать и показывает в консоле рез-ты запрсов к api
app.use(require('morgan')('dev'));

app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

// app.get('/', function(req, res) {
//
//     res.send('Урааааа');
//
// });

//Models
// var models = require("./app/models");

var Users = require('./app/routes/Users');
var Tickets = require('./app/routes/Tickets');
var Messages = require('./app/routes/Messages');

app.use('/api/users', Users);
app.use('/api/tickets', Tickets);
app.use('/api/messages', Messages);

//Sync Database
// models.sequelize.sync().then(function() {
//
//     console.log('Nice! Database looks fine')
//
// }).catch(function(err) {
//
//     console.log(err, "Something went wrong with the Database Update!")
//
// });


app.listen(port, function(err) {

    if (!err)
        console.log("Site is live");
    else console.log(err)

});