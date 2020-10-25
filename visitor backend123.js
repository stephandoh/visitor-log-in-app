/*Eslint-env node*/    // this is to inform me that the IBM console includes the Eslint utility to identify potential errors in the code.

// node.js starter application for Bluemix    //node.js is the runtime environmen and the web server package is Express, it is a web application framework to provide a back-end and a way to manage it for node.js

var express = require('express'); // the way a package is used in node is by using the require() function with the package name assuming the package is declared in the package.json file. the function usually retuns a function.

var cfenv = require('cfenv') // cfenv provides access to my cloud foundry environment.

var app = express() // create a new express server