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

/*the visitor log is an associative array or hash table or an objct
they have key value pairs, i can think of it more like a dictionary
linear way of storing arrays is like array[0]="Bill Hamm" 
the value of each of these keys are associative arrays themeselves with two keys
arrived key is the last time the visitor arrived at the office
and it does not exist if the visitor is not in the office currently
history key- is an array itself with values start and end times of
previous visits and does nor exist durig the fisrt visit to the office
unless visitor provides time they left*/

// visitors data structure
var visitors = {
    "Bill Hamm": {
        arrived: new Date(Date.now() - 1000*3600*2)
    },
    "Deborah Lapidot": {
        arrived: new Date(Date.now() - 1000*3600),
        history: [
            {
                arrived: new Date(Date.now() - 26*1000*3600),
                left: new Date(Date.now() - 24*1000*3600)
            }
        ]    
    },
    "Ehud ben-Gera": {
        history: [
            {
                arrived: new Date(Date.now() - (3*24+3)*1000*3600),
                left: new Date(Date.now() - (3*24-1)*1000*3600)
            },
            {
                arrived: new Date(Date.now() - (2*24+2)*1000*3600),
                left: new Date(Date.now() - (2*24-5)*1000*3600)
            }
        ]
    }
};