/*
Author : UDAY KIRAN
Date Created: 15-JAN-2017
node based biomag practitioner app    
*/
//Initiallising modules
var express = require("express");
var bodyParser = require("body-parser");
// Application Configurations
var appConfig = require('./src/server/config/config.json');
appConfig.chalk = require('chalk');
console.log(appConfig.chalk.bold('ApplicationName:   BioMag'));
//Getting utility functions
var utility = require('./src/server/common/utils')(appConfig);
//Getting logger module
var logger = require('./src/server/common/logger')(appConfig, utility);
var app = express();
//global obj
var _globalVariable = {};
_globalVariable.app = app;
_globalVariable.utility = utility;
_globalVariable.appConfig = appConfig;
_globalVariable.logger = logger;
app.use(express.static(__dirname + "/src/client"));
app.use(bodyParser.json());

//Setting JWT Secret Key
app.set('superSecret', appConfig.authToken); // secret variable

//Getting utility functions
var jwtAuthorization = require('./src/server/common/jwtAuthorizationFilter')(_globalVariable);
var database = require("./src/server/helpers/database.js")(_globalVariable);

//Middleware: To be executed in between request and response
app.use(function (req, res, next) {   
    //http://enable-cors.org/server_expressjs.html
    //Enabling CORS -Starts
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    //Enabling CORS -Starts
    next();   
});

//Middleware: To be executed in between request and response
app.use(function (req, res, next) {
    //Calling function for JWT Authentication
    jwtAuthorization.OnAuthorization(req, res, next);
});
//loading the controllers
console.log("---------------------------");
console.log("Loading controllers");
console.log("---------------------------");
for (i in appConfig.Controllers) {
    var controllerName = appConfig.Controllers[i];
    var controller = require("./src/server/controllers/" + controllerName + "Controller.js");
    console.log(i+". "+controllerName);
    var instance = new controller(_globalVariable);
}
//Setting up server
var server = app.listen(process.env.PORT || appConfig.database.port, function () {
    var port = server.address().port; 
    console.log("---------------------------");
    console.log(appConfig.chalk.bold("App now running on port", port));
    console.log("---------------------------");
   require("openurl").open("http://localhost:" + port)
});
_globalVariable.server = server;
//Default route 
// define the home page route, running index.html when server runs
app.get('/', function (req, res) {
    res.sendFile('/index.html');
});



