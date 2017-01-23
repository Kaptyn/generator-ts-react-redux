import * as express from "express";
import * as React from 'react';
import {renderToString, renderToStaticMarkup } from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import { Provider } from 'react-redux';
import { HelloWorld, MasterPage, routes, store } from "../components";

var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

// The port number will be equal to 3000 in development, or to the environment variable "port"
let port:number = 3000 | process.env.port;
let app:express.Express = express();


// Serve static files from the dist client folder. CSS, JS etc.
app.use(express.static('dist/client/static'));


app.listen(port, function () {
    console.log("Web application listening on " + port);
});