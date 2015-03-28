var express = require('express'),
	expressConfig = require('./server/config/express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];
expressConfig(app, config);

var routesConfig = require('./server/config/routes');
routesConfig(app);

app.listen(config.port);

console.log('Listening port:' + config.port + ' ...');