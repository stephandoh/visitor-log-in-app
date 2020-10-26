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

var visitorNames = () => {
    return Object.keys(visitors);
}

var currentVisitorNames = () => {
    return currentVisitorNames().filter((name) => visitors[name].arrived !== undefined);
}

var nonCurrentVisitorNames = () => {
    return visitorNames().filter((name) => visitors[name].arrived === undefined);
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

/*
each user is in a seperate object.but it makes a lot more sense to turn the list of current
visitors in a single object.
*/

var currentVisitors = () => {
    return currentVisitorsList().reduce((a, b) => {
        var bKey = Object.keys(b)[0]; 
        a[bKey] = b[bKey];
        return a;
    });
};

// to create the combined object, we first need the key of the first object
// Updating the visitor log
/*
a vivsitor either log in or log out
if you log in, you have arrived, otherwise you log out and have left
get f obtains information, whiles set sets up a bew visitor or updates
*/

var getVisitor = (name) => visitors[name];

var setVisitor = (name, values) => visitors[name] = values;

/*
the logout function
define it
verify existance of user
check if user has an arrive attribute
we need to keep the history variable, but if this is the fist visit, it 
will be empty.
 */
//if this is the first visit
//  always define an empty variable
/*
the unshift function adds a new value at the begining of an array
 */
var logOut = (name) => {
	var oldRecord = getVisitor(name);
	
	if (oldRecord === undefined) 
		return `Error, ${name} is unknown`;
	
	if (oldRecord.arrived === undefined)
		return `Error, ${name} is not logged in`;
		
	var history = oldRecord.history;
	
	// If this is the first visit
	if (history === undefined) 
		history = [];		
	
	history.unshift({
		arrived: oldRecord.arrived,
		left: new Date(Date.now())
	});
	
	setVisitor(name, {history: history});
	
	return `OK, ${name} is logged out now`;
};

// The log in function has a similar concept except that here it creates a new 
// record with the existing history and an arrived attribute with the current time.
    
var logIn = (name) => {
	var oldRecord = getVisitor(name);
	var history;
	
	// First time we see this person
	if (oldRecord === undefined)    
		history = [];   // No history
		
	// Already logged in	
	else if (oldRecord.arrived !== undefined) 
		return `Error, ${name} is already logged in`;
		
	// Not logged in, already exists
	else history = oldRecord.history;
		
	setVisitor(name, {
		arrived: new Date(Date.now()),
		history: history
	});	
	
	return `OK, ${name} is logged in now`;	
};

/*
Testing
The functions in this object do not receive any parameters,
 and return the information that is sent to the user. 
 To enable the testing of functions that do require parameters, 
 such as logIn(), they are wrapped in the table within a 
 definition that does provide the necessary parameters. 
 That way, the code that uses the table does not need to specify any parameter values.
*/

var testFunctions = [
	{path: "visitorNames", func: visitorNames},	
	{path: "currentVisitorNames", func: currentVisitorNames},	
	{path: "nonCurrentVisitorNames", func: nonCurrentVisitorNames},		
	{path: "currentVisitorList", func: currentVisitorList},		
	{path: "currentVisitors", func: currentVisitors},	
	{path: "visitors", func: () => visitors},	
	{path: "logIn", func: () => logIn("Avimelech ben-Gideon")},
	{path: "logOut", func: () => logOut("Avimelech ben-Gideon")}	
];


// This is the code that registers the handlers.
// It prepends /test/ to the path and creates a function
// that calls the function from the table and then sends the response to the browser.
testFunctions.map((item) => 
	app.get(
		`/test/${item.path}`, 
		/* @callback */ function(req, res) {
			res.send(item.func());
		}
	)
);



app.get("/hello", /* @callback */ function(req, res) {
	res.send("Hello, world");
});



// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});