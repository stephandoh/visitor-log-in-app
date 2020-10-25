/*Eslint-env node*/    /** this is to inform me that the IBM console
includes the Eslint utility to identify potential errors in the code.*/ 

/* node.js starter application for Bluemix
node.js is the runtime environmen and the web server package is Express, 
it is a web application framework to provide a 
back-end and a way to manage it for node.js
*/     
var express = require('express'); /*the way a package is used in node 
is by using the require() function 
with the package name assuming the package is declared in 
the package.json file. the function usually retuns a function. */ 

var cfenv = require('cfenv'); /*cfenv provides access to 
my cloud foundry environment.*/ 

var app = express();// create a new express server

app.use(express.static(__dirname + '/public')) /*this is how we tell
express to serve static files from a directory. */ 

app.get("/hello", /* @callback */ function (req, res) {
    res.send("hello, world"); 
}); /*the app.get call specifies how to handle requests for a particular 
path. 
the call has two parameters, one is a variable that is used to pass 
info between functions, and the second is an anonymous function 
to call when the path is requested. the @func has 2 parameters:
a request ob that inclused HTTP request and a response ob used 
to send back a res */ 

var appEnv = cfenv.getAppEnv(); //get the app environment from cloud foundry 

app.listen(appEnv.port, '0.0.0.0', function() {
    console.log("server starting on " + appEnv.url)
}); /* starts server on the specified port and 
binding host and then print the message when the server starts listening
the visitor log is an associative array or hash table or an object. 
*/