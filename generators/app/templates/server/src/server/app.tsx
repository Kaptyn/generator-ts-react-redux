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

// Allows cookies to be read on the server side
app.use(cookieParser());

// Allows the body of the request to be read on the server
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Serve static files from the dist client folder. CSS, JS etc.
app.use(express.static('dist/client/static'));


// defines a route which matches all requests ("http://localhost:3000", "http://localhost:3000/pages/test" etc)
app.get("*", (req,res) => {

    // Uses the "match" function from react router to ensure context is set correctly 
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            // Renders the react components as a string, and sends it back to the client.
            let pageContents =  renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
            );

            res.status(200).send(
                renderToStaticMarkup(<MasterPage content={pageContents}></MasterPage>
            ));
        } else {
            res.status(404).send('Not found')
        }
    })

})


app.listen(port, function () {
    console.log("Web application listening on " + port);
});