var express = require('express')
var db = require('./mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('cookie-session')
// var sessions = require('./sessions');

var app = express()
var secret = process.env.cookie_secret || "asdf"
// app.use(cookieParser(process.env.cookie_secret))
app.use(session({ secret: secret}));

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var gameCtrl = require("./controllers/game")
app.use("/game", gameCtrl)
var userCtrl = require("./controllers/user")
app.use("/user", userCtrl)

app.get('/*', function(req,res){
	res.sendFile(path.join(__dirname, 'public/index.html'))
})

// var port = process.env.PORT || 3000
// var serverip = process.env.IP || "localhost"

// console.log(port, serverip)

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});