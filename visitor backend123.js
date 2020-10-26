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
    /*Date.now() is the number of milliseconds between now and fixed
    point in time (midnight of 01/01/1970). so Bill's arrival time is
    two hours before the code is executed when the application starts */
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

/*
to get the list of visitor names, 
all we need is to get the keys of the visitors objest. 
the function to do is object.keys, so something like this
var Function_Nmae = (paramq, param2, ... paramn) =>
                    {<function>}
*/

/*
use filter() function to return an array
of elements that pass a particular test 
we are trying to filter out all the visitor's names that have
arrives in the office. in coding, the value of the arrived key
is not equal to undefined. When a function literal is a single
expression, there is no need to enclose it 
in curly brackets ({}) and have a return statement. 
You can just enter the expression.\
*/

var visitorsName = () => {
    return Object.keys(visitors);
}

var currentVisitorNames = () => {
    return currentVisitorNames().filter((name) => visitors[name].arrived !== undefined);
}

var nonCurrentVisitorNames = () => {
    return visitorsNames().filter((name) => visitor[name].arrived === undefined);
};

/*
next we create a list of currently present visitors. it uses the map() 
function to retrieve information for each user in the list of current
visitors. we aew going to use map(). it receives filter() as a parameter.
however, instead of decifing whether the value would be in the output or not, 
the function in map is used tp transform the values:
it creates new arrays, populate it with the mapping function results.
every time the mapping function is executed, it receives the data of the 
currently present visitor and puts it in an object and afterwards these objects are
put in a list in the same order as the orignal values.
*/

var currentVisitorList = () => {
    return currentVisitorNames().map((name) => {
        var retVal = {};
        retVal[name] = visitors[name];
        return retVal;
    }); 
};