import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { routes, store } from '../../components';


// Binds all of the react rendering (via 'routes') to the HTML element with the id "app". In this example, the HTML is rendered from the server using the "MasterPage" component.

ReactDOM.render(
    routes
    , document.getElementById("app"));

