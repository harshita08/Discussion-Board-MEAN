var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var path = require('path');

var session = require('express-session')
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, 'bower_components')));

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000, function(){
	console.log("Listening on port 8000");
})

